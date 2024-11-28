import { __rest } from "tslib";
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import React from 'react';
import { connectField, filterDOMProps } from 'uniforms';
function Error(_a) {
    var { children, error, errorMessage, fullWidth, margin, variant } = _a, props = __rest(_a, ["children", "error", "errorMessage", "fullWidth", "margin", "variant"]);
    return !error ? null : (React.createElement(FormControl, { error: !!error, fullWidth: !!fullWidth, margin: margin === 'dense' ? margin : undefined, variant: variant },
        React.createElement(FormHelperText, Object.assign({}, filterDOMProps(props)), children || errorMessage)));
}
export default connectField(Error, {
    initialValue: false,
    kind: 'leaf',
});
