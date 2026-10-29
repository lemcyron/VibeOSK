// Key input injection and modifier management for Vibe OSK
import Clutter from 'gi://Clutter';
import GLib from 'gi://GLib';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import { KeyCodes } from './constants.js';

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
            const seat = Clutter.get_default_backend().get_default_seat();
            if (seat && typeof seat.create_virtual_input_device === 'function') {
                this._virtualDevice = seat.create_virtual_input_device(Clutter.InputDeviceType.KEYBOARD_DEVICE);
            }
        } catch (e) {
            console.warn(`[VibeOSK] Failed to create virtual keyboard device: ${e}`);
        }
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
        if (modifierName in this.modifiers) {
            this.modifiers[modifierName] = !this.modifiers[modifierName];
            
            // If physical modifier press is desired
            const keyvalMap = {
                shift: KeyCodes.SHIFT_L,
                ctrl: KeyCodes.CONTROL_L,
                alt: KeyCodes.ALT_L,
                super: KeyCodes.SUPER_L,
                altgr: KeyCodes.ISO_LEVEL3_SHIFT,
                caps: KeyCodes.CAPS_LOCK
            };

            const keyval = keyvalMap[modifierName];
            if (keyval && this._virtualDevice) {
                const now = GLib.get_monotonic_time();
                const state = this.modifiers[modifierName] ? Clutter.KeyState.PRESSED : Clutter.KeyState.RELEASED;
                try {
                    this._virtualDevice.notify_keyval(now, keyval, state);
                } catch (e) {
                    // Fallback or ignore
                }
            }

            this._notifyModifiersChanged();
            this._playSound();
        }
    }

    clearNonLockModifiers() {
        let changed = false;
        const nonLockMods = ['shift', 'ctrl', 'alt', 'super', 'altgr'];
        const keyvalMap = {
            shift: KeyCodes.SHIFT_L,
            ctrl: KeyCodes.CONTROL_L,
            alt: KeyCodes.ALT_L,
            super: KeyCodes.SUPER_L,
            altgr: KeyCodes.ISO_LEVEL3_SHIFT
        };

        for (const mod of nonLockMods) {
            if (this.modifiers[mod]) {
                this.modifiers[mod] = false;
                changed = true;
                if (this._virtualDevice && keyvalMap[mod]) {
                    const now = GLib.get_monotonic_time();
                    try {
                        this._virtualDevice.notify_keyval(now, keyvalMap[mod], Clutter.KeyState.RELEASED);
                    } catch (e) {}
                }
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

        // Direct text commit (e.g. emoji, special symbol)
        if (keyData.text) {
            this.commitText(keyData.text);
            this.clearNonLockModifiers();
            return;
        }

        // Calculate keyval based on shift state
        let keyval = keyData.keyval;
        if (this.isShifted() && keyData.shiftKeyval) {
            keyval = keyData.shiftKeyval;
        } else if (this.isShifted() && typeof keyData.label === 'string' && keyData.label.length === 1) {
            const upper = keyData.label.toUpperCase();
            keyval = upper.charCodeAt(0);
        }

        if (keyval !== undefined && keyval !== null) {
            this.sendKeyval(keyval);
        }

        this.clearNonLockModifiers();
    }

    sendKeyval(keyval) {
        const now = GLib.get_monotonic_time();

        if (this._virtualDevice) {
            try {
                this._virtualDevice.notify_keyval(now, keyval, Clutter.KeyState.PRESSED);
                this._virtualDevice.notify_keyval(now + 1000, keyval, Clutter.KeyState.RELEASED);
                return;
            } catch (e) {
                console.warn(`[VibeOSK] Virtual device error: ${e}`);
            }
        }

        // Fallback to text commit if available
        if (keyval >= 0x20 && keyval <= 0x7e) {
            this.commitText(String.fromCharCode(keyval));
        }
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
                // Press modifiers
                for (const mKeyval of modKeyvals) {
                    this._virtualDevice.notify_keyval(now, mKeyval, Clutter.KeyState.PRESSED);
                }

                // Press and release target key
                this._virtualDevice.notify_keyval(now + 500, keyval, Clutter.KeyState.PRESSED);
                this._virtualDevice.notify_keyval(now + 1000, keyval, Clutter.KeyState.RELEASED);

                // Release modifiers
                for (const mKeyval of modKeyvals) {
                    this._virtualDevice.notify_keyval(now + 1500, mKeyval, Clutter.KeyState.RELEASED);
                }
            } catch (e) {
                console.error(`[VibeOSK] Failed to send combo: ${e}`);
            }
        }
    }

    commitText(text) {
        if (!text) return;

        // Try GNOME Shell InputMethod if available
        try {
            if (Main.inputMethod && typeof Main.inputMethod.commit === 'function') {
                Main.inputMethod.commit(text);
                return;
            }
        } catch (e) {}

        // Fallback: character by character keyval injection
        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i);
            const now = GLib.get_monotonic_time() + (i * 1000);
            if (this._virtualDevice) {
                try {
                    const keyval = charCode;
                    this._virtualDevice.notify_keyval(now, keyval, Clutter.KeyState.PRESSED);
                    this._virtualDevice.notify_keyval(now + 500, keyval, Clutter.KeyState.RELEASED);
                } catch (e) {}
            }
        }
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
