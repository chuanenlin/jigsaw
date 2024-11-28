"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const FormLabel_1 = (0, tslib_1.__importDefault)(require("@mui/material/FormLabel"));
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const uniforms_1 = require("uniforms");
const AutoField_1 = (0, tslib_1.__importDefault)(require("./AutoField"));
const wrapField_1 = (0, tslib_1.__importDefault)(require("./wrapField"));
function Nest(_a) {
    var { children, fields, fullWidth = true, itemProps, label, margin = 'dense' } = _a, props = (0, tslib_1.__rest)(_a, ["children", "fields", "fullWidth", "itemProps", "label", "margin"]);
    return (0, wrapField_1.default)(Object.assign(Object.assign({ fullWidth,
        margin }, props), { component: undefined }), label && react_1.default.createElement(FormLabel_1.default, { component: "legend" }, label), children ||
        fields.map(field => (react_1.default.createElement(AutoField_1.default, Object.assign({ key: field, name: field }, itemProps)))));
}
exports.default = (0, uniforms_1.connectField)(Nest);
