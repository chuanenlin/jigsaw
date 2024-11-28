import { __rest } from "tslib";
import TextField from '@mui/material/TextField';
import React from 'react';
import { connectField, filterDOMProps } from 'uniforms';
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
    var { disabled, error, errorMessage, helperText, InputLabelProps, inputRef, label, labelProps, max, min, name, onChange, placeholder, readOnly, showInlineError, value, type = 'datetime-local' } = _a, props = __rest(_a, ["disabled", "error", "errorMessage", "helperText", "InputLabelProps", "inputRef", "label", "labelProps", "max", "min", "name", "onChange", "placeholder", "readOnly", "showInlineError", "value", "type"]);
    return (React.createElement(TextField, Object.assign({ disabled: disabled, error: !!error, fullWidth: true, helperText: (!!error && showInlineError && errorMessage) || helperText, label: label, InputLabelProps: Object.assign(Object.assign({ shrink: true }, labelProps), InputLabelProps), inputProps: Object.assign({ max: dateFormat(max), min: dateFormat(min), readOnly }, props.inputProps), margin: "dense", name: name, onChange: event => 
        // FIXME: `valueAsNumber` is not available in `EventTarget`.
        disabled || dateParse(event.target.valueAsNumber, onChange), placeholder: placeholder, ref: inputRef, type: type, value: (_b = dateFormat(value, type)) !== null && _b !== void 0 ? _b : '' }, filterDOMProps(props))));
}
export default connectField(Date, { kind: 'leaf' });
