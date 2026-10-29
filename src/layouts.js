// Layout definitions for GNOME Enhanced On-Screen Keyboard
import { KeyCodes, LayoutTypes, SpecialKeyType } from './constants.js';

export const LayoutDefinitions = {
    [LayoutTypes.QWERTY]: {
        name: 'QWERTY (US)',
        rows: [
            [
                { label: '`', shiftLabel: '~', keyval: KeyCodes.GRAVE, shiftKeyval: KeyCodes.ASCIITILDE, width: 1 },
                { label: '1', shiftLabel: '!', keyval: 0x31, shiftKeyval: KeyCodes.EXCLAM, width: 1 },
                { label: '2', shiftLabel: '@', keyval: 0x32, shiftKeyval: KeyCodes.AT, width: 1 },
                { label: '3', shiftLabel: '#', keyval: 0x33, shiftKeyval: KeyCodes.NUMBERSIGN, width: 1 },
                { label: '4', shiftLabel: '$', keyval: 0x34, shiftKeyval: KeyCodes.DOLLAR, width: 1 },
                { label: '5', shiftLabel: '%', keyval: 0x35, shiftKeyval: KeyCodes.PERCENT, width: 1 },
                { label: '6', shiftLabel: '^', keyval: 0x36, shiftKeyval: KeyCodes.ASCIICIRCUM, width: 1 },
                { label: '7', shiftLabel: '&', keyval: 0x37, shiftKeyval: KeyCodes.AMPERSAND, width: 1 },
                { label: '8', shiftLabel: '*', keyval: 0x38, shiftKeyval: KeyCodes.ASTERISK, width: 1 },
                { label: '9', shiftLabel: '(', keyval: 0x39, shiftKeyval: KeyCodes.PARENLEFT, width: 1 },
                { label: '0', shiftLabel: ')', keyval: 0x30, shiftKeyval: KeyCodes.PARENRIGHT, width: 1 },
                { label: '-', shiftLabel: '_', keyval: KeyCodes.MINUS, shiftKeyval: KeyCodes.UNDERSCORE, width: 1 },
                { label: '=', shiftLabel: '+', keyval: KeyCodes.EQUAL, shiftKeyval: KeyCodes.PLUS, width: 1 },
                { label: '⌫', type: SpecialKeyType.ACTION, action: 'backspace', keyval: KeyCodes.BACKSPACE, width: 1.5, cssClass: 'osk-key-action' }
            ],
            [
                { label: 'Tab', type: SpecialKeyType.ACTION, action: 'tab', keyval: KeyCodes.TAB, width: 1.4, cssClass: 'osk-key-action' },
                { label: 'q', shiftLabel: 'Q', keyval: 0x71, shiftKeyval: 0x51, width: 1 },
                { label: 'w', shiftLabel: 'W', keyval: 0x77, shiftKeyval: 0x57, width: 1 },
                { label: 'e', shiftLabel: 'E', keyval: 0x65, shiftKeyval: 0x45, width: 1, accents: ['é', 'è', 'ê', 'ë', '€', 'ē', 'ė'] },
                { label: 'r', shiftLabel: 'R', keyval: 0x72, shiftKeyval: 0x52, width: 1 },
                { label: 't', shiftLabel: 'T', keyval: 0x74, shiftKeyval: 0x54, width: 1 },
                { label: 'y', shiftLabel: 'Y', keyval: 0x79, shiftKeyval: 0x59, width: 1, accents: ['ý', 'ÿ'] },
                { label: 'u', shiftLabel: 'U', keyval: 0x75, shiftKeyval: 0x55, width: 1, accents: ['ú', 'ù', 'û', 'ü', 'ū'] },
                { label: 'i', shiftLabel: 'I', keyval: 0x69, shiftKeyval: 0x49, width: 1, accents: ['í', 'ì', 'î', 'ï', 'ī'] },
                { label: 'o', shiftLabel: 'O', keyval: 0x6f, shiftKeyval: 0x4f, width: 1, accents: ['ó', 'ò', 'ô', 'ö', 'õ', 'œ', 'ø'] },
                { label: 'p', shiftLabel: 'P', keyval: 0x70, shiftKeyval: 0x50, width: 1 },
                { label: '[', shiftLabel: '{', keyval: KeyCodes.BRACKETLEFT, shiftKeyval: KeyCodes.BRACELEFT, width: 1 },
                { label: ']', shiftLabel: '}', keyval: KeyCodes.BRACKETRIGHT, shiftKeyval: KeyCodes.BRACERIGHT, width: 1 },
                { label: '\\', shiftLabel: '|', keyval: KeyCodes.BACKSLASH, shiftKeyval: KeyCodes.BAR, width: 1.1 }
            ],
            [
                { label: 'Caps', type: SpecialKeyType.MODIFIER, modifier: 'caps', keyval: KeyCodes.CAPS_LOCK, width: 1.7, cssClass: 'osk-key-modifier' },
                { label: 'a', shiftLabel: 'A', keyval: 0x61, shiftKeyval: 0x41, width: 1, accents: ['á', 'à', 'â', 'ä', 'ã', 'å', 'æ', 'ā'] },
                { label: 's', shiftLabel: 'S', keyval: 0x73, shiftKeyval: 0x53, width: 1, accents: ['ß', 'ś', 'š'] },
                { label: 'd', shiftLabel: 'D', keyval: 0x64, shiftKeyval: 0x44, width: 1 },
                { label: 'f', shiftLabel: 'F', keyval: 0x66, shiftKeyval: 0x46, width: 1 },
                { label: 'g', shiftLabel: 'G', keyval: 0x67, shiftKeyval: 0x47, width: 1 },
                { label: 'h', shiftLabel: 'H', keyval: 0x68, shiftKeyval: 0x48, width: 1 },
                { label: 'j', shiftLabel: 'J', keyval: 0x6a, shiftKeyval: 0x4a, width: 1 },
                { label: 'k', shiftLabel: 'K', keyval: 0x6b, shiftKeyval: 0x4b, width: 1 },
                { label: 'l', shiftLabel: 'L', keyval: 0x6c, shiftKeyval: 0x4c, width: 1, accents: ['ł'] },
                { label: ';', shiftLabel: ':', keyval: KeyCodes.SEMICOLON, shiftKeyval: KeyCodes.COLON, width: 1 },
                { label: '\'', shiftLabel: '"', keyval: KeyCodes.APOSTROPHE, shiftKeyval: KeyCodes.QUOTEDBL, width: 1 },
                { label: 'Enter ⏎', type: SpecialKeyType.ACTION, action: 'return', keyval: KeyCodes.RETURN, width: 2.1, cssClass: 'osk-key-enter' }
            ],
            [
                { label: '⇧ Shift', type: SpecialKeyType.MODIFIER, modifier: 'shift', keyval: KeyCodes.SHIFT_L, width: 2.2, cssClass: 'osk-key-modifier' },
                { label: 'z', shiftLabel: 'Z', keyval: 0x7a, shiftKeyval: 0x5a, width: 1, accents: ['ź', 'ż', 'ž'] },
                { label: 'x', shiftLabel: 'X', keyval: 0x78, shiftKeyval: 0x58, width: 1 },
                { label: 'c', shiftLabel: 'C', keyval: 0x63, shiftKeyval: 0x43, width: 1, accents: ['ç', 'ć', 'č'] },
                { label: 'v', shiftLabel: 'V', keyval: 0x76, shiftKeyval: 0x56, width: 1 },
                { label: 'b', shiftLabel: 'B', keyval: 0x62, shiftKeyval: 0x42, width: 1 },
                { label: 'n', shiftLabel: 'N', keyval: 0x6e, shiftKeyval: 0x4e, width: 1, accents: ['ñ', 'ń'] },
                { label: 'm', shiftLabel: 'M', keyval: 0x6d, shiftKeyval: 0x4d, width: 1 },
                { label: ',', shiftLabel: '<', keyval: KeyCodes.COMMA, shiftKeyval: KeyCodes.LESS, width: 1 },
                { label: '.', shiftLabel: '>', keyval: KeyCodes.PERIOD, shiftKeyval: KeyCodes.GREATER, width: 1 },
                { label: '/', shiftLabel: '?', keyval: KeyCodes.SLASH, shiftKeyval: KeyCodes.QUESTION, width: 1 },
                { label: '▲', type: SpecialKeyType.ACTION, action: 'up', keyval: KeyCodes.UP, width: 1.0, cssClass: 'osk-key-nav' },
                { label: 'Del', type: SpecialKeyType.ACTION, action: 'delete', keyval: KeyCodes.DELETE, width: 1.4, cssClass: 'osk-key-action' }
            ],
            [
                { label: 'Fn', type: SpecialKeyType.SWITCH_LAYOUT, targetLayout: LayoutTypes.FUNCTION, width: 1.3, cssClass: 'osk-key-layout-switch' },
                { label: 'Ctrl', type: SpecialKeyType.MODIFIER, modifier: 'ctrl', keyval: KeyCodes.CONTROL_L, width: 1.5, cssClass: 'osk-key-modifier' },
                { label: 'Super', type: SpecialKeyType.ACTION, action: 'super', keyval: KeyCodes.SUPER_L, width: 1.4, cssClass: 'osk-key-modifier' },
                { label: 'Alt', type: SpecialKeyType.MODIFIER, modifier: 'alt', keyval: KeyCodes.ALT_L, width: 1.5, cssClass: 'osk-key-modifier' },
                { label: 'Space', keyval: KeyCodes.SPACE, width: 7.5, cssClass: 'osk-key-space' },
                { label: '◀', type: SpecialKeyType.ACTION, action: 'left', keyval: KeyCodes.LEFT, width: 1.0, cssClass: 'osk-key-nav' },
                { label: '▼', type: SpecialKeyType.ACTION, action: 'down', keyval: KeyCodes.DOWN, width: 1.0, cssClass: 'osk-key-nav' },
                { label: '▶', type: SpecialKeyType.ACTION, action: 'right', keyval: KeyCodes.RIGHT, width: 1.0, cssClass: 'osk-key-nav' }
            ]
        ]
    },

    [LayoutTypes.QWERTZ]: {
        name: 'QWERTZ (DE/EU)',
        rows: [
            [
                { label: '^', shiftLabel: '°', keyval: KeyCodes.ASCIICIRCUM, width: 1 },
                { label: '1', shiftLabel: '!', keyval: 0x31, shiftKeyval: KeyCodes.EXCLAM, width: 1 },
                { label: '2', shiftLabel: '"', keyval: 0x32, shiftKeyval: KeyCodes.QUOTEDBL, width: 1 },
                { label: '3', shiftLabel: '§', keyval: 0x33, width: 1 },
                { label: '4', shiftLabel: '$', keyval: 0x34, shiftKeyval: KeyCodes.DOLLAR, width: 1 },
                { label: '5', shiftLabel: '%', keyval: 0x35, shiftKeyval: KeyCodes.PERCENT, width: 1 },
                { label: '6', shiftLabel: '&', keyval: 0x36, shiftKeyval: KeyCodes.AMPERSAND, width: 1 },
                { label: '7', shiftLabel: '/', keyval: 0x37, shiftKeyval: KeyCodes.SLASH, width: 1 },
                { label: '8', shiftLabel: '(', keyval: 0x38, shiftKeyval: KeyCodes.PARENLEFT, width: 1 },
                { label: '9', shiftLabel: ')', keyval: 0x39, shiftKeyval: KeyCodes.PARENRIGHT, width: 1 },
                { label: '0', shiftLabel: '=', keyval: 0x30, shiftKeyval: KeyCodes.EQUAL, width: 1 },
                { label: 'ß', shiftLabel: '?', keyval: 0xdf, shiftKeyval: KeyCodes.QUESTION, width: 1 },
                { label: '´', shiftLabel: '`', keyval: 0xb4, shiftKeyval: KeyCodes.GRAVE, width: 1 },
                { label: '⌫', type: SpecialKeyType.ACTION, action: 'backspace', keyval: KeyCodes.BACKSPACE, width: 1.5, cssClass: 'osk-key-action' }
            ],
            [
                { label: 'Tab', type: SpecialKeyType.ACTION, action: 'tab', keyval: KeyCodes.TAB, width: 1.4, cssClass: 'osk-key-action' },
                { label: 'q', shiftLabel: 'Q', keyval: 0x71, shiftKeyval: 0x51, width: 1 },
                { label: 'w', shiftLabel: 'W', keyval: 0x77, shiftKeyval: 0x57, width: 1 },
                { label: 'e', shiftLabel: 'E', keyval: 0x65, shiftKeyval: 0x45, width: 1 },
                { label: 'r', shiftLabel: 'R', keyval: 0x72, shiftKeyval: 0x52, width: 1 },
                { label: 't', shiftLabel: 'T', keyval: 0x74, shiftKeyval: 0x54, width: 1 },
                { label: 'z', shiftLabel: 'Z', keyval: 0x7a, shiftKeyval: 0x5a, width: 1 },
                { label: 'u', shiftLabel: 'U', keyval: 0x75, shiftKeyval: 0x55, width: 1 },
                { label: 'i', shiftLabel: 'I', keyval: 0x69, shiftKeyval: 0x49, width: 1 },
                { label: 'o', shiftLabel: 'O', keyval: 0x6f, shiftKeyval: 0x4f, width: 1 },
                { label: 'p', shiftLabel: 'P', keyval: 0x70, shiftKeyval: 0x50, width: 1 },
                { label: 'ü', shiftLabel: 'Ü', keyval: 0xfc, shiftKeyval: 0xdc, width: 1 },
                { label: '+', shiftLabel: '*', keyval: KeyCodes.PLUS, shiftKeyval: KeyCodes.ASTERISK, width: 1 },
                { label: '#', shiftLabel: '\'', keyval: KeyCodes.NUMBERSIGN, shiftKeyval: KeyCodes.APOSTROPHE, width: 1.1 }
            ],
            [
                { label: 'Caps', type: SpecialKeyType.MODIFIER, modifier: 'caps', keyval: KeyCodes.CAPS_LOCK, width: 1.7, cssClass: 'osk-key-modifier' },
                { label: 'a', shiftLabel: 'A', keyval: 0x61, shiftKeyval: 0x41, width: 1 },
                { label: 's', shiftLabel: 'S', keyval: 0x73, shiftKeyval: 0x53, width: 1 },
                { label: 'd', shiftLabel: 'D', keyval: 0x64, shiftKeyval: 0x44, width: 1 },
                { label: 'f', shiftLabel: 'F', keyval: 0x66, shiftKeyval: 0x46, width: 1 },
                { label: 'g', shiftLabel: 'G', keyval: 0x67, shiftKeyval: 0x47, width: 1 },
                { label: 'h', shiftLabel: 'H', keyval: 0x68, shiftKeyval: 0x48, width: 1 },
                { label: 'j', shiftLabel: 'J', keyval: 0x6a, shiftKeyval: 0x4a, width: 1 },
                { label: 'k', shiftLabel: 'K', keyval: 0x6b, shiftKeyval: 0x4b, width: 1 },
                { label: 'l', shiftLabel: 'L', keyval: 0x6c, shiftKeyval: 0x4c, width: 1 },
                { label: 'ö', shiftLabel: 'Ö', keyval: 0xf6, shiftKeyval: 0xd6, width: 1 },
                { label: 'ä', shiftLabel: 'Ä', keyval: 0xe4, shiftKeyval: 0xc4, width: 1 },
                { label: 'Enter ⏎', type: SpecialKeyType.ACTION, action: 'return', keyval: KeyCodes.RETURN, width: 2.1, cssClass: 'osk-key-enter' }
            ],
            [
                { label: '⇧ Shift', type: SpecialKeyType.MODIFIER, modifier: 'shift', keyval: KeyCodes.SHIFT_L, width: 2.2, cssClass: 'osk-key-modifier' },
                { label: 'y', shiftLabel: 'Y', keyval: 0x79, shiftKeyval: 0x59, width: 1 },
                { label: 'x', shiftLabel: 'X', keyval: 0x78, shiftKeyval: 0x58, width: 1 },
                { label: 'c', shiftLabel: 'C', keyval: 0x63, shiftKeyval: 0x43, width: 1 },
                { label: 'v', shiftLabel: 'V', keyval: 0x76, shiftKeyval: 0x56, width: 1 },
                { label: 'b', shiftLabel: 'B', keyval: 0x62, shiftKeyval: 0x42, width: 1 },
                { label: 'n', shiftLabel: 'N', keyval: 0x6e, shiftKeyval: 0x4e, width: 1 },
                { label: 'm', shiftLabel: 'M', keyval: 0x6d, shiftKeyval: 0x4d, width: 1 },
                { label: ',', shiftLabel: ';', keyval: KeyCodes.COMMA, shiftKeyval: KeyCodes.SEMICOLON, width: 1 },
                { label: '.', shiftLabel: ':', keyval: KeyCodes.PERIOD, shiftKeyval: KeyCodes.COLON, width: 1 },
                { label: '-', shiftLabel: '_', keyval: KeyCodes.MINUS, shiftKeyval: KeyCodes.UNDERSCORE, width: 1 },
                { label: '▲', type: SpecialKeyType.ACTION, action: 'up', keyval: KeyCodes.UP, width: 1.1, cssClass: 'osk-key-nav' },
                { label: 'Del', type: SpecialKeyType.ACTION, action: 'delete', keyval: KeyCodes.DELETE, width: 1.3, cssClass: 'osk-key-action' }
            ],
            [
                { label: '?123', type: SpecialKeyType.SWITCH_LAYOUT, targetLayout: LayoutTypes.SYMBOLS, width: 1.4, cssClass: 'osk-key-layout-switch' },
                { label: 'Fn', type: SpecialKeyType.SWITCH_LAYOUT, targetLayout: LayoutTypes.FUNCTION, width: 1.1, cssClass: 'osk-key-layout-switch' },
                { label: 'Ctrl', type: SpecialKeyType.MODIFIER, modifier: 'ctrl', keyval: KeyCodes.CONTROL_L, width: 1.2, cssClass: 'osk-key-modifier' },
                { label: 'Super', type: SpecialKeyType.MODIFIER, modifier: 'super', keyval: KeyCodes.SUPER_L, width: 1.2, cssClass: 'osk-key-modifier' },
                { label: 'Alt', type: SpecialKeyType.MODIFIER, modifier: 'alt', keyval: KeyCodes.ALT_L, width: 1.2, cssClass: 'osk-key-modifier' },
                { label: 'Space', keyval: KeyCodes.SPACE, width: 4.6, cssClass: 'osk-key-space' },
                { label: 'AltGr', type: SpecialKeyType.MODIFIER, modifier: 'altgr', keyval: KeyCodes.ISO_LEVEL3_SHIFT, width: 1.2, cssClass: 'osk-key-modifier' },
                { label: '😊', type: SpecialKeyType.SWITCH_LAYOUT, targetLayout: LayoutTypes.EMOJI, width: 1.1, cssClass: 'osk-key-layout-switch' },
                { label: '123#', type: SpecialKeyType.SWITCH_LAYOUT, targetLayout: LayoutTypes.NUMPAD, width: 1.2, cssClass: 'osk-key-layout-switch' },
                { label: '◀', type: SpecialKeyType.ACTION, action: 'left', keyval: KeyCodes.LEFT, width: 1, cssClass: 'osk-key-nav' },
                { label: '▼', type: SpecialKeyType.ACTION, action: 'down', keyval: KeyCodes.DOWN, width: 1, cssClass: 'osk-key-nav' },
                { label: '▶', type: SpecialKeyType.ACTION, action: 'right', keyval: KeyCodes.RIGHT, width: 1, cssClass: 'osk-key-nav' }
            ]
        ]
    },

    [LayoutTypes.AZERTY]: {
        name: 'AZERTY (FR)',
        rows: [
            [
                { label: '²', keyval: 0xb2, width: 1 },
                { label: '&', shiftLabel: '1', keyval: KeyCodes.AMPERSAND, shiftKeyval: 0x31, width: 1 },
                { label: 'é', shiftLabel: '2', keyval: 0xe9, shiftKeyval: 0x32, width: 1 },
                { label: '"', shiftLabel: '3', keyval: KeyCodes.QUOTEDBL, shiftKeyval: 0x33, width: 1 },
                { label: '\'', shiftLabel: '4', keyval: KeyCodes.APOSTROPHE, shiftKeyval: 0x34, width: 1 },
                { label: '(', shiftLabel: '5', keyval: KeyCodes.PARENLEFT, shiftKeyval: 0x35, width: 1 },
                { label: '-', shiftLabel: '6', keyval: KeyCodes.MINUS, shiftKeyval: 0x36, width: 1 },
                { label: 'è', shiftLabel: '7', keyval: 0xe8, shiftKeyval: 0x37, width: 1 },
                { label: '_', shiftLabel: '8', keyval: KeyCodes.UNDERSCORE, shiftKeyval: 0x38, width: 1 },
                { label: 'ç', shiftLabel: '9', keyval: 0xe7, shiftKeyval: 0x39, width: 1 },
                { label: 'à', shiftLabel: '0', keyval: 0xe0, shiftKeyval: 0x30, width: 1 },
                { label: ')', shiftLabel: '°', keyval: KeyCodes.PARENRIGHT, width: 1 },
                { label: '=', shiftLabel: '+', keyval: KeyCodes.EQUAL, shiftKeyval: KeyCodes.PLUS, width: 1 },
                { label: '⌫', type: SpecialKeyType.ACTION, action: 'backspace', keyval: KeyCodes.BACKSPACE, width: 1.5, cssClass: 'osk-key-action' }
            ],
            [
                { label: 'Tab', type: SpecialKeyType.ACTION, action: 'tab', keyval: KeyCodes.TAB, width: 1.4, cssClass: 'osk-key-action' },
                { label: 'a', shiftLabel: 'A', keyval: 0x61, shiftKeyval: 0x41, width: 1 },
                { label: 'z', shiftLabel: 'Z', keyval: 0x7a, shiftKeyval: 0x5a, width: 1 },
                { label: 'e', shiftLabel: 'E', keyval: 0x65, shiftKeyval: 0x45, width: 1 },
                { label: 'r', shiftLabel: 'R', keyval: 0x72, shiftKeyval: 0x52, width: 1 },
                { label: 't', shiftLabel: 'T', keyval: 0x74, shiftKeyval: 0x54, width: 1 },
                { label: 'y', shiftLabel: 'Y', keyval: 0x79, shiftKeyval: 0x59, width: 1 },
                { label: 'u', shiftLabel: 'U', keyval: 0x75, shiftKeyval: 0x55, width: 1 },
                { label: 'i', shiftLabel: 'I', keyval: 0x69, shiftKeyval: 0x49, width: 1 },
                { label: 'o', shiftLabel: 'O', keyval: 0x6f, shiftKeyval: 0x4f, width: 1 },
                { label: 'p', shiftLabel: 'P', keyval: 0x70, shiftKeyval: 0x50, width: 1 },
                { label: '^', shiftLabel: '¨', keyval: KeyCodes.ASCIICIRCUM, width: 1 },
                { label: '$', shiftLabel: '£', keyval: KeyCodes.DOLLAR, width: 1 },
                { label: '*', shiftLabel: 'µ', keyval: KeyCodes.ASTERISK, width: 1.1 }
            ],
            [
                { label: 'Caps', type: SpecialKeyType.MODIFIER, modifier: 'caps', keyval: KeyCodes.CAPS_LOCK, width: 1.7, cssClass: 'osk-key-modifier' },
                { label: 'q', shiftLabel: 'Q', keyval: 0x71, shiftKeyval: 0x51, width: 1 },
                { label: 's', shiftLabel: 'S', keyval: 0x73, shiftKeyval: 0x53, width: 1 },
                { label: 'd', shiftLabel: 'D', keyval: 0x64, shiftKeyval: 0x44, width: 1 },
                { label: 'f', shiftLabel: 'F', keyval: 0x66, shiftKeyval: 0x46, width: 1 },
                { label: 'g', shiftLabel: 'G', keyval: 0x67, shiftKeyval: 0x47, width: 1 },
                { label: 'h', shiftLabel: 'H', keyval: 0x68, shiftKeyval: 0x48, width: 1 },
                { label: 'j', shiftLabel: 'J', keyval: 0x6a, shiftKeyval: 0x4a, width: 1 },
                { label: 'k', shiftLabel: 'K', keyval: 0x6b, shiftKeyval: 0x4b, width: 1 },
                { label: 'l', shiftLabel: 'L', keyval: 0x6c, shiftKeyval: 0x4c, width: 1 },
                { label: 'm', shiftLabel: 'M', keyval: 0x6d, shiftKeyval: 0x4d, width: 1 },
                { label: 'ù', shiftLabel: '%', keyval: 0xf9, shiftKeyval: KeyCodes.PERCENT, width: 1 },
                { label: 'Enter ⏎', type: SpecialKeyType.ACTION, action: 'return', keyval: KeyCodes.RETURN, width: 2.1, cssClass: 'osk-key-enter' }
            ],
            [
                { label: '⇧ Shift', type: SpecialKeyType.MODIFIER, modifier: 'shift', keyval: KeyCodes.SHIFT_L, width: 2.2, cssClass: 'osk-key-modifier' },
                { label: 'w', shiftLabel: 'W', keyval: 0x77, shiftKeyval: 0x57, width: 1 },
                { label: 'x', shiftLabel: 'X', keyval: 0x78, shiftKeyval: 0x58, width: 1 },
                { label: 'c', shiftLabel: 'C', keyval: 0x63, shiftKeyval: 0x43, width: 1 },
                { label: 'v', shiftLabel: 'V', keyval: 0x76, shiftKeyval: 0x56, width: 1 },
                { label: 'b', shiftLabel: 'B', keyval: 0x62, shiftKeyval: 0x42, width: 1 },
                { label: 'n', shiftLabel: 'N', keyval: 0x6e, shiftKeyval: 0x4e, width: 1 },
                { label: ',', shiftLabel: '?', keyval: KeyCodes.COMMA, shiftKeyval: KeyCodes.QUESTION, width: 1 },
                { label: ';', shiftLabel: '.', keyval: KeyCodes.SEMICOLON, shiftKeyval: KeyCodes.PERIOD, width: 1 },
                { label: ':', shiftLabel: '/', keyval: KeyCodes.COLON, shiftKeyval: KeyCodes.SLASH, width: 1 },
                { label: '!', shiftLabel: '§', keyval: KeyCodes.EXCLAM, width: 1 },
                { label: '▲', type: SpecialKeyType.ACTION, action: 'up', keyval: KeyCodes.UP, width: 1.1, cssClass: 'osk-key-nav' },
                { label: 'Del', type: SpecialKeyType.ACTION, action: 'delete', keyval: KeyCodes.DELETE, width: 1.3, cssClass: 'osk-key-action' }
            ],
            [
                { label: '?123', type: SpecialKeyType.SWITCH_LAYOUT, targetLayout: LayoutTypes.SYMBOLS, width: 1.4, cssClass: 'osk-key-layout-switch' },
                { label: 'Fn', type: SpecialKeyType.SWITCH_LAYOUT, targetLayout: LayoutTypes.FUNCTION, width: 1.1, cssClass: 'osk-key-layout-switch' },
                { label: 'Ctrl', type: SpecialKeyType.MODIFIER, modifier: 'ctrl', keyval: KeyCodes.CONTROL_L, width: 1.2, cssClass: 'osk-key-modifier' },
                { label: 'Super', type: SpecialKeyType.MODIFIER, modifier: 'super', keyval: KeyCodes.SUPER_L, width: 1.2, cssClass: 'osk-key-modifier' },
                { label: 'Alt', type: SpecialKeyType.MODIFIER, modifier: 'alt', keyval: KeyCodes.ALT_L, width: 1.2, cssClass: 'osk-key-modifier' },
                { label: 'Space', keyval: KeyCodes.SPACE, width: 4.6, cssClass: 'osk-key-space' },
                { label: 'AltGr', type: SpecialKeyType.MODIFIER, modifier: 'altgr', keyval: KeyCodes.ISO_LEVEL3_SHIFT, width: 1.2, cssClass: 'osk-key-modifier' },
                { label: '😊', type: SpecialKeyType.SWITCH_LAYOUT, targetLayout: LayoutTypes.EMOJI, width: 1.1, cssClass: 'osk-key-layout-switch' },
                { label: '123#', type: SpecialKeyType.SWITCH_LAYOUT, targetLayout: LayoutTypes.NUMPAD, width: 1.2, cssClass: 'osk-key-layout-switch' },
                { label: '◀', type: SpecialKeyType.ACTION, action: 'left', keyval: KeyCodes.LEFT, width: 1, cssClass: 'osk-key-nav' },
                { label: '▼', type: SpecialKeyType.ACTION, action: 'down', keyval: KeyCodes.DOWN, width: 1, cssClass: 'osk-key-nav' },
                { label: '▶', type: SpecialKeyType.ACTION, action: 'right', keyval: KeyCodes.RIGHT, width: 1, cssClass: 'osk-key-nav' }
            ]
        ]
    },

    [LayoutTypes.DVORAK]: {
        name: 'Dvorak',
        rows: [
            [
                { label: '`', shiftLabel: '~', keyval: KeyCodes.GRAVE, shiftKeyval: KeyCodes.ASCIITILDE, width: 1 },
                { label: '1', shiftLabel: '!', keyval: 0x31, shiftKeyval: KeyCodes.EXCLAM, width: 1 },
                { label: '2', shiftLabel: '@', keyval: 0x32, shiftKeyval: KeyCodes.AT, width: 1 },
                { label: '3', shiftLabel: '#', keyval: 0x33, shiftKeyval: KeyCodes.NUMBERSIGN, width: 1 },
                { label: '4', shiftLabel: '$', keyval: 0x34, shiftKeyval: KeyCodes.DOLLAR, width: 1 },
                { label: '5', shiftLabel: '%', keyval: 0x35, shiftKeyval: KeyCodes.PERCENT, width: 1 },
                { label: '6', shiftLabel: '^', keyval: 0x36, shiftKeyval: KeyCodes.ASCIICIRCUM, width: 1 },
                { label: '7', shiftLabel: '&', keyval: 0x37, shiftKeyval: KeyCodes.AMPERSAND, width: 1 },
                { label: '8', shiftLabel: '*', keyval: 0x38, shiftKeyval: KeyCodes.ASTERISK, width: 1 },
                { label: '9', shiftLabel: '(', keyval: 0x39, shiftKeyval: KeyCodes.PARENLEFT, width: 1 },
                { label: '0', shiftLabel: ')', keyval: 0x30, shiftKeyval: KeyCodes.PARENRIGHT, width: 1 },
                { label: '[', shiftLabel: '{', keyval: KeyCodes.BRACKETLEFT, shiftKeyval: KeyCodes.BRACELEFT, width: 1 },
                { label: ']', shiftLabel: '}', keyval: KeyCodes.BRACKETRIGHT, shiftKeyval: KeyCodes.BRACERIGHT, width: 1 },
                { label: '⌫', type: SpecialKeyType.ACTION, action: 'backspace', keyval: KeyCodes.BACKSPACE, width: 1.5, cssClass: 'osk-key-action' }
            ],
            [
                { label: 'Tab', type: SpecialKeyType.ACTION, action: 'tab', keyval: KeyCodes.TAB, width: 1.4, cssClass: 'osk-key-action' },
                { label: '\'', shiftLabel: '"', keyval: KeyCodes.APOSTROPHE, shiftKeyval: KeyCodes.QUOTEDBL, width: 1 },
                { label: ',', shiftLabel: '<', keyval: KeyCodes.COMMA, shiftKeyval: KeyCodes.LESS, width: 1 },
                { label: '.', shiftLabel: '>', keyval: KeyCodes.PERIOD, shiftKeyval: KeyCodes.GREATER, width: 1 },
                { label: 'p', shiftLabel: 'P', keyval: 0x70, shiftKeyval: 0x50, width: 1 },
                { label: 'y', shiftLabel: 'Y', keyval: 0x79, shiftKeyval: 0x59, width: 1 },
                { label: 'f', shiftLabel: 'F', keyval: 0x66, shiftKeyval: 0x46, width: 1 },
                { label: 'g', shiftLabel: 'G', keyval: 0x67, shiftKeyval: 0x47, width: 1 },
                { label: 'c', shiftLabel: 'C', keyval: 0x63, shiftKeyval: 0x43, width: 1 },
                { label: 'r', shiftLabel: 'R', keyval: 0x72, shiftKeyval: 0x52, width: 1 },
                { label: 'l', shiftLabel: 'L', keyval: 0x6c, shiftKeyval: 0x4c, width: 1 },
                { label: '/', shiftLabel: '?', keyval: KeyCodes.SLASH, shiftKeyval: KeyCodes.QUESTION, width: 1 },
                { label: '=', shiftLabel: '+', keyval: KeyCodes.EQUAL, shiftKeyval: KeyCodes.PLUS, width: 1 },
                { label: '\\', shiftLabel: '|', keyval: KeyCodes.BACKSLASH, shiftKeyval: KeyCodes.BAR, width: 1.1 }
            ],
            [
                { label: 'Caps', type: SpecialKeyType.MODIFIER, modifier: 'caps', keyval: KeyCodes.CAPS_LOCK, width: 1.7, cssClass: 'osk-key-modifier' },
                { label: 'a', shiftLabel: 'A', keyval: 0x61, shiftKeyval: 0x41, width: 1 },
                { label: 'o', shiftLabel: 'O', keyval: 0x6f, shiftKeyval: 0x4f, width: 1 },
                { label: 'e', shiftLabel: 'E', keyval: 0x65, shiftKeyval: 0x45, width: 1 },
                { label: 'u', shiftLabel: 'U', keyval: 0x75, shiftKeyval: 0x55, width: 1 },
                { label: 'i', shiftLabel: 'I', keyval: 0x69, shiftKeyval: 0x49, width: 1 },
                { label: 'd', shiftLabel: 'D', keyval: 0x64, shiftKeyval: 0x44, width: 1 },
                { label: 'h', shiftLabel: 'H', keyval: 0x68, shiftKeyval: 0x48, width: 1 },
                { label: 't', shiftLabel: 'T', keyval: 0x74, shiftKeyval: 0x54, width: 1 },
                { label: 'n', shiftLabel: 'N', keyval: 0x6e, shiftKeyval: 0x4e, width: 1 },
                { label: 's', shiftLabel: 'S', keyval: 0x73, shiftKeyval: 0x53, width: 1 },
                { label: '-', shiftLabel: '_', keyval: KeyCodes.MINUS, shiftKeyval: KeyCodes.UNDERSCORE, width: 1 },
                { label: 'Enter ⏎', type: SpecialKeyType.ACTION, action: 'return', keyval: KeyCodes.RETURN, width: 2.1, cssClass: 'osk-key-enter' }
            ],
            [
                { label: '⇧ Shift', type: SpecialKeyType.MODIFIER, modifier: 'shift', keyval: KeyCodes.SHIFT_L, width: 2.2, cssClass: 'osk-key-modifier' },
                { label: ';', shiftLabel: ':', keyval: KeyCodes.SEMICOLON, shiftKeyval: KeyCodes.COLON, width: 1 },
                { label: 'q', shiftLabel: 'Q', keyval: 0x71, shiftKeyval: 0x51, width: 1 },
                { label: 'j', shiftLabel: 'J', keyval: 0x6a, shiftKeyval: 0x4a, width: 1 },
                { label: 'k', shiftLabel: 'K', keyval: 0x6b, shiftKeyval: 0x4b, width: 1 },
                { label: 'x', shiftLabel: 'X', keyval: 0x78, shiftKeyval: 0x58, width: 1 },
                { label: 'b', shiftLabel: 'B', keyval: 0x62, shiftKeyval: 0x42, width: 1 },
                { label: 'm', shiftLabel: 'M', keyval: 0x6d, shiftKeyval: 0x4d, width: 1 },
                { label: 'w', shiftLabel: 'W', keyval: 0x77, shiftKeyval: 0x57, width: 1 },
                { label: 'v', shiftLabel: 'V', keyval: 0x76, shiftKeyval: 0x56, width: 1 },
                { label: 'z', shiftLabel: 'Z', keyval: 0x7a, shiftKeyval: 0x5a, width: 1 },
                { label: '▲', type: SpecialKeyType.ACTION, action: 'up', keyval: KeyCodes.UP, width: 1.1, cssClass: 'osk-key-nav' },
                { label: 'Del', type: SpecialKeyType.ACTION, action: 'delete', keyval: KeyCodes.DELETE, width: 1.3, cssClass: 'osk-key-action' }
            ],
            [
                { label: '?123', type: SpecialKeyType.SWITCH_LAYOUT, targetLayout: LayoutTypes.SYMBOLS, width: 1.4, cssClass: 'osk-key-layout-switch' },
                { label: 'Fn', type: SpecialKeyType.SWITCH_LAYOUT, targetLayout: LayoutTypes.FUNCTION, width: 1.1, cssClass: 'osk-key-layout-switch' },
                { label: 'Ctrl', type: SpecialKeyType.MODIFIER, modifier: 'ctrl', keyval: KeyCodes.CONTROL_L, width: 1.2, cssClass: 'osk-key-modifier' },
                { label: 'Super', type: SpecialKeyType.MODIFIER, modifier: 'super', keyval: KeyCodes.SUPER_L, width: 1.2, cssClass: 'osk-key-modifier' },
                { label: 'Alt', type: SpecialKeyType.MODIFIER, modifier: 'alt', keyval: KeyCodes.ALT_L, width: 1.2, cssClass: 'osk-key-modifier' },
                { label: 'Space', keyval: KeyCodes.SPACE, width: 4.6, cssClass: 'osk-key-space' },
                { label: 'AltGr', type: SpecialKeyType.MODIFIER, modifier: 'altgr', keyval: KeyCodes.ISO_LEVEL3_SHIFT, width: 1.2, cssClass: 'osk-key-modifier' },
                { label: '😊', type: SpecialKeyType.SWITCH_LAYOUT, targetLayout: LayoutTypes.EMOJI, width: 1.1, cssClass: 'osk-key-layout-switch' },
                { label: '123#', type: SpecialKeyType.SWITCH_LAYOUT, targetLayout: LayoutTypes.NUMPAD, width: 1.2, cssClass: 'osk-key-layout-switch' },
                { label: '◀', type: SpecialKeyType.ACTION, action: 'left', keyval: KeyCodes.LEFT, width: 1, cssClass: 'osk-key-nav' },
                { label: '▼', type: SpecialKeyType.ACTION, action: 'down', keyval: KeyCodes.DOWN, width: 1, cssClass: 'osk-key-nav' },
                { label: '▶', type: SpecialKeyType.ACTION, action: 'right', keyval: KeyCodes.RIGHT, width: 1, cssClass: 'osk-key-nav' }
            ]
        ]
    },

    [LayoutTypes.NUMPAD]: {
        name: 'Numeric Keypad',
        rows: [
            [
                { label: 'Esc', type: SpecialKeyType.ACTION, action: 'escape', keyval: KeyCodes.ESCAPE, width: 1, cssClass: 'osk-key-action' },
                { label: 'Clear', type: SpecialKeyType.ACTION, action: 'backspace', keyval: KeyCodes.BACKSPACE, width: 1, cssClass: 'osk-key-action' },
                { label: '(', keyval: KeyCodes.PARENLEFT, width: 1 },
                { label: ')', keyval: KeyCodes.PARENRIGHT, width: 1 },
                { label: 'NumLock', type: SpecialKeyType.MODIFIER, modifier: 'numlock', width: 1.2, cssClass: 'osk-key-modifier' },
                { label: '/', keyval: KeyCodes.KP_DIVIDE, width: 1 },
                { label: '*', keyval: KeyCodes.KP_MULTIPLY, width: 1 },
                { label: '-', keyval: KeyCodes.KP_SUBTRACT, width: 1 },
                { label: '⌫', type: SpecialKeyType.ACTION, action: 'backspace', keyval: KeyCodes.BACKSPACE, width: 1.4, cssClass: 'osk-key-action' }
            ],
            [
                { label: 'Home', type: SpecialKeyType.ACTION, action: 'home', keyval: KeyCodes.HOME, width: 1, cssClass: 'osk-key-nav' },
                { label: 'PgUp', type: SpecialKeyType.ACTION, action: 'page_up', keyval: KeyCodes.PAGE_UP, width: 1, cssClass: 'osk-key-nav' },
                { label: '%', keyval: KeyCodes.PERCENT, width: 1 },
                { label: '^', keyval: KeyCodes.ASCIICIRCUM, width: 1 },
                { label: '7', keyval: KeyCodes.KP_7, width: 1.2, cssClass: 'osk-key-numpad-digit' },
                { label: '8', keyval: KeyCodes.KP_8, width: 1.2, cssClass: 'osk-key-numpad-digit' },
                { label: '9', keyval: KeyCodes.KP_9, width: 1.2, cssClass: 'osk-key-numpad-digit' },
                { label: '+', keyval: KeyCodes.KP_ADD, width: 1 },
                { label: 'Tab', type: SpecialKeyType.ACTION, action: 'tab', keyval: KeyCodes.TAB, width: 1.4, cssClass: 'osk-key-action' }
            ],
            [
                { label: 'End', type: SpecialKeyType.ACTION, action: 'end', keyval: KeyCodes.END, width: 1, cssClass: 'osk-key-nav' },
                { label: 'PgDn', type: SpecialKeyType.ACTION, action: 'page_down', keyval: KeyCodes.PAGE_DOWN, width: 1, cssClass: 'osk-key-nav' },
                { label: '$', keyval: KeyCodes.DOLLAR, width: 1 },
                { label: '€', text: '€', width: 1 },
                { label: '4', keyval: KeyCodes.KP_4, width: 1.2, cssClass: 'osk-key-numpad-digit' },
                { label: '5', keyval: KeyCodes.KP_5, width: 1.2, cssClass: 'osk-key-numpad-digit' },
                { label: '6', keyval: KeyCodes.KP_6, width: 1.2, cssClass: 'osk-key-numpad-digit' },
                { label: '=', keyval: KeyCodes.KP_EQUAL, width: 1 },
                { label: 'Enter ⏎', type: SpecialKeyType.ACTION, action: 'return', keyval: KeyCodes.KP_ENTER, width: 1.4, cssClass: 'osk-key-enter' }
            ],
            [
                { label: 'Ins', type: SpecialKeyType.ACTION, action: 'insert', keyval: KeyCodes.KP_INSERT, width: 1, cssClass: 'osk-key-nav' },
                { label: 'Del', type: SpecialKeyType.ACTION, action: 'delete', keyval: KeyCodes.DELETE, width: 1, cssClass: 'osk-key-action' },
                { label: '£', text: '£', width: 1 },
                { label: '¥', text: '¥', width: 1 },
                { label: '1', keyval: KeyCodes.KP_1, width: 1.2, cssClass: 'osk-key-numpad-digit' },
                { label: '2', keyval: KeyCodes.KP_2, width: 1.2, cssClass: 'osk-key-numpad-digit' },
                { label: '3', keyval: KeyCodes.KP_3, width: 1.2, cssClass: 'osk-key-numpad-digit' },
                { label: '▲', type: SpecialKeyType.ACTION, action: 'up', keyval: KeyCodes.UP, width: 1, cssClass: 'osk-key-nav' },
                { label: 'ABC', type: SpecialKeyType.SWITCH_LAYOUT, targetLayout: LayoutTypes.QWERTY, width: 1.4, cssClass: 'osk-key-layout-switch' }
            ],
            [
                { label: 'ABC', type: SpecialKeyType.SWITCH_LAYOUT, targetLayout: LayoutTypes.QWERTY, width: 1.3, cssClass: 'osk-key-layout-switch' },
                { label: 'Fn', type: SpecialKeyType.SWITCH_LAYOUT, targetLayout: LayoutTypes.FUNCTION, width: 1.1, cssClass: 'osk-key-layout-switch' },
                { label: '0', keyval: KeyCodes.KP_0, width: 2.6, cssClass: 'osk-key-numpad-digit' },
                { label: '.', keyval: KeyCodes.KP_DECIMAL, width: 1.2, cssClass: 'osk-key-numpad-digit' },
                { label: ',', keyval: KeyCodes.KP_SEPARATOR, width: 1.2 },
                { label: 'Space', keyval: KeyCodes.SPACE, width: 2.2, cssClass: 'osk-key-space' },
                { label: '◀', type: SpecialKeyType.ACTION, action: 'left', keyval: KeyCodes.LEFT, width: 1, cssClass: 'osk-key-nav' },
                { label: '▼', type: SpecialKeyType.ACTION, action: 'down', keyval: KeyCodes.DOWN, width: 1, cssClass: 'osk-key-nav' },
                { label: '▶', type: SpecialKeyType.ACTION, action: 'right', keyval: KeyCodes.RIGHT, width: 1, cssClass: 'osk-key-nav' }
            ]
        ]
    },

    [LayoutTypes.SYMBOLS]: {
        name: 'Symbols (1/2)',
        rows: [
            [
                { label: '1', keyval: 0x31, width: 1 },
                { label: '2', keyval: 0x32, width: 1 },
                { label: '3', keyval: 0x33, width: 1 },
                { label: '4', keyval: 0x34, width: 1 },
                { label: '5', keyval: 0x35, width: 1 },
                { label: '6', keyval: 0x36, width: 1 },
                { label: '7', keyval: 0x37, width: 1 },
                { label: '8', keyval: 0x38, width: 1 },
                { label: '9', keyval: 0x39, width: 1 },
                { label: '0', keyval: 0x30, width: 1 },
                { label: '⌫', type: SpecialKeyType.ACTION, action: 'backspace', keyval: KeyCodes.BACKSPACE, width: 1.5, cssClass: 'osk-key-action' }
            ],
            [
                { label: '@', keyval: KeyCodes.AT, width: 1 },
                { label: '#', keyval: KeyCodes.NUMBERSIGN, width: 1 },
                { label: '$', keyval: KeyCodes.DOLLAR, width: 1 },
                { label: '_', keyval: KeyCodes.UNDERSCORE, width: 1 },
                { label: '&', keyval: KeyCodes.AMPERSAND, width: 1 },
                { label: '-', keyval: KeyCodes.MINUS, width: 1 },
                { label: '+', keyval: KeyCodes.PLUS, width: 1 },
                { label: '(', keyval: KeyCodes.PARENLEFT, width: 1 },
                { label: ')', keyval: KeyCodes.PARENRIGHT, width: 1 },
                { label: '/', keyval: KeyCodes.SLASH, width: 1 },
                { label: 'Enter ⏎', type: SpecialKeyType.ACTION, action: 'return', keyval: KeyCodes.RETURN, width: 1.8, cssClass: 'osk-key-enter' }
            ],
            [
                { label: '2/2 ❯', type: SpecialKeyType.SWITCH_LAYOUT, targetLayout: LayoutTypes.SYMBOLS_MORE, width: 1.5, cssClass: 'osk-key-layout-switch' },
                { label: '%', keyval: KeyCodes.PERCENT, width: 1 },
                { label: '*', keyval: KeyCodes.ASTERISK, width: 1 },
                { label: '"', keyval: KeyCodes.QUOTEDBL, width: 1 },
                { label: '\'', keyval: KeyCodes.APOSTROPHE, width: 1 },
                { label: ':', keyval: KeyCodes.COLON, width: 1 },
                { label: ';', keyval: KeyCodes.SEMICOLON, width: 1 },
                { label: '!', keyval: KeyCodes.EXCLAM, width: 1 },
                { label: '?', keyval: KeyCodes.QUESTION, width: 1 },
                { label: '▲', type: SpecialKeyType.ACTION, action: 'up', keyval: KeyCodes.UP, width: 1, cssClass: 'osk-key-nav' },
                { label: 'Del', type: SpecialKeyType.ACTION, action: 'delete', keyval: KeyCodes.DELETE, width: 1.2, cssClass: 'osk-key-action' }
            ],
            [
                { label: 'ABC', type: SpecialKeyType.SWITCH_LAYOUT, targetLayout: LayoutTypes.QWERTY, width: 1.6, cssClass: 'osk-key-layout-switch' },
                { label: ',', keyval: KeyCodes.COMMA, width: 1.1 },
                { label: 'Space', keyval: KeyCodes.SPACE, width: 4.8, cssClass: 'osk-key-space' },
                { label: '.', keyval: KeyCodes.PERIOD, width: 1.1 },
                { label: '◀', type: SpecialKeyType.ACTION, action: 'left', keyval: KeyCodes.LEFT, width: 1, cssClass: 'osk-key-nav' },
                { label: '▼', type: SpecialKeyType.ACTION, action: 'down', keyval: KeyCodes.DOWN, width: 1, cssClass: 'osk-key-nav' },
                { label: '▶', type: SpecialKeyType.ACTION, action: 'right', keyval: KeyCodes.RIGHT, width: 1, cssClass: 'osk-key-nav' }
            ]
        ]
    },

    [LayoutTypes.SYMBOLS_MORE]: {
        name: 'Symbols (2/2)',
        rows: [
            [
                { label: '~', keyval: KeyCodes.ASCIITILDE, width: 1 },
                { label: '`', keyval: KeyCodes.GRAVE, width: 1 },
                { label: '|', keyval: KeyCodes.BAR, width: 1 },
                { label: '•', text: '•', width: 1 },
                { label: '√', text: '√', width: 1 },
                { label: 'π', text: 'π', width: 1 },
                { label: '÷', text: '÷', width: 1 },
                { label: '×', text: '×', width: 1 },
                { label: '§', text: '§', width: 1 },
                { label: 'Δ', text: 'Δ', width: 1 },
                { label: '⌫', type: SpecialKeyType.ACTION, action: 'backspace', keyval: KeyCodes.BACKSPACE, width: 1.5, cssClass: 'osk-key-action' }
            ],
            [
                { label: '€', text: '€', width: 1 },
                { label: '£', text: '£', width: 1 },
                { label: '¥', text: '¥', width: 1 },
                { label: '¢', text: '¢', width: 1 },
                { label: '^', keyval: KeyCodes.ASCIICIRCUM, width: 1 },
                { label: '°', text: '°', width: 1 },
                { label: '=', keyval: KeyCodes.EQUAL, width: 1 },
                { label: '{', keyval: KeyCodes.BRACELEFT, width: 1 },
                { label: '}', keyval: KeyCodes.BRACERIGHT, width: 1 },
                { label: '\\', keyval: KeyCodes.BACKSLASH, width: 1 },
                { label: 'Enter ⏎', type: SpecialKeyType.ACTION, action: 'return', keyval: KeyCodes.RETURN, width: 1.8, cssClass: 'osk-key-enter' }
            ],
            [
                { label: '❮ 1/2', type: SpecialKeyType.SWITCH_LAYOUT, targetLayout: LayoutTypes.SYMBOLS, width: 1.5, cssClass: 'osk-key-layout-switch' },
                { label: '[', keyval: KeyCodes.BRACKETLEFT, width: 1 },
                { label: ']', keyval: KeyCodes.BRACKETRIGHT, width: 1 },
                { label: '<', keyval: KeyCodes.LESS, width: 1 },
                { label: '>', keyval: KeyCodes.GREATER, width: 1 },
                { label: '«', text: '«', width: 1 },
                { label: '»', text: '»', width: 1 },
                { label: '©', text: '©', width: 1 },
                { label: '®', text: '®', width: 1 },
                { label: '™', text: '™', width: 1 },
                { label: 'Del', type: SpecialKeyType.ACTION, action: 'delete', keyval: KeyCodes.DELETE, width: 1.2, cssClass: 'osk-key-action' }
            ],
            [
                { label: 'ABC', type: SpecialKeyType.SWITCH_LAYOUT, targetLayout: LayoutTypes.QWERTY, width: 1.6, cssClass: 'osk-key-layout-switch' },
                { label: '…', text: '…', width: 1.1 },
                { label: 'Space', keyval: KeyCodes.SPACE, width: 4.8, cssClass: 'osk-key-space' },
                { label: '¿', text: '¿', width: 1.1 },
                { label: '¡', text: '¡', width: 1.1 },
                { label: '123#', type: SpecialKeyType.SWITCH_LAYOUT, targetLayout: LayoutTypes.NUMPAD, width: 1.4, cssClass: 'osk-key-layout-switch' }
            ]
        ]
    },

    [LayoutTypes.FUNCTION]: {
        name: 'Function & Navigation Keys',
        rows: [
            [
                { label: 'Esc', type: SpecialKeyType.ACTION, action: 'escape', keyval: KeyCodes.ESCAPE, width: 1.2, cssClass: 'osk-key-action' },
                { label: 'F1', keyval: KeyCodes.F1, width: 1 },
                { label: 'F2', keyval: KeyCodes.F2, width: 1 },
                { label: 'F3', keyval: KeyCodes.F3, width: 1 },
                { label: 'F4', keyval: KeyCodes.F4, width: 1 },
                { label: 'F5', keyval: KeyCodes.F5, width: 1 },
                { label: 'F6', keyval: KeyCodes.F6, width: 1 },
                { label: 'F7', keyval: KeyCodes.F7, width: 1 },
                { label: 'F8', keyval: KeyCodes.F8, width: 1 },
                { label: 'F9', keyval: KeyCodes.F9, width: 1 },
                { label: 'F10', keyval: KeyCodes.F10, width: 1 },
                { label: 'F11', keyval: KeyCodes.F11, width: 1 },
                { label: 'F12', keyval: KeyCodes.F12, width: 1 },
                { label: '⌫', type: SpecialKeyType.ACTION, action: 'backspace', keyval: KeyCodes.BACKSPACE, width: 1.3, cssClass: 'osk-key-action' }
            ],
            [
                { label: 'Tab', type: SpecialKeyType.ACTION, action: 'tab', keyval: KeyCodes.TAB, width: 1.4, cssClass: 'osk-key-action' },
                { label: 'PrtSc', text: '', keyval: KeyCodes.SYS_REQ, width: 1.2 },
                { label: 'Scroll', keyval: KeyCodes.SCROLL_LOCK, width: 1.2 },
                { label: 'Pause', keyval: KeyCodes.PAUSE, width: 1.2 },
                { label: 'Insert', keyval: KeyCodes.KP_INSERT, width: 1.3 },
                { label: 'Delete', type: SpecialKeyType.ACTION, action: 'delete', keyval: KeyCodes.DELETE, width: 1.3, cssClass: 'osk-key-action' },
                { label: 'Home', keyval: KeyCodes.HOME, width: 1.3, cssClass: 'osk-key-nav' },
                { label: 'End', keyval: KeyCodes.END, width: 1.3, cssClass: 'osk-key-nav' },
                { label: 'PgUp', keyval: KeyCodes.PAGE_UP, width: 1.3, cssClass: 'osk-key-nav' },
                { label: 'PgDn', keyval: KeyCodes.PAGE_DOWN, width: 1.3, cssClass: 'osk-key-nav' },
                { label: 'Enter ⏎', type: SpecialKeyType.ACTION, action: 'return', keyval: KeyCodes.RETURN, width: 1.8, cssClass: 'osk-key-enter' }
            ],
            [
                { label: 'Caps', type: SpecialKeyType.MODIFIER, modifier: 'caps', keyval: KeyCodes.CAPS_LOCK, width: 1.5, cssClass: 'osk-key-modifier' },
                { label: 'Shift', type: SpecialKeyType.MODIFIER, modifier: 'shift', keyval: KeyCodes.SHIFT_L, width: 1.6, cssClass: 'osk-key-modifier' },
                { label: 'Ctrl', type: SpecialKeyType.MODIFIER, modifier: 'ctrl', keyval: KeyCodes.CONTROL_L, width: 1.4, cssClass: 'osk-key-modifier' },
                { label: 'Super', type: SpecialKeyType.MODIFIER, modifier: 'super', keyval: KeyCodes.SUPER_L, width: 1.4, cssClass: 'osk-key-modifier' },
                { label: 'Alt', type: SpecialKeyType.MODIFIER, modifier: 'alt', keyval: KeyCodes.ALT_L, width: 1.4, cssClass: 'osk-key-modifier' },
                { label: 'Space', keyval: KeyCodes.SPACE, width: 3.5, cssClass: 'osk-key-space' },
                { label: 'AltGr', type: SpecialKeyType.MODIFIER, modifier: 'altgr', keyval: KeyCodes.ISO_LEVEL3_SHIFT, width: 1.4, cssClass: 'osk-key-modifier' },
                { label: '▲', type: SpecialKeyType.ACTION, action: 'up', keyval: KeyCodes.UP, width: 1.2, cssClass: 'osk-key-nav' },
                { label: 'Del', type: SpecialKeyType.ACTION, action: 'delete', keyval: KeyCodes.DELETE, width: 1.4, cssClass: 'osk-key-action' }
            ],
            [
                { label: 'ABC', type: SpecialKeyType.SWITCH_LAYOUT, targetLayout: LayoutTypes.QWERTY, width: 1.6, cssClass: 'osk-key-layout-switch' },
                { label: '?123', type: SpecialKeyType.SWITCH_LAYOUT, targetLayout: LayoutTypes.SYMBOLS, width: 1.4, cssClass: 'osk-key-layout-switch' },
                { label: '123#', type: SpecialKeyType.SWITCH_LAYOUT, targetLayout: LayoutTypes.NUMPAD, width: 1.4, cssClass: 'osk-key-layout-switch' },
                { label: 'Ctrl+A', type: SpecialKeyType.ACTION, combo: ['ctrl', 'a'], keyval: 0x61, width: 1.5 },
                { label: 'Ctrl+C', type: SpecialKeyType.ACTION, combo: ['ctrl', 'c'], keyval: 0x63, width: 1.5 },
                { label: 'Ctrl+V', type: SpecialKeyType.ACTION, combo: ['ctrl', 'v'], keyval: 0x76, width: 1.5 },
                { label: 'Ctrl+Z', type: SpecialKeyType.ACTION, combo: ['ctrl', 'z'], keyval: 0x7a, width: 1.5 },
                { label: '◀', type: SpecialKeyType.ACTION, action: 'left', keyval: KeyCodes.LEFT, width: 1.2, cssClass: 'osk-key-nav' },
                { label: '▼', type: SpecialKeyType.ACTION, action: 'down', keyval: KeyCodes.DOWN, width: 1.2, cssClass: 'osk-key-nav' },
                { label: '▶', type: SpecialKeyType.ACTION, action: 'right', keyval: KeyCodes.RIGHT, width: 1.2, cssClass: 'osk-key-nav' }
            ]
        ]
    },

    [LayoutTypes.EMOJI]: {
        name: 'Emoji Picker',
        rows: [
            [
                { label: '😀', text: '😀', width: 1 },
                { label: '😃', text: '😃', width: 1 },
                { label: '😄', text: '😄', width: 1 },
                { label: '😁', text: '😁', width: 1 },
                { label: '😆', text: '😆', width: 1 },
                { label: '😅', text: '😅', width: 1 },
                { label: '😂', text: '😂', width: 1 },
                { label: '🤣', text: '🤣', width: 1 },
                { label: '😊', text: '😊', width: 1 },
                { label: '😇', text: '😇', width: 1 },
                { label: '🙂', text: '🙂', width: 1 },
                { label: '⌫', type: SpecialKeyType.ACTION, action: 'backspace', keyval: KeyCodes.BACKSPACE, width: 1.5, cssClass: 'osk-key-action' }
            ],
            [
                { label: '😍', text: '😍', width: 1 },
                { label: '🥰', text: '🥰', width: 1 },
                { label: '😘', text: '😘', width: 1 },
                { label: '😋', text: '😋', width: 1 },
                { label: '😎', text: '😎', width: 1 },
                { label: '🤩', text: '🤩', width: 1 },
                { label: '🥳', text: '🥳', width: 1 },
                { label: '🤔', text: '🤔', width: 1 },
                { label: '🤫', text: '🤫', width: 1 },
                { label: '🤭', text: '🤭', width: 1 },
                { label: '😏', text: '😏', width: 1 },
                { label: 'Enter ⏎', type: SpecialKeyType.ACTION, action: 'return', keyval: KeyCodes.RETURN, width: 1.8, cssClass: 'osk-key-enter' }
            ],
            [
                { label: '👍', text: '👍', width: 1 },
                { label: '👎', text: '👎', width: 1 },
                { label: '👌', text: '👌', width: 1 },
                { label: '✌️', text: '✌️', width: 1 },
                { label: '🤞', text: '🤞', width: 1 },
                { label: '🤟', text: '🤟', width: 1 },
                { label: '🤙', text: '🤙', width: 1 },
                { label: '👏', text: '👏', width: 1 },
                { label: '🙌', text: '🙌', width: 1 },
                { label: '🤝', text: '🤝', width: 1 },
                { label: '🙏', text: '🙏', width: 1 },
                { label: '❤️', text: '❤️', width: 1 }
            ],
            [
                { label: 'ABC', type: SpecialKeyType.SWITCH_LAYOUT, targetLayout: LayoutTypes.QWERTY, width: 1.6, cssClass: 'osk-key-layout-switch' },
                { label: '🔥', text: '🔥', width: 1 },
                { label: '✨', text: '✨', width: 1 },
                { label: '🎉', text: '🎉', width: 1 },
                { label: 'Space', keyval: KeyCodes.SPACE, width: 3.5, cssClass: 'osk-key-space' },
                { label: '💡', text: '💡', width: 1 },
                { label: '🚀', text: '🚀', width: 1 },
                { label: '⭐', text: '⭐', width: 1 },
                { label: '?123', type: SpecialKeyType.SWITCH_LAYOUT, targetLayout: LayoutTypes.SYMBOLS, width: 1.4, cssClass: 'osk-key-layout-switch' }
            ]
        ]
    }
};
