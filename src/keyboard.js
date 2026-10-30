// Keyboard UI Component for GNOME Enhanced On-Screen Keyboard
import St from 'gi://St';
import Clutter from 'gi://Clutter';
import GObject from 'gi://GObject';
import GLib from 'gi://GLib';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import { LayoutDefinitions } from './layouts.js';
import { LayoutTypes, DockPosition, SpecialKeyType } from './constants.js';

export const KeyboardWidget = GObject.registerClass(
class KeyboardWidget extends St.BoxLayout {
    _init(extension, keyInputManager, settings) {
        super._init({
            name: 'VibeOSKContainer',
            style_class: 'osk-container',
            orientation: Clutter.Orientation.VERTICAL,
            reactive: true,
            can_focus: false,
            track_hover: true,
        });

        this._extension = extension;
        this._keyInput = keyInputManager;
        this._settings = settings;

        this._currentLayout = this._settings.get_string('layout') || LayoutTypes.QWERTY;
        this._dockPosition = this._settings.get_string('dock-position') || DockPosition.BOTTOM;
        this._isShown = false;
        this._keyButtons = [];
        this._activePreview = null;
        this._accentPopover = null;

        // Floating drag state
        this._isDragging = false;
        this._dragStartX = 0;
        this._dragStartY = 0;
        this._actorStartX = 0;
        this._actorStartY = 0;

        // Listen for modifier state changes
        this._modifierListener = (mods) => this._updateModifierVisuals(mods);
        this._keyInput.addModifierListener(this._modifierListener);

        // Build UI
        this._buildHeader();
        this._buildKeyboardBody();
        this._applyTheme();

        // Connect settings changes
        this._settingsSignals = [];
        this._connectSettings();

        // Re-fit size and position when the display is rotated/resized or monitors change
        this._monitorsChangedId = Main.layoutManager.connect('monitors-changed', () => this._updateSize());
    }

    _connectSettings() {
        const addSig = (key, callback) => {
            const id = this._settings.connect(`changed::${key}`, callback);
            this._settingsSignals.push(id);
        };

        addSig('layout', () => {
            this._currentLayout = this._settings.get_string('layout');
            this._rebuildKeys();
        });

        addSig('dock-position', () => {
            this._dockPosition = this._settings.get_string('dock-position');
            this._updateDockLayout();
        });

        addSig('keyboard-height', () => this._updateSize());
        addSig('keyboard-width-percent', () => this._updateSize());
        addSig('keyboard-opacity', () => this._applyOpacity());
        addSig('theme-style', () => this._applyTheme());
    }

    _buildHeader() {
        this._headerBox = new St.BoxLayout({
            style_class: 'osk-header',
            orientation: Clutter.Orientation.HORIZONTAL,
            reactive: true,
        });

        // Drag handle / Title
        this._dragHandle = new St.BoxLayout({
            style_class: 'osk-drag-handle',
            reactive: true,
            x_expand: true,
            y_align: Clutter.ActorAlign.CENTER,
        });

        const titleIcon = new St.Icon({
            icon_name: 'input-keyboard-symbolic',
            style_class: 'osk-header-icon',
        });
        this._titleLabel = new St.Label({
            text: LayoutDefinitions[this._currentLayout]?.name || 'Keyboard',
            style_class: 'osk-header-title',
            y_align: Clutter.ActorAlign.CENTER,
        });

        this._dragHandle.add_child(titleIcon);
        this._dragHandle.add_child(this._titleLabel);

        // Connect drag events on the handle
        this._dragHandle.connect('button-press-event', (actor, event) => this._onDragStart(event));
        this._dragHandle.connect('button-release-event', () => this._onDragEnd());
        this._dragHandle.connect('motion-event', (actor, event) => this._onDragMotion(event));
        this._dragHandle.connect('touch-event', (actor, event) => this._onTouchDrag(event));

        // Quick dock toggle (Top/Bottom)
        this._dockBtn = new St.Button({
            style_class: 'osk-header-btn osk-wide-btn',
            child: new St.Icon({ icon_name: 'view-restore-symbolic', style_class: 'osk-icon-btn' }),
            can_focus: false,
        });
        this._dockBtn.connect('clicked', () => this._toggleDockMode());

        // Settings button
        this._settingsBtn = new St.Button({
            style_class: 'osk-header-btn osk-wide-btn',
            child: new St.Icon({ icon_name: 'emblem-system-symbolic', style_class: 'osk-icon-btn' }),
            can_focus: false,
        });
        this._settingsBtn.connect('clicked', () => {
            this._extension.openPreferences();
        });

        // Close / Minimize button
        this._closeBtn = new St.Button({
            style_class: 'osk-header-btn osk-close-btn',
            child: new St.Icon({ icon_name: 'window-close-symbolic', style_class: 'osk-icon-btn' }),
            can_focus: false,
        });
        this._closeBtn.connect('clicked', () => this.hide());

        this._headerBox.add_child(this._settingsBtn);
        this._headerBox.add_child(this._dragHandle);
        this._headerBox.add_child(this._dockBtn);
        this._headerBox.add_child(this._closeBtn);

        this.add_child(this._headerBox);
    }

    _buildKeyboardBody() {
        if (this._bodyBox) {
            this.remove_child(this._bodyBox);
            this._bodyBox.destroy();
        }

        this._bodyBox = new St.BoxLayout({
            name: 'VibeOSKBody',
            style_class: 'osk-body',
            orientation: Clutter.Orientation.VERTICAL,
            x_expand: true,
            y_expand: true,
        });

        this._keyButtons = [];
        const layoutData = LayoutDefinitions[this._currentLayout] || LayoutDefinitions[LayoutTypes.QWERTY];

        for (const rowData of layoutData.rows) {
            const rowBox = new St.BoxLayout({
                style_class: 'osk-row',
                orientation: Clutter.Orientation.HORIZONTAL,
                x_expand: true,
            });

            for (const keyData of rowData) {
                const keyButton = this._createKeyButton(keyData);
                rowBox.add_child(keyButton);
                this._keyButtons.push({ button: keyButton, data: keyData });
            }

            this._bodyBox.add_child(rowBox);
        }

        this.add_child(this._bodyBox);
        if (this._titleLabel) {
            this._titleLabel.text = layoutData.name;
        }
    }

    _getKeyDisplayLabel(keyData) {
        const isShifted = this._keyInput ? this._keyInput.isShifted() : false;
        if (isShifted) {
            if (keyData.shiftLabel) {
                return keyData.shiftLabel;
            }
            if (keyData.label && keyData.label.length === 1 && /[a-z]/i.test(keyData.label)) {
                return keyData.label.toUpperCase();
            }
        } else {
            if (keyData.label && keyData.label.length === 1 && /[a-z]/i.test(keyData.label)) {
                return keyData.label.toLowerCase();
            }
        }
        return keyData.label || keyData.text || '';
    }

    _createKeyButton(keyData) {
        const btn = new St.Button({
            style_class: `osk-key ${keyData.cssClass || ''}`,
            reactive: true,
            can_focus: false,
            track_hover: true,
            x_expand: !keyData.fixed,
            y_expand: true,
        });

        const flex = keyData.width || 1;
        const px = Math.round(flex * 52);
        // Fixed keys (arrow cluster) keep an identical pixel width in every row,
        // so Up and Down sit in the same column.
        btn.set_style(keyData.fixed
            ? `min-width: ${px}px; max-width: ${px}px;`
            : `-natural-width: ${px}px;`);

        const displayLabel = this._getKeyDisplayLabel(keyData);
        const mainLbl = new St.Label({
            text: displayLabel,
            style_class: keyData.cssClass ? 'osk-key-label' : 'osk-key-label-single',
            x_align: Clutter.ActorAlign.CENTER,
            y_align: Clutter.ActorAlign.CENTER,
            x_expand: true,
            y_expand: true,
        });

        btn.set_child(mainLbl);

        // Long press detection for accents
        let longPressTimer = null;
        let isLongPress = false;
        // Guards against the same physical tap being delivered twice
        // (touch event + emulated pointer event) and against releases
        // that were never preceded by a press on this button.
        let pressed = false;

        // Keys that auto-repeat while held fire on press, then repeat;
        // release only stops the repeat (no extra trailing action).
        const isRepeatable = keyData.type === SpecialKeyType.ACTION &&
            ['backspace', 'delete', 'left', 'right', 'up', 'down'].includes(keyData.action);

        const cancelPress = () => {
            pressed = false;
            btn.remove_style_pseudo_class('active');
            this._hideKeyPreview();
            this._keyInput.stopKeyRepeat();
            if (longPressTimer) {
                GLib.source_remove(longPressTimer);
                longPressTimer = null;
            }
        };

        const handlePress = () => {
            if (pressed) return;
            pressed = true;
            btn.add_style_pseudo_class('active');
            this._showKeyPreview(btn, keyData);

            isLongPress = false;
            if (keyData.accents && keyData.accents.length > 0) {
                longPressTimer = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 450, () => {
                    isLongPress = true;
                    this._showAccentsPopover(btn, keyData.accents);
                    longPressTimer = null;
                    return GLib.SOURCE_REMOVE;
                });
            }

            if (isRepeatable) {
                this._handleKeyAction(keyData);
                this._keyInput.startKeyRepeat(keyData, () => this._handleKeyAction(keyData));
            }
        };

        const handleRelease = () => {
            if (!pressed) return;
            cancelPress();

            if (!isLongPress && !isRepeatable) {
                this._handleKeyAction(keyData);
            }
        };

        btn.connect('button-press-event', (actor, event) => {
            if (event.get_button() === Clutter.BUTTON_PRIMARY) {
                handlePress();
                return Clutter.EVENT_STOP;
            }
            return Clutter.EVENT_PROPAGATE;
        });

        btn.connect('button-release-event', (actor, event) => {
            if (event.get_button() === Clutter.BUTTON_PRIMARY) {
                handleRelease();
                return Clutter.EVENT_STOP;
            }
            return Clutter.EVENT_PROPAGATE;
        });

        btn.connect('touch-event', (actor, event) => {
            const type = event.type();
            if (type === Clutter.EventType.TOUCH_BEGIN) {
                handlePress();
                return Clutter.EVENT_STOP;
            } else if (type === Clutter.EventType.TOUCH_END) {
                handleRelease();
                return Clutter.EVENT_STOP;
            } else if (type === Clutter.EventType.TOUCH_CANCEL) {
                cancelPress();
                return Clutter.EVENT_STOP;
            }
            return Clutter.EVENT_PROPAGATE;
        });

        btn.connect('leave-event', () => cancelPress());

        return btn;
    }

    _handleKeyAction(keyData) {
        if (!keyData) return;

        switch (keyData.type) {
            case SpecialKeyType.MODIFIER:
                this._keyInput.toggleModifier(keyData.modifier);
                break;

            case SpecialKeyType.SWITCH_LAYOUT:
                if (keyData.targetLayout) {
                    this.setLayout(keyData.targetLayout);
                }
                break;

            case SpecialKeyType.ACTION:
                if (keyData.combo) {
                    this._keyInput.sendCombo(keyData.combo, keyData.keyval);
                } else {
                    this._keyInput.sendKey(keyData);
                }
                break;

            case SpecialKeyType.NORMAL:
            default:
                this._keyInput.sendKey(keyData);
                break;
        }
    }

    _showKeyPreview(btn, keyData) {
        if (!this._settings.get_boolean('preview-popup')) return;

        this._hideKeyPreview();

        const labelText = this._getKeyDisplayLabel(keyData);

        if (!labelText) return;

        this._activePreview = new St.Label({
            text: labelText,
            style_class: 'osk-key-preview',
        });

        Main.layoutManager.addTopChrome(this._activePreview);

        const [stageX, stageY] = btn.get_transformed_position();
        const [width, height] = btn.get_transformed_size();

        this._activePreview.set_position(
            Math.round(stageX + (width / 2) - 28),
            Math.round(stageY - 55)
        );
    }

    _hideKeyPreview() {
        if (this._activePreview) {
            Main.layoutManager.removeChrome(this._activePreview);
            this._activePreview.destroy();
            this._activePreview = null;
        }
    }

    _showAccentsPopover(sourceBtn, accents) {
        this._hideAccentsPopover();

        this._accentPopover = new St.BoxLayout({
            style_class: 'osk-accent-popover',
            orientation: Clutter.Orientation.HORIZONTAL,
            reactive: true,
        });

        for (const acc of accents) {
            const accBtn = new St.Button({
                label: acc,
                style_class: 'osk-accent-btn',
                reactive: true,
                can_focus: false,
            });

            accBtn.connect('clicked', () => {
                this._keyInput.commitText(acc);
                this._hideAccentsPopover();
            });

            this._accentPopover.add_child(accBtn);
        }

        Main.layoutManager.addTopChrome(this._accentPopover);

        const [stageX, stageY] = sourceBtn.get_transformed_position();
        this._accentPopover.set_position(
            Math.max(10, Math.round(stageX - 40)),
            Math.max(10, Math.round(stageY - 55))
        );
    }

    _hideAccentsPopover() {
        if (this._accentPopover) {
            Main.layoutManager.removeChrome(this._accentPopover);
            this._accentPopover.destroy();
            this._accentPopover = null;
        }
    }

    _updateModifierVisuals(mods) {
        for (const { button, data } of this._keyButtons) {
            if (data.type === SpecialKeyType.MODIFIER) {
                if (mods[data.modifier]) {
                    button.add_style_pseudo_class('checked');
                } else {
                    button.remove_style_pseudo_class('checked');
                }
            } else {
                const child = button.get_child();
                if (child && child instanceof St.Label) {
                    child.text = this._getKeyDisplayLabel(data);
                }
            }
        }
    }

    setLayout(layoutType) {
        if (LayoutDefinitions[layoutType]) {
            this._currentLayout = layoutType;
            this._rebuildKeys();
        }
    }

    _rebuildKeys() {
        this._buildKeyboardBody();
        this._updateModifierVisuals(this._keyInput.modifiers);
    }

    _toggleDockMode() {
        // Header button toggles only Top <-> Bottom (Floating remains available in settings)
        const next = this._dockPosition === DockPosition.BOTTOM ? DockPosition.TOP : DockPosition.BOTTOM;
        this._dockPosition = next;
        this._settings.set_string('dock-position', next);
        this._updateDockLayout();
    }

    _applyTheme() {
        const theme = this._settings.get_string('theme-style') || 'system';
        const classes = ['theme-system', 'theme-dark', 'theme-light', 'theme-high-contrast', 'theme-amoled'];
        for (const cls of classes) {
            this.remove_style_class_name(cls);
        }
        this.add_style_class_name(`theme-${theme}`);
        this._applyOpacity();
    }

    _applyOpacity() {
        const opacity = this._settings.get_double('keyboard-opacity') || 0.95;
        this.set_opacity(Math.round(opacity * 255));
    }

    _updateSize() {
        const monitor = Main.layoutManager.primaryMonitor;
        if (!monitor) return;

        const targetHeight = this._settings.get_int('keyboard-height') || 290;
        const widthPercent = (this._settings.get_int('keyboard-width-percent') || 100) / 100;
        const targetWidth = Math.round(monitor.width * widthPercent);

        this.set_size(targetWidth, targetHeight);
        this._updateDockLayout();
    }

    _updateDockLayout() {
        const monitor = Main.layoutManager.primaryMonitor;
        if (!monitor) return;

        const width = this.width || monitor.width;
        const height = this.height || 290;

        switch (this._dockPosition) {
            case DockPosition.TOP:
                this.set_position(
                    Math.round(monitor.x + (monitor.width - width) / 2),
                    monitor.y + Main.panel.height
                );
                break;
            case DockPosition.FLOATING:
                const savedX = this._settings.get_int('floating-x');
                const savedY = this._settings.get_int('floating-y');
                this.set_position(
                    Math.max(monitor.x, Math.min(monitor.x + monitor.width - width, savedX || (monitor.x + 100))),
                    Math.max(monitor.y, Math.min(monitor.y + monitor.height - height, savedY || (monitor.y + 400)))
                );
                break;
            case DockPosition.BOTTOM:
            default:
                this.set_position(
                    Math.round(monitor.x + (monitor.width - width) / 2),
                    monitor.y + monitor.height - height
                );
                break;
        }
    }

    _onDragStart(event) {
        if (this._dockPosition !== DockPosition.FLOATING) {
            // Switch to floating on header drag
            this._dockPosition = DockPosition.FLOATING;
            this._settings.set_string('dock-position', DockPosition.FLOATING);
        }

        this._isDragging = true;
        const [x, y] = event.get_coords();
        this._dragStartX = x;
        this._dragStartY = y;
        this._actorStartX = this.x;
        this._actorStartY = this.y;
        return Clutter.EVENT_STOP;
    }

    _onDragMotion(event) {
        if (!this._isDragging) return Clutter.EVENT_PROPAGATE;

        const [x, y] = event.get_coords();
        const deltaX = x - this._dragStartX;
        const deltaY = y - this._dragStartY;

        const newX = this._actorStartX + deltaX;
        const newY = this._actorStartY + deltaY;

        this.set_position(newX, newY);
        return Clutter.EVENT_STOP;
    }

    _onDragEnd() {
        if (this._isDragging) {
            this._isDragging = false;
            this._settings.set_int('floating-x', this.x);
            this._settings.set_int('floating-y', this.y);
        }
        return Clutter.EVENT_STOP;
    }

    _onTouchDrag(event) {
        const type = event.type();
        if (type === Clutter.EventType.TOUCH_BEGIN) {
            return this._onDragStart(event);
        } else if (type === Clutter.EventType.TOUCH_UPDATE) {
            return this._onDragMotion(event);
        } else if (type === Clutter.EventType.TOUCH_END || type === Clutter.EventType.TOUCH_CANCEL) {
            return this._onDragEnd();
        }
        return Clutter.EVENT_PROPAGATE;
    }

    show() {
        if (this._isShown) return;

        this._updateSize();
        Main.layoutManager.addTopChrome(this);
        this._keepOnTop();

        this.opacity = 0;
        this._isShown = true;

        this.ease({
            opacity: Math.round((this._settings.get_double('keyboard-opacity') || 0.95) * 255),
            duration: 220,
            mode: Clutter.AnimationMode.EASE_OUT_QUAD,
        });
    }

    hide() {
        if (!this._isShown) return;

        this._hideKeyPreview();
        this._hideAccentsPopover();
        this._keyInput.stopKeyRepeat();

        this.ease({
            opacity: 0,
            duration: 180,
            mode: Clutter.AnimationMode.EASE_IN_QUAD,
            onComplete: () => {
                this._stopKeepOnTop();
                Main.layoutManager.removeChrome(this);
                this._isShown = false;
            }
        });
    }

    // Keep the keyboard stacked above panels, menus, dialogs and app windows
    // (everything except the lock screen shield).
    _raiseToTop() {
        const uiGroup = Main.layoutManager.uiGroup;
        if (!uiGroup || this.get_parent() !== uiGroup) return;

        const shield = Main.layoutManager.screenShieldGroup;
        if (shield && shield.get_parent() === uiGroup)
            uiGroup.set_child_below_sibling(this, shield);
        else
            uiGroup.set_child_above_sibling(this, null);
    }

    _keepOnTop() {
        this._raiseToTop();
        if (this._childAddedId) return;

        // Re-raise whenever another actor (popup menu, dialog, panel, ...) is added above us
        this._childAddedId = Main.layoutManager.uiGroup.connect('child-added', () => {
            if (this._raiseIdleId) return;
            this._raiseIdleId = GLib.idle_add(GLib.PRIORITY_DEFAULT_IDLE, () => {
                this._raiseIdleId = 0;
                this._raiseToTop();
                return GLib.SOURCE_REMOVE;
            });
        });
    }

    _stopKeepOnTop() {
        if (this._childAddedId) {
            Main.layoutManager.uiGroup.disconnect(this._childAddedId);
            this._childAddedId = 0;
        }
        if (this._raiseIdleId) {
            GLib.source_remove(this._raiseIdleId);
            this._raiseIdleId = 0;
        }
    }

    toggle() {
        if (this._isShown) {
            this.hide();
        } else {
            this.show();
        }
    }

    isKeyboardVisible() {
        return this._isShown;
    }

    destroy() {
        this._stopKeepOnTop();

        if (this._monitorsChangedId) {
            Main.layoutManager.disconnect(this._monitorsChangedId);
            this._monitorsChangedId = 0;
        }

        for (const sig of this._settingsSignals) {
            this._settings.disconnect(sig);
        }
        this._settingsSignals = [];

        if (this._modifierListener) {
            this._keyInput.removeModifierListener(this._modifierListener);
            this._modifierListener = null;
        }

        this._hideKeyPreview();
        this._hideAccentsPopover();

        if (this._isShown) {
            Main.layoutManager.removeChrome(this);
            this._isShown = false;
        }

        super.destroy();
    }
});
