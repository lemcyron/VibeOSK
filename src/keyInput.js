// Key input injection and modifier management for Vibe OSK
import Clutter from 'gi://Clutter';
import GLib from 'gi://GLib';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import { KeyCodes, SpecialKeyType } from './constants.js';

export class KeyInputManager {
    constructor(settings) {
        this._settings = settings;
        this._virtualDevice = null;
        this._initVirtualDevice();

        this.modifiers = {
            shift: false,
            caps: false,
            ctrl: false,
            alt: false,
            super: false,
            altgr: false
        };

        this._modifierListeners = new Set();
        this._repeatTimeoutId = null;
        this._repeatIntervalId = null;
    }

_initVirtualDevice() {
    try {
        const backend = global.stage.context.get_backend();
        const seat = backend.get_default_seat();
        this._virtualDevice = seat.create_virtual_device(Clutter.InputDeviceType.KEYBOARD_DEVICE);
    } catch (e) {
        console.error(`[VibeOSK] Failed to create virtual device: ${e}\n${e.stack}`);
    }

    if (!this._virtualDevice)
        console.error('[VibeOSK] Virtual keyboard device is null');
}

    addModifierListener(callback) {
        this._modifierListeners.add(callback);
    }

    removeModifierListener(callback) {
        this._modifierListeners.delete(callback);
    }

    _notifyModifiersChanged() {
        for (const listener of this._modifierListeners) {
            try {
                listener(this.modifiers);
            } catch (e) {
                console.error(`[VibeOSK] Error in modifier listener: ${e}`);
            }
        }
    }

    toggleModifier(modifierName) {
        if (!(modifierName in this.modifiers)) return;

        this.modifiers[modifierName] = !this.modifiers[modifierName];

        // For Super: a standalone tap (toggle on then off with no key in between)
        // should send a real press+release so the desktop reacts (e.g. open Activities).
        // We track whether Super was "consumed" by a combo in sendKey.
        if (modifierName === 'super') {
            if (this.modifiers.super) {
                // Just turned on — mark it as unconsumed
                this._superConsumed = false;
            } else {
                // Just turned off — if nothing consumed it, fire a tap
                if (!this._superConsumed && this._virtualDevice) {
                    const now = GLib.get_monotonic_time();
                    try {
                        this._virtualDevice.notify_keyval(now, KeyCodes.SUPER_L, Clutter.KeyState.PRESSED);
                        this._virtualDevice.notify_keyval(now + 50, KeyCodes.SUPER_L, Clutter.KeyState.RELEASED);
                    } catch (e) {}
                }
                this._superConsumed = false;
            }
        }

        this._notifyModifiersChanged();
        this._playSound();
    }

    clearNonLockModifiers() {
        let changed = false;
        const nonLockMods = ['shift', 'ctrl', 'alt', 'super', 'altgr'];

        for (const mod of nonLockMods) {
            if (this.modifiers[mod]) {
                this.modifiers[mod] = false;
                changed = true;
            }
        }

        if (changed) {
            this._notifyModifiersChanged();
        }
    }

    isShifted() {
        return (this.modifiers.shift && !this.modifiers.caps) || (!this.modifiers.shift && this.modifiers.caps);
    }

