"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const TextField_1 = (0, tslib_1.__importDefault)(require("@mui/material/TextField"));
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const uniforms_1 = require("uniforms");
function Num(_a) {
    var { decimal, disabled, error, errorMessage, helperText, inputProps, inputRef, label, max, min, name, onChange, readOnly, placeholder, showInlineError, step = decimal ? 0.01 : 1, value } = _a, props = (0, tslib_1.__rest)(_a, ["decimal", "disabled", "error", "errorMessage", "helperText", "inputProps", "inputRef", "label", "max", "min", "name", "onChange", "readOnly", "placeholder", "showInlineError", "step", "value"]);
    return (react_1.default.createElement(TextField_1.default, Object.assign({ disabled: disabled, error: !!error, fullWidth: true, helperText: (!!error && showInlineError && errorMessage) || helperText, inputProps: Object.assign({ min,
            max,
            readOnly,
            step }, inputProps), label: label, margin: "dense", name: name, onChange: event => {
            const parse = decimal ? parseFloat : parseInt;
            const value = parse(event.target.value);
            onChange(isNaN(value) ? undefined : value);
        }, placeholder: placeholder, ref: inputRef, type: "number", value: value !== null && value !== void 0 ? value : '' }, (0, uniforms_1.filterDOMProps)(props))));
}
exports.default = (0, uniforms_1.connectField)(Num, { kind: 'leaf' });
