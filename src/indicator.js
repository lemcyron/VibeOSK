// Panel Indicator Button for Vibe On-Screen Keyboard
import GObject from 'gi://GObject';
import St from 'gi://St';
import Clutter from 'gi://Clutter';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';
import { gettext as _ } from 'resource:///org/gnome/shell/extensions/extension.js';
import { LayoutTypes, DockPosition } from './constants.js';
import { LayoutDefinitions } from './layouts.js';

export const VibeOSKIndicator = GObject.registerClass(
class VibeOSKIndicator extends PanelMenu.Button {
    _init(extension, keyboardWidget, settings) {
        super._init(0.0, _('Vibe OSK'));

        this._extension = extension;
        this._keyboard = keyboardWidget;
        this._settings = settings;

        // Panel Icon
        this._icon = new St.Icon({
            icon_name: 'input-keyboard-symbolic',
            style_class: 'system-status-icon',
        });
        this.add_child(this._icon);

        // Build Dropdown Menu
        this._buildMenu();

        // Primary click toggles OSK directly
        this.connect('button-press-event', (actor, event) => {
            const button = event.get_button();
            if (button === Clutter.BUTTON_PRIMARY) {
                // Close menu if open, toggle keyboard
                this.menu.close();
                this._keyboard.toggle();
                return Clutter.EVENT_STOP;
            }
            return Clutter.EVENT_PROPAGATE;
        });

        // Touch event toggles OSK
        this.connect('touch-event', (actor, event) => {
            if (event.type() === Clutter.EventType.TOUCH_BEGIN) {
                this.menu.close();
                this._keyboard.toggle();
                return Clutter.EVENT_STOP;
            }
            return Clutter.EVENT_PROPAGATE;
        });
    }

    _buildMenu() {
        // Toggle Switch Item
        const toggleItem = new PopupMenu.PopupSwitchMenuItem(_('Show Keyboard'), this._keyboard.isKeyboardVisible());
        toggleItem.connect('toggled', (item, state) => {
            if (state) {
                this._keyboard.show();
            } else {
                this._keyboard.hide();
            }
        });
        this.menu.addMenuItem(toggleItem);

        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());

        // Layouts Submenu
        const layoutSubMenu = new PopupMenu.PopupSubMenuMenuItem(_('Keyboard Layout'));
        const currentLayout = this._settings.get_string('layout') || LayoutTypes.QWERTY;

        const layouts = [
            { id: LayoutTypes.QWERTY, name: 'QWERTY (US)' },
            { id: LayoutTypes.QWERTZ, name: 'QWERTZ (DE)' },
            { id: LayoutTypes.AZERTY, name: 'AZERTY (FR)' },
            { id: LayoutTypes.DVORAK, name: 'Dvorak' },
            { id: LayoutTypes.NUMPAD, name: 'Numeric Keypad' },
            { id: LayoutTypes.SYMBOLS, name: 'Symbols & Punctuation' },
            { id: LayoutTypes.FUNCTION, name: 'Function Keys (F1-F12)' },
            { id: LayoutTypes.EMOJI, name: 'Emoji Picker' },
        ];

        this._layoutMenuItems = {};
        for (const l of layouts) {
            const item = new PopupMenu.PopupMenuItem(l.name);
            if (l.id === currentLayout) {
                item.setOrnament(PopupMenu.Ornament.DOT);
            }
            item.connect('activate', () => {
                this._settings.set_string('layout', l.id);
                this._keyboard.setLayout(l.id);
                this._updateLayoutMenuOrnaments(l.id);
            });
            this._layoutMenuItems[l.id] = item;
            layoutSubMenu.menu.addMenuItem(item);
        }
        this.menu.addMenuItem(layoutSubMenu);

        // Position Submenu
        const posSubMenu = new PopupMenu.PopupSubMenuMenuItem(_('Dock Position'));
        const currentPos = this._settings.get_string('dock-position') || DockPosition.BOTTOM;

        const positions = [
            { id: DockPosition.BOTTOM, name: _('Bottom Docked') },
            { id: DockPosition.TOP, name: _('Top Docked') },
            { id: DockPosition.FLOATING, name: _('Floating Window') },
        ];

        this._posMenuItems = {};
        for (const pos of positions) {
            const item = new PopupMenu.PopupMenuItem(pos.name);
            if (pos.id === currentPos) {
                item.setOrnament(PopupMenu.Ornament.DOT);
            }
            item.connect('activate', () => {
                this._settings.set_string('dock-position', pos.id);
                this._updatePosMenuOrnaments(pos.id);
            });
            this._posMenuItems[pos.id] = item;
            posSubMenu.menu.addMenuItem(item);
        }
        this.menu.addMenuItem(posSubMenu);

        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());

        // Preferences Button
        const prefsItem = new PopupMenu.PopupMenuItem(_('Keyboard Settings…'));
        prefsItem.connect('activate', () => {
            this._extension.openPreferences();
        });
        this.menu.addMenuItem(prefsItem);
    }

    _updateLayoutMenuOrnaments(activeId) {
        for (const [id, item] of Object.entries(this._layoutMenuItems)) {
            item.setOrnament(id === activeId ? PopupMenu.Ornament.DOT : PopupMenu.Ornament.NONE);
        }
    }

    _updatePosMenuOrnaments(activeId) {
        for (const [id, item] of Object.entries(this._posMenuItems)) {
            item.setOrnament(id === activeId ? PopupMenu.Ornament.DOT : PopupMenu.Ornament.NONE);
        }
    }
});
