import { __rest } from "tslib";
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import React from 'react';
import { filterDOMProps, useForm } from 'uniforms';
function ErrorsField(_a) {
    var { children, fullWidth = true, margin, variant } = _a, props = __rest(_a, ["children", "fullWidth", "margin", "variant"]);
    const { error, schema } = useForm();
    return !error && !children ? null : (React.createElement(FormControl, { error: !!error, fullWidth: !!fullWidth, margin: margin, variant: variant },
        !!children && (React.createElement(FormHelperText, Object.assign({}, filterDOMProps(props)), children)),
        schema.getErrorMessages(error).map((message, index) => (React.createElement(FormHelperText, Object.assign({ key: index }, filterDOMProps(props)), message)))));
}
export default ErrorsField;
