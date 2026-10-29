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

        // Auto-show focus detection
        this._stageFocusSignalId = null;
        this._setupAutoShow();

        // Listen for auto-show preference change
        this._autoShowSettingSig = this._settings.connect('changed::auto-show-on-focus', () => {
            this._setupAutoShow();
        });
    }

    _setupAutoShow() {
        // Disconnect existing if any
        if (this._stageFocusSignalId) {
            global.stage.disconnect(this._stageFocusSignalId);
            this._stageFocusSignalId = null;
        }

        const autoShow = this._settings.get_boolean('auto-show-on-focus');
        if (!autoShow) return;

        this._stageFocusSignalId = global.stage.connect('notify::key-focus', () => {
            const focusActor = global.stage.get_key_focus();
            if (!focusActor) return;

            // Check if focus is an editable text entry
            const isEntry = (focusActor instanceof Clutter.Text && focusActor.is_editable()) ||
                            (focusActor instanceof St.Entry);

            // Do not trigger when interacting with our own keyboard
            if (isEntry && !this._keyboard.contains(focusActor)) {
                this._keyboard.show();
            }
        });
    }

    disable() {
        console.log(`[VibeOSK] Disabling ${this.metadata.name}`);

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