    sendKey(keyData) {
        this._playSound();

        const isShifted = this.isShifted();
        const hasModifierCombo = this.modifiers.ctrl || this.modifiers.alt || this.modifiers.super;

        // at the top of sendKey(), before "1. Direct text string"
        if (keyData.action === 'return' || keyData.action === 'enter' ||
            keyData.keyval === KeyCodes.RETURN || keyData.keyval === KeyCodes.KP_ENTER ||
            keyData.label === 'Enter' || keyData.label === '⏎') {
            this.sendReturn();
            this.clearNonLockModifiers();
            return;
        }        
        
        // 1. Direct text string (e.g. emoji, accent string)
        if (keyData.text) {
            this.commitText(keyData.text);
            this.clearNonLockModifiers();
            return;
        }

        // 2. Action keys
        if (keyData.type === SpecialKeyType.ACTION) {
            if (keyData.action === 'backspace') {
                this.sendBackspace();
            } else if (keyData.action === 'return') {
                this.sendReturn();
            } else if (keyData.action === 'tab') {
                this.sendTab();
            } else if (keyData.action === 'delete') {
                this.sendDelete();
            } else if (keyData.keyval) {
                this.sendKeyval(keyData.keyval);
            }
            this.clearNonLockModifiers();
            return;
        }

        // 3. If Ctrl/Alt/Super modifier is held down, send as atomic combo
        if (hasModifierCombo && keyData.keyval) {
            const activeMods = [];
            if (this.modifiers.shift || this.modifiers.caps) activeMods.push('shift');
            if (this.modifiers.ctrl) activeMods.push('ctrl');
            if (this.modifiers.alt) activeMods.push('alt');
            if (this.modifiers.super) {
                activeMods.push('super');
                this._superConsumed = true;
            }
            this.sendCombo(activeMods, keyData.keyval);
            this.clearNonLockModifiers();
            return;
        }

        // 4. Regular character (letters, numbers, punctuation, space)
        let charToCommit = null;

        if (keyData.action === 'space' || keyData.keyval === KeyCodes.SPACE || keyData.label === 'Space') {
            charToCommit = ' ';
        } else if (isShifted) {
            if (keyData.shiftLabel) {
                charToCommit = keyData.shiftLabel;
            } else if (typeof keyData.label === 'string' && keyData.label.length === 1) {
                charToCommit = keyData.label.toUpperCase();
            }
        } else {
            if (typeof keyData.label === 'string' && keyData.label.length === 1) {
                charToCommit = keyData.label.toLowerCase();
            } else if (keyData.label) {
                charToCommit = keyData.label;
            }
        }

        if (charToCommit) {
            this.commitText(charToCommit);
        } else if (keyData.keyval) {
            this.sendKeyval(keyData.keyval);
        }

        this.clearNonLockModifiers();
    }

    sendKeyval(keyval) {
        const now = GLib.get_monotonic_time();

        if (this._virtualDevice) {
            try {
                this._virtualDevice.notify_keyval(now, keyval, Clutter.KeyState.PRESSED);
                GLib.timeout_add(GLib.PRIORITY_DEFAULT, 25, () => {
                    if (this._virtualDevice) {
                        try {
                            const releaseTime = GLib.get_monotonic_time();
                            this._virtualDevice.notify_keyval(releaseTime, keyval, Clutter.KeyState.RELEASED);
                        } catch (e) {}
                    }
                    return GLib.SOURCE_REMOVE;
                });
                return;
            } catch (e) {
                console.warn(`[VibeOSK] Virtual device error: ${e}`);
            }
        }
    }

    sendBackspace() {
        this.sendKeyval(KeyCodes.BACKSPACE);
        try {
            if (Main.inputMethod && typeof Main.inputMethod.delete_surrounding === 'function') {
                Main.inputMethod.delete_surrounding(-1, 1);
            }
        } catch (e) {}
    }

    sendReturn() {
    if (!this._virtualDevice) {
        console.error('[VibeOSK] No virtual device; Return cannot be sent');
        return;
    }
    this.sendKeyval(KeyCodes.RETURN);
    // Removed commit('\r'): it is ignored by most clients and can double-fire in others
    }

    sendTab() {
        this.sendKeyval(KeyCodes.TAB);
        try {
            if (Main.inputMethod && typeof Main.inputMethod.commit === 'function') {
                Main.inputMethod.commit('\t');
            }
        } catch (e) {}
    }

    sendDelete() {
        this.sendKeyval(KeyCodes.DELETE);
        try {
            if (Main.inputMethod && typeof Main.inputMethod.delete_surrounding === 'function') {
                Main.inputMethod.delete_surrounding(0, 1);
            }
        } catch (e) {}
    }

