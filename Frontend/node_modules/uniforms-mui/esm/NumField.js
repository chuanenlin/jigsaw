import { __rest } from "tslib";
import TextField from '@mui/material/TextField';
import React from 'react';
import { connectField, filterDOMProps } from 'uniforms';
function Num(_a) {
    var { decimal, disabled, error, errorMessage, helperText, inputProps, inputRef, label, max, min, name, onChange, readOnly, placeholder, showInlineError, step = decimal ? 0.01 : 1, value } = _a, props = __rest(_a, ["decimal", "disabled", "error", "errorMessage", "helperText", "inputProps", "inputRef", "label", "max", "min", "name", "onChange", "readOnly", "placeholder", "showInlineError", "step", "value"]);
    return (React.createElement(TextField, Object.assign({ disabled: disabled, error: !!error, fullWidth: true, helperText: (!!error && showInlineError && errorMessage) || helperText, inputProps: Object.assign({ min,
            max,
            readOnly,
            step }, inputProps), label: label, margin: "dense", name: name, onChange: event => {
            const parse = decimal ? parseFloat : parseInt;
            const value = parse(event.target.value);
            onChange(isNaN(value) ? undefined : value);
        }, placeholder: placeholder, ref: inputRef, type: "number", value: value !== null && value !== void 0 ? value : '' }, filterDOMProps(props))));
}
export default connectField(Num, { kind: 'leaf' });
