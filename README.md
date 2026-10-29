# Vibe On-Screen Keyboard (OSK) Extension

A customizable on-screen keyboard extension for **GNOME Shell 45, 46, 47, 48, 49, 50, and 51**.

---

## Features

- **Multiple Keyboard Layouts**:
  - `QWERTY` (Standard US)
  - `QWERTZ` (German & Central European)
  - `AZERTY` (French)
  - `Dvorak`
  - `Numeric Keypad` (Numpad with calculator operators and shortcuts)
  - `Symbols & Punctuation` (Multi-page symbols, math operators, currencies)
  - `Function & Navigation Keys` (`F1`-`F12`, `Esc`, `Tab`, `Home`, `End`, `PgUp`, `PgDn`, `Insert`, `Delete`, arrow navigation, and `Ctrl+A/C/V/Z` shortcuts)
  - `Emoji Picker` (Common emojis and reaction smileys)

- **Input & Modifiers**:
  - Full support for `Shift`, `Caps Lock`, `Ctrl`, `Alt`, `Super (Windows)`, and `AltGr`.
  - Long press support for international accents (e.g., hold `e` for `é, è, ê, ë, €`, hold `a` for `á, à, â, ä, æ`).
  - Key repeat for navigation, backspace, and deletion keys.
  - Native key injection via Clutter Virtual Keyboard Device and GNOME InputMethod commit.

- **Docking & Positioning**:
  - **Bottom Docked** (Standard OSK bottom bar)
  - **Top Docked** (Attached below top panel)
  - **Floating / Draggable Window** (Movable anywhere on screen with touch or mouse)

- **Visuals & Customization**:
  - **Themes**: System Default, Dark Mode, Light Mode, High Contrast, and AMOLED Pure Black.
  - Magnified key preview popup bubble.
  - Adjustable height (180px - 600px), width percentage, and background opacity.
  - Auto-show on editable text focus (optional toggle).
  - Modern Libadwaita Preferences UI (`prefs.js`).

- **Top Bar Panel Indicator**:
  - Click to toggle keyboard instantly.
  - Right-click / popover menu for quick layout switching, dock position selection, and settings.

---

## Project Structure

```text
vibe-osk@extensions.gnome.org/
├── metadata.json                                      # Extension metadata and GNOME Shell version support
├── extension.js                                       # Main extension entrypoint (GNOME ESM)
├── prefs.js                                           # Libadwaita GTK4 preferences dialog
├── stylesheet.css                                     # Styling and themes for keyboard and keys
├── Makefile                                           # Build, install, and pack scripts
├── install.sh                                         # Linux installer script
├── schemas/
│   └── org.gnome.shell.extensions.vibeosk.gschema.xml # GSettings configuration schema
└── src/
    ├── constants.js                                   # Keysyms, layout IDs, and key codes
    ├── layouts.js                                     # Layout row and key matrices
    ├── keyInput.js                                    # Virtual device injection & modifiers
    ├── keyboard.js                                    # Keyboard UI container & gesture dragging
    └── indicator.js                                   # Top panel status indicator button
```

---

## Installation

### Method 1: Using Make
```bash
make install
gnome-extensions enable vibe-osk@extensions.gnome.org
```

### Method 2: Using the Install Script
```bash
chmod +x install.sh
./install.sh
```

### Method 3: Manual Installation
1. Copy the extension directory to `~/.local/share/gnome-shell/extensions/vibe-osk@extensions.gnome.org/`:
   ```bash
   mkdir -p ~/.local/share/gnome-shell/extensions/vibe-osk@extensions.gnome.org
   cp -r * ~/.local/share/gnome-shell/extensions/vibe-osk@extensions.gnome.org/
   ```
2. Compile the schema:
   ```bash
   glib-compile-schemas ~/.local/share/gnome-shell/extensions/vibe-osk@extensions.gnome.org/schemas/
   ```
3. Restart GNOME Shell (under X11 press `Alt+F2`, enter `r`, press `Enter`; under Wayland, log out and log back in).
4. Enable the extension:
   ```bash
   gnome-extensions enable vibe-osk@extensions.gnome.org
   ```

---

## Packaging into a Zip for Distribution

To create a `.shell-extension.zip` bundle:
```bash
make pack
```
This generates `vibe-osk@extensions.gnome.org.shell-extension.zip` ready for uploading to [extensions.gnome.org](https://extensions.gnome.org).

---

## Configuration via Settings

Run:
```bash
gnome-extensions prefs vibe-osk@extensions.gnome.org
```
Or open via the Top Panel icon -> **Keyboard Settings…**.

Settings available:
- **Default Layout**: Select default keyboard upon startup.
- **Auto-show on Text Focus**: Automatically popup when an entry field is clicked.
- **Key Preview Magnifier**: Magnified bubble above pressed key.
- **Audio Feedback**: Play click feedback sound on press.
- **Dock Position**: Bottom, Top, or Floating window.
- **Color Theme**: System, Dark, Light, High Contrast, AMOLED.
- **Keyboard Height & Width**: Fine-tune dimensions and opacity.
