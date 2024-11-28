"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Button_1 = (0, tslib_1.__importDefault)(require("@mui/material/Button"));
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const uniforms_1 = require("uniforms");
function SubmitField(_a) {
    var { children, disabled, inputRef, label = 'Submit', value } = _a, props = (0, tslib_1.__rest)(_a, ["children", "disabled", "inputRef", "label", "value"]);
    const { error, state } = (0, uniforms_1.useForm)();
    return (react_1.default.createElement(Button_1.default, Object.assign({ disabled: disabled === undefined ? !!(error || state.disabled) : disabled, ref: inputRef, type: "submit", value: value, variant: "contained" }, (0, uniforms_1.filterDOMProps)(props)), children || label));
}
exports.default = SubmitField;
