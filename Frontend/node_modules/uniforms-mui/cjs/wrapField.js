"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const FormControl_1 = (0, tslib_1.__importDefault)(require("@mui/material/FormControl"));
const FormHelperText_1 = (0, tslib_1.__importDefault)(require("@mui/material/FormHelperText"));
const react_1 = (0, tslib_1.__importStar)(require("react"));
function wrapField({ component, disabled, error, errorMessage, fullWidth, helperText, margin, readOnly, required, showInlineError, variant, }, ...children) {
    const formHelperText = showInlineError && error ? errorMessage : helperText;
    const props = {
        component,
        disabled: !!disabled,
        error: !!error,
        fullWidth: !!fullWidth,
        margin,
        readOnly,
        required,
        variant,
    };
    return (0, react_1.createElement)(FormControl_1.default, props, ...children, !!formHelperText && react_1.default.createElement(FormHelperText_1.default, null, formHelperText));
}
exports.default = wrapField;
