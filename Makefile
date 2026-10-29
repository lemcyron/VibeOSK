# Makefile for Vibe On-Screen Keyboard Extension
UUID = vibe-osk@extensions.gnome.org
EXT_DIR = $(HOME)/.local/share/gnome-shell/extensions/$(UUID)
SCHEMAS_DIR = schemas
GSCHEMA = $(SCHEMAS_DIR)/org.gnome.shell.extensions.vibeosk.gschema.xml

SOURCES = metadata.json extension.js prefs.js stylesheet.css \
          src/constants.js src/layouts.js src/keyInput.js src/keyboard.js src/indicator.js

.PHONY: all clean compile-schemas install uninstall pack zip

all: compile-schemas

compile-schemas: $(GSCHEMA)
	@echo "Compiling GSettings schemas..."
	glib-compile-schemas $(SCHEMAS_DIR)/

install: compile-schemas
	@echo "Installing extension to $(EXT_DIR)..."
	mkdir -p $(EXT_DIR)/src
	mkdir -p $(EXT_DIR)/schemas
	cp metadata.json $(EXT_DIR)/
	cp extension.js $(EXT_DIR)/
	cp prefs.js $(EXT_DIR)/
	cp stylesheet.css $(EXT_DIR)/
	cp src/*.js $(EXT_DIR)/src/
	cp schemas/org.gnome.shell.extensions.vibeosk.gschema.xml $(EXT_DIR)/schemas/
	glib-compile-schemas $(EXT_DIR)/schemas/
	@echo "Installation complete. Enable extension via: gnome-extensions enable $(UUID)"

uninstall:
	@echo "Removing $(EXT_DIR)..."
	rm -rf $(EXT_DIR)
	@echo "Uninstall complete."

pack: compile-schemas
	@echo "Packaging extension..."
	gnome-extensions pack --force \
		--extra-source=src \
		--extra-source=schemas/gschemas.compiled \
		--schema=schemas/org.gnome.shell.extensions.vibeosk.gschema.xml \
		.
	@echo "Packaged extension into $(UUID).shell-extension.zip"

zip: pack

clean:
	rm -f $(SCHEMAS_DIR)/gschemas.compiled
	rm -f $(UUID).shell-extension.zip
