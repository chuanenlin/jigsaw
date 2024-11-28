import { __rest } from "tslib";
import Button from '@mui/material/Button';
import React from 'react';
import { filterDOMProps, useForm } from 'uniforms';
function SubmitField(_a) {
    var { children, disabled, inputRef, label = 'Submit', value } = _a, props = __rest(_a, ["children", "disabled", "inputRef", "label", "value"]);
    const { error, state } = useForm();
    return (React.createElement(Button, Object.assign({ disabled: disabled === undefined ? !!(error || state.disabled) : disabled, ref: inputRef, type: "submit", value: value, variant: "contained" }, filterDOMProps(props)), children || label));
}
export default SubmitField;
