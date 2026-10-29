#!/usr/bin/env bash
set -e

UUID="vibe-osk@extensions.gnome.org"
TARGET_DIR="${HOME}/.local/share/gnome-shell/extensions/${UUID}"

echo "=========================================================="
echo "Installing Vibe On-Screen Keyboard Extension"
echo "Target: ${TARGET_DIR}"
echo "=========================================================="

# Create directories
mkdir -p "${TARGET_DIR}/src"
mkdir -p "${TARGET_DIR}/schemas"

# Copy files
cp metadata.json "${TARGET_DIR}/"
cp extension.js "${TARGET_DIR}/"
cp prefs.js "${TARGET_DIR}/"
cp stylesheet.css "${TARGET_DIR}/"
cp src/*.js "${TARGET_DIR}/src/"
cp schemas/org.gnome.shell.extensions.vibeosk.gschema.xml "${TARGET_DIR}/schemas/"

# Compile schema
if command -v glib-compile-schemas &> /dev/null; then
    echo "Compiling GSettings schema..."
    glib-compile-schemas "${TARGET_DIR}/schemas/"
else
    echo "Warning: glib-compile-schemas not found. Please compile schemas manually."
fi

echo "=========================================================="
echo "Successfully installed ${UUID}!"
echo ""
echo "To enable:"
echo "  1. If in X11: Press Alt+F2, type 'r', and press Enter."
echo "  2. If in Wayland: Log out and log back in (or restart session)."
echo "  3. Enable with command:"
echo "     gnome-extensions enable ${UUID}"
echo "=========================================================="
