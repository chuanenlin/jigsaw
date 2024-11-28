import { __rest } from "tslib";
import TextField from '@mui/material/TextField';
import React from 'react';
import { connectField, filterDOMProps } from 'uniforms';
const LongText = (_a) => {
    var { disabled, error, errorMessage, helperText, inputRef, label, name, onChange, placeholder, readOnly, showInlineError, type = 'text', value } = _a, props = __rest(_a, ["disabled", "error", "errorMessage", "helperText", "inputRef", "label", "name", "onChange", "placeholder", "readOnly", "showInlineError", "type", "value"]);
    return (React.createElement(TextField, Object.assign({ disabled: disabled, error: !!error, fullWidth: true, helperText: (!!error && showInlineError && errorMessage) || helperText, inputProps: { readOnly }, label: label, margin: "dense", multiline: true, name: name, onChange: event => disabled || onChange(event.target.value), placeholder: placeholder, ref: inputRef, type: type, value: value !== null && value !== void 0 ? value : '' }, filterDOMProps(props))));
};
export default connectField(LongText, { kind: 'leaf' });
