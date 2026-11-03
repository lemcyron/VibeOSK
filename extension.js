// Vibe On-Screen Keyboard Extension (GNOME 45-51)
import { Extension, gettext as _ } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import Clutter from 'gi://Clutter';
import St from 'gi://St';

import { KeyInputManager } from './src/keyInput.js';
import { KeyboardWidget } from './src/keyboard.js';
import { VibeOSKIndicator } from './src/indicator.js';

export default class VibeOSKExtension extends Extension {
    enable() {
        console.log(`[VibeOSK] Enabling ${this.metadata.name} (v${this.metadata.version})`);

        this._settings = this.getSettings();
        this._keyInput = new KeyInputManager(this._settings);
        this._keyboard = new KeyboardWidget(this, this._keyInput, this._settings);
        this._indicator = new VibeOSKIndicator(this, this._keyboard, this._settings);

        // Add to panel status area
        const pos = this._settings.get_string('indicator-position') || 'right';
        Main.panel.addToStatusArea(this.uuid, this._indicator, 1, pos);

        // Suppress GNOME's built-in on-screen keyboard so VibeOSK has priority
        this._suppressGnomeOSK();

        // Show VibeOSK when GNOME would have shown its OSK (touch tap on an app's
        // text field) and keep it docked away from the focused field
        this._lastFieldRect = null;
        this._setupInputMethodTracking();

        // Auto-show focus detection
        this._stageFocusSignalId = null;
        this._setupAutoShow();

        // Listen for auto-show preference change
        this._autoShowSettingSig = this._settings.connect('changed::auto-show-on-focus', () => {
            this._setupAutoShow();
        });
    }

    _isTouchMode() {
        try {
            return !!Clutter.get_default_backend().get_default_seat().touch_mode;
        } catch (e) {
            return false;
        }
    }

    // Show VibeOSK, docked away from the given field rectangle (if known)
    _showKeyboardFor(rect) {
        if (rect) this._lastFieldRect = rect;
        const r = this._lastFieldRect;
        if (r) this._keyboard.setAvoidRect(r.x, r.y, r.width, r.height);
        this._keyboard.show();
    }

    _setupInputMethodTracking() {
        // 1. Text-field cursor/caret location reported by apps through the input method
        try {
            this._cursorLocSig = Main.inputMethod.connect('cursor-location-changed', (_o, rect) => {
                if (!rect) return;
                const x = rect.x ?? rect.get_x();
                const y = rect.y ?? rect.get_y();
                const width = rect.width ?? rect.get_width();
                const height = rect.height ?? rect.get_height();
                this._lastFieldRect = { x, y, width, height };
                if (this._keyboard.isKeyboardVisible())
                    this._keyboard.setAvoidRect(x, y, width, height);
            });
        } catch (e) {
            this._cursorLocSig = null;
        }

        // 2. GNOME's own OSK open requests (tap on an app text field in touch mode)
        const actor = Main.keyboard?.keyboardActor ?? Main.keyboard?._keyboard;
        if (actor && typeof actor.open === 'function' && !actor._vibeOSK_origOpen) {
            this._gnomeOskActor = actor;
            actor._vibeOSK_origOpen = actor.open;
            actor.open = () => this._showKeyboardFor(null);
        }

        // 3. Fallback: GNOME's OSK became visible anyway -> swap it for VibeOSK
        this._kbVisibleSig = Main.layoutManager.connect('keyboard-visible-changed', (_lm, visible) => {
            if (!visible) return;
            this._showKeyboardFor(null);
            try {
                Main.keyboard?.keyboardActor?.close(true);
            } catch (e) {}
        });
    }

    _teardownInputMethodTracking() {
        if (this._cursorLocSig) {
            Main.inputMethod.disconnect(this._cursorLocSig);
            this._cursorLocSig = null;
        }
        if (this._kbVisibleSig) {
            Main.layoutManager.disconnect(this._kbVisibleSig);
            this._kbVisibleSig = null;
        }
        const actor = this._gnomeOskActor;
        if (actor && actor._vibeOSK_origOpen) {
            actor.open = actor._vibeOSK_origOpen;
            delete actor._vibeOSK_origOpen;
        }
        this._gnomeOskActor = null;
    }

    _suppressGnomeOSK() {
        // GNOME's built-in keyboard manager lives at Main.keyboard.
        // We patch its _show/_open methods to no-ops so it never appears
        // while VibeOSK is active. The originals are restored on disable().
        const kb = Main.keyboard;
        if (!kb) return;

        if (typeof kb._show === 'function' && !kb._vibeOSK_origShow) {
            kb._vibeOSK_origShow = kb._show.bind(kb);
            kb._show = () => {};
        }
        if (typeof kb._open === 'function' && !kb._vibeOSK_origOpen) {
            kb._vibeOSK_origOpen = kb._open.bind(kb);
            kb._open = () => {};
        }
        // Also hide it immediately in case it is currently visible
        try {
            if (typeof kb._hide === 'function') kb._hide();
        } catch (e) {}
    }

    _restoreGnomeOSK() {
        const kb = Main.keyboard;
        if (!kb) return;

        if (kb._vibeOSK_origShow) {
            kb._show = kb._vibeOSK_origShow;
            delete kb._vibeOSK_origShow;
        }
        if (kb._vibeOSK_origOpen) {
            kb._open = kb._vibeOSK_origOpen;
            delete kb._vibeOSK_origOpen;
        }
    }

    _setupAutoShow() {
        // Disconnect existing if any
        if (this._stageFocusSignalId) {
            global.stage.disconnect(this._stageFocusSignalId);
            this._stageFocusSignalId = null;
        }

        this._stageFocusSignalId = global.stage.connect('notify::key-focus', () => {
            // Always auto-show in touch mode; otherwise follow the preference
            if (!this._isTouchMode() && !this._settings.get_boolean('auto-show-on-focus'))
                return;

            const focusActor = global.stage.get_key_focus();
            if (!focusActor) return;

            // Check if focus is an editable text entry
            const isEntry = (focusActor instanceof Clutter.Text && focusActor.is_editable()) ||
                            (focusActor instanceof St.Entry);

            // Do not trigger when interacting with our own keyboard
            if (isEntry && !this._keyboard.contains(focusActor)) {
                const [x, y] = focusActor.get_transformed_position();
                const [w, h] = focusActor.get_transformed_size();
                this._showKeyboardFor({ x, y, width: w, height: h });
            }
        });
    }

    disable() {
        console.log(`[VibeOSK] Disabling ${this.metadata.name}`);

        // Restore GNOME's built-in OSK
        this._teardownInputMethodTracking();
        this._restoreGnomeOSK();

        if (this._autoShowSettingSig) {
            this._settings.disconnect(this._autoShowSettingSig);
            this._autoShowSettingSig = null;
        }

        if (this._stageFocusSignalId) {
            global.stage.disconnect(this._stageFocusSignalId);
            this._stageFocusSignalId = null;
        }

        if (this._indicator) {
            this._indicator.destroy();
            this._indicator = null;
        }

        if (this._keyboard) {
            this._keyboard.destroy();
            this._keyboard = null;
        }

        if (this._keyInput) {
            this._keyInput.destroy();
            this._keyInput = null;
        }

        this._settings = null;
    }
}
