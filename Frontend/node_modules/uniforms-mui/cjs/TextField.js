"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const TextField_1 = (0, tslib_1.__importDefault)(require("@mui/material/TextField"));
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const uniforms_1 = require("uniforms");
function Text(_a) {
    var { disabled, error, errorMessage, helperText, inputRef, label, name, onChange, placeholder, readOnly, showInlineError, type = 'text', value = '' } = _a, props = (0, tslib_1.__rest)(_a, ["disabled", "error", "errorMessage", "helperText", "inputRef", "label", "name", "onChange", "placeholder", "readOnly", "showInlineError", "type", "value"]);
    return (react_1.default.createElement(TextField_1.default, Object.assign({ disabled: disabled, error: !!error, fullWidth: true, helperText: (!!error && showInlineError && errorMessage) || helperText, inputProps: { readOnly }, label: label, margin: "dense", name: name, onChange: event => disabled || onChange(event.target.value), placeholder: placeholder, ref: inputRef, type: type, value: value }, (0, uniforms_1.filterDOMProps)(props))));
}
exports.default = (0, uniforms_1.connectField)(Text, { kind: 'leaf' });