    sendCombo(modifiers, keyval) {
        this._playSound();
        const now = GLib.get_monotonic_time();
        const modKeyvals = [];

        if (modifiers.includes('ctrl')) modKeyvals.push(KeyCodes.CONTROL_L);
        if (modifiers.includes('alt')) modKeyvals.push(KeyCodes.ALT_L);
        if (modifiers.includes('shift')) modKeyvals.push(KeyCodes.SHIFT_L);
        if (modifiers.includes('super')) modKeyvals.push(KeyCodes.SUPER_L);

        if (this._virtualDevice) {
            try {
                for (const mKeyval of modKeyvals) {
                    this._virtualDevice.notify_keyval(now, mKeyval, Clutter.KeyState.PRESSED);
                }

                this._virtualDevice.notify_keyval(now + 100, keyval, Clutter.KeyState.PRESSED);

                GLib.timeout_add(GLib.PRIORITY_DEFAULT, 30, () => {
                    if (this._virtualDevice) {
                        const releaseTime = GLib.get_monotonic_time();
                        this._virtualDevice.notify_keyval(releaseTime, keyval, Clutter.KeyState.RELEASED);
                        for (const mKeyval of modKeyvals) {
                            this._virtualDevice.notify_keyval(releaseTime + 50, mKeyval, Clutter.KeyState.RELEASED);
                        }
                    }
                    return GLib.SOURCE_REMOVE;
                });
            } catch (e) {
                console.error(`[VibeOSK] Failed to send combo: ${e}`);
            }
        }
    }

commitText(text) {
    if (!text) return;

    // Single printable ASCII char: inject as a real keypress, and only that.
    if (text.length === 1 && this._virtualDevice) {
        const charCode = text.charCodeAt(0);
        if (charCode >= 0x20 && charCode <= 0x7e) {
            const now = GLib.get_monotonic_time();
            try {
                this._virtualDevice.notify_keyval(now, charCode, Clutter.KeyState.PRESSED);
                GLib.timeout_add(GLib.PRIORITY_DEFAULT, 25, () => {
                    if (this._virtualDevice) {
                        try {
                            this._virtualDevice.notify_keyval(
                                GLib.get_monotonic_time(), charCode, Clutter.KeyState.RELEASED);
                        } catch (e) {}
                    }
                    return GLib.SOURCE_REMOVE;
                });
                return;   // <-- don't fall through to commit()
            } catch (e) {
                console.warn(`[VibeOSK] keyval inject failed, falling back: ${e}`);
            }
        }
    }

    // Everything else (emoji, accents, multi-char strings), or fallback
    try {
        if (Main.inputMethod && typeof Main.inputMethod.commit === 'function') {
            Main.inputMethod.commit(text);
        }
    } catch (e) {}
}

    startKeyRepeat(keyData, repeatAction) {
        this.stopKeyRepeat();

        // Initial delay before rapid repeat
        this._repeatTimeoutId = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 400, () => {
            this._repeatTimeoutId = null;
            this._repeatIntervalId = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 60, () => {
                if (repeatAction) {
                    repeatAction();
                } else {
                    this.sendKey(keyData);
                }
                return GLib.SOURCE_CONTINUE;
            });
            return GLib.SOURCE_REMOVE;
        });
    }

    stopKeyRepeat() {
        if (this._repeatTimeoutId) {
            GLib.source_remove(this._repeatTimeoutId);
            this._repeatTimeoutId = null;
        }
        if (this._repeatIntervalId) {
            GLib.source_remove(this._repeatIntervalId);
            this._repeatIntervalId = null;
        }
    }

    _playSound() {
        if (!this._settings || !this._settings.get_boolean('sound-feedback')) {
            return;
        }

        try {
            if (global.display && typeof global.display.bell === 'function') {
                // Gentle bell if available
                // global.display.bell();
            }
        } catch (e) {}
    }

    destroy() {
        this.stopKeyRepeat();
        this.clearNonLockModifiers();
        this._modifierListeners.clear();
        this._virtualDevice = null;
    }
}
