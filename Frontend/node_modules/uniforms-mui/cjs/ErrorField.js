"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const FormControl_1 = (0, tslib_1.__importDefault)(require("@mui/material/FormControl"));
const FormHelperText_1 = (0, tslib_1.__importDefault)(require("@mui/material/FormHelperText"));
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const uniforms_1 = require("uniforms");
function Error(_a) {
    var { children, error, errorMessage, fullWidth, margin, variant } = _a, props = (0, tslib_1.__rest)(_a, ["children", "error", "errorMessage", "fullWidth", "margin", "variant"]);
    return !error ? null : (react_1.default.createElement(FormControl_1.default, { error: !!error, fullWidth: !!fullWidth, margin: margin === 'dense' ? margin : undefined, variant: variant },
        react_1.default.createElement(FormHelperText_1.default, Object.assign({}, (0, uniforms_1.filterDOMProps)(props)), children || errorMessage)));
}
exports.default = (0, uniforms_1.connectField)(Error, {
    initialValue: false,
    kind: 'leaf',
});
