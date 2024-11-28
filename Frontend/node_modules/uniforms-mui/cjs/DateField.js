"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const TextField_1 = (0, tslib_1.__importDefault)(require("@mui/material/TextField"));
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const uniforms_1 = require("uniforms");
/* istanbul ignore next */
const DateConstructor = (typeof global === 'object' ? global : window).Date;
const dateFormat = (value, type = 'datetime-local') => value === null || value === void 0 ? void 0 : value.toISOString().slice(0, type === 'datetime-local' ? -8 : -14);
const dateParse = (timestamp, onChange) => {
    const date = new DateConstructor(timestamp);
    if (date.getFullYear() < 10000) {
        onChange(date);
    }
    else if (isNaN(timestamp)) {
        onChange(undefined);
    }
};
function Date(_a) {
    var _b;
    var { disabled, error, errorMessage, helperText, InputLabelProps, inputRef, label, labelProps, max, min, name, onChange, placeholder, readOnly, showInlineError, value, type = 'datetime-local' } = _a, props = (0, tslib_1.__rest)(_a, ["disabled", "error", "errorMessage", "helperText", "InputLabelProps", "inputRef", "label", "labelProps", "max", "min", "name", "onChange", "placeholder", "readOnly", "showInlineError", "value", "type"]);
    return (react_1.default.createElement(TextField_1.default, Object.assign({ disabled: disabled, error: !!error, fullWidth: true, helperText: (!!error && showInlineError && errorMessage) || helperText, label: label, InputLabelProps: Object.assign(Object.assign({ shrink: true }, labelProps), InputLabelProps), inputProps: Object.assign({ max: dateFormat(max), min: dateFormat(min), readOnly }, props.inputProps), margin: "dense", name: name, onChange: event => 
        // FIXME: `valueAsNumber` is not available in `EventTarget`.
        disabled || dateParse(event.target.valueAsNumber, onChange), placeholder: placeholder, ref: inputRef, type: type, value: (_b = dateFormat(value, type)) !== null && _b !== void 0 ? _b : '' }, (0, uniforms_1.filterDOMProps)(props))));
}
exports.default = (0, uniforms_1.connectField)(Date, { kind: 'leaf' });
