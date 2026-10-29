// Libadwaita Preferences Window for Vibe On-Screen Keyboard
import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import Gio from 'gi://Gio';
import { ExtensionPreferences, gettext as _ } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class VibeOSKPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const settings = this.getSettings();

        // Window size
        window.set_default_size(680, 720);

        // General / Layout Page
        const generalPage = new Adw.PreferencesPage({
            title: _('General'),
            icon_name: 'input-keyboard-symbolic',
        });

        // Layout Group
        const layoutGroup = new Adw.PreferencesGroup({
            title: _('Layout & Input Options'),
            description: _('Configure default layout and input behaviors'),
        });

        // Default Layout ComboRow
        const layoutModel = new Gtk.StringList();
        const layoutKeys = ['qwerty', 'qwertz', 'azerty', 'dvorak', 'numpad', 'symbols', 'function', 'emoji'];
        const layoutLabels = [
            _('QWERTY (US)'),
            _('QWERTZ (German/EU)'),
            _('AZERTY (French)'),
            _('Dvorak'),
            _('Numeric Keypad (Numpad)'),
            _('Symbols & Punctuation'),
            _('Function Keys (F1-F12, Esc, Arrows)'),
            _('Emoji Picker')
        ];
        layoutLabels.forEach(label => layoutModel.append(label));

        const layoutRow = new Adw.ComboRow({
            title: _('Default Layout'),
            subtitle: _('Keyboard layout loaded on startup'),
            model: layoutModel,
        });

        const currentLayout = settings.get_string('layout');
        const layoutIndex = layoutKeys.indexOf(currentLayout);
        if (layoutIndex >= 0) {
            layoutRow.set_selected(layoutIndex);
        }

        layoutRow.connect('notify::selected', () => {
            const selected = layoutRow.get_selected();
            if (selected >= 0 && selected < layoutKeys.length) {
                settings.set_string('layout', layoutKeys[selected]);
            }
        });
        layoutGroup.add(layoutRow);

        // Auto-show on Focus Switch
        const autoShowRow = new Adw.SwitchRow({
            title: _('Auto-show on Text Focus'),
            subtitle: _('Automatically reveal keyboard when an editable text field is clicked'),
        });
        settings.bind('auto-show-on-focus', autoShowRow, 'active', Gio.SettingsBindFlags.DEFAULT);
        layoutGroup.add(autoShowRow);

        // Key Preview Bubble Switch
        const previewRow = new Adw.SwitchRow({
            title: _('Key Preview Magnifier'),
            subtitle: _('Display a magnified bubble above the tapped key'),
        });
        settings.bind('preview-popup', previewRow, 'active', Gio.SettingsBindFlags.DEFAULT);
        layoutGroup.add(previewRow);

        // Sound Feedback Switch
        const soundRow = new Adw.SwitchRow({
            title: _('Audio Feedback'),
            subtitle: _('Play audio feedback when keys are pressed'),
        });
        settings.bind('sound-feedback', soundRow, 'active', Gio.SettingsBindFlags.DEFAULT);
        layoutGroup.add(soundRow);

        generalPage.add(layoutGroup);

        // Docking & Position Group
        const positionGroup = new Adw.PreferencesGroup({
            title: _('Position & Docking'),
            description: _('Manage dock positioning and window behaviors'),
        });

        // Dock Position ComboRow
        const posModel = new Gtk.StringList();
        const posKeys = ['bottom', 'top', 'floating'];
        const posLabels = [_('Bottom Docked'), _('Top Docked'), _('Floating / Draggable Window')];
        posLabels.forEach(l => posModel.append(l));

        const posRow = new Adw.ComboRow({
            title: _('Dock Position'),
            subtitle: _('Where the keyboard attaches on the screen'),
            model: posModel,
        });

        const currentPos = settings.get_string('dock-position');
        const posIndex = posKeys.indexOf(currentPos);
        if (posIndex >= 0) {
            posRow.set_selected(posIndex);
        }

        posRow.connect('notify::selected', () => {
            const selected = posRow.get_selected();
            if (selected >= 0 && selected < posKeys.length) {
                settings.set_string('dock-position', posKeys[selected]);
            }
        });
        positionGroup.add(posRow);

        // Indicator Position ComboRow
        const indModel = new Gtk.StringList();
        const indKeys = ['right', 'center', 'left'];
        const indLabels = [_('Right (Status Area)'), _('Center'), _('Left')];
        indLabels.forEach(l => indModel.append(l));

        const indRow = new Adw.ComboRow({
            title: _('Top Panel Indicator Position'),
            subtitle: _('Placement of keyboard icon in GNOME top bar'),
            model: indModel,
        });

        const currentInd = settings.get_string('indicator-position');
        const indIndex = indKeys.indexOf(currentInd);
        if (indIndex >= 0) {
            indRow.set_selected(indIndex);
        }

        indRow.connect('notify::selected', () => {
            const selected = indRow.get_selected();
            if (selected >= 0 && selected < indKeys.length) {
                settings.set_string('indicator-position', indKeys[selected]);
            }
        });
        positionGroup.add(indRow);

        generalPage.add(positionGroup);
        window.add(generalPage);

        // Appearance Page
        const appearancePage = new Adw.PreferencesPage({
            title: _('Appearance'),
            icon_name: 'preferences-desktop-theme-symbolic',
        });

        const styleGroup = new Adw.PreferencesGroup({
            title: _('Theme & Sizing'),
            description: _('Customize keyboard styling, height, width, and transparency'),
        });

        // Theme Style ComboRow
        const themeModel = new Gtk.StringList();
        const themeKeys = ['system', 'dark', 'light', 'high-contrast', 'amoled'];
        const themeLabels = [
            _('System Default (GNOME Shell Theme)'),
            _('Dark Mode'),
            _('Light Mode'),
            _('High Contrast'),
            _('AMOLED Pure Black')
        ];
        themeLabels.forEach(l => themeModel.append(l));

        const themeRow = new Adw.ComboRow({
            title: _('Color Theme'),
            subtitle: _('Visual theme applied to the keyboard frame and keys'),
            model: themeModel,
        });

        const currentTheme = settings.get_string('theme-style');
        const themeIndex = themeKeys.indexOf(currentTheme);
        if (themeIndex >= 0) {
            themeRow.set_selected(themeIndex);
        }

        themeRow.connect('notify::selected', () => {
            const selected = themeRow.get_selected();
            if (selected >= 0 && selected < themeKeys.length) {
                settings.set_string('theme-style', themeKeys[selected]);
            }
        });
        styleGroup.add(themeRow);

        // Height SpinRow
        const heightRow = new Adw.SpinRow({
            title: _('Keyboard Height (px)'),
            subtitle: _('Overall height of the keyboard container'),
            adjustment: new Gtk.Adjustment({
                lower: 180,
                upper: 600,
                step_increment: 10,
                page_increment: 50,
            }),
        });
        settings.bind('keyboard-height', heightRow, 'value', Gio.SettingsBindFlags.DEFAULT);
        styleGroup.add(heightRow);

        // Width Percent SpinRow
        const widthRow = new Adw.SpinRow({
            title: _('Width Percentage (%)'),
            subtitle: _('Percentage of screen width occupied by docked keyboard'),
            adjustment: new Gtk.Adjustment({
                lower: 40,
                upper: 100,
                step_increment: 5,
                page_increment: 10,
            }),
        });
        settings.bind('keyboard-width-percent', widthRow, 'value', Gio.SettingsBindFlags.DEFAULT);
        styleGroup.add(widthRow);

        // Opacity Row
        const opacityRow = new Adw.ActionRow({
            title: _('Background Opacity'),
            subtitle: _('Adjust transparency of the keyboard background'),
        });

        const opacityScale = new Gtk.Scale({
            orientation: Gtk.Orientation.HORIZONTAL,
            adjustment: new Gtk.Adjustment({
                lower: 0.40,
                upper: 1.00,
                step_increment: 0.05,
                page_increment: 0.10,
            }),
            draw_value: true,
            hexpand: true,
            digits: 2,
        });
        opacityScale.set_value(settings.get_double('keyboard-opacity'));
        opacityScale.connect('value-changed', () => {
            settings.set_double('keyboard-opacity', opacityScale.get_value());
        });
        opacityRow.add_suffix(opacityScale);
        styleGroup.add(opacityRow);

        appearancePage.add(styleGroup);
        window.add(appearancePage);
    }
}
