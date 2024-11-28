"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const FormControl_1 = (0, tslib_1.__importDefault)(require("@mui/material/FormControl"));
const FormHelperText_1 = (0, tslib_1.__importDefault)(require("@mui/material/FormHelperText"));
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const uniforms_1 = require("uniforms");
function ErrorsField(_a) {
    var { children, fullWidth = true, margin, variant } = _a, props = (0, tslib_1.__rest)(_a, ["children", "fullWidth", "margin", "variant"]);
    const { error, schema } = (0, uniforms_1.useForm)();
    return !error && !children ? null : (react_1.default.createElement(FormControl_1.default, { error: !!error, fullWidth: !!fullWidth, margin: margin, variant: variant },
        !!children && (react_1.default.createElement(FormHelperText_1.default, Object.assign({}, (0, uniforms_1.filterDOMProps)(props)), children)),
        schema.getErrorMessages(error).map((message, index) => (react_1.default.createElement(FormHelperText_1.default, Object.assign({ key: index }, (0, uniforms_1.filterDOMProps)(props)), message)))));
}
exports.default = ErrorsField;
