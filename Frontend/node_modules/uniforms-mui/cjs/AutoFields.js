"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = require("react");
const uniforms_1 = require("uniforms");
const AutoField_1 = (0, tslib_1.__importDefault)(require("./AutoField"));
function AutoFields(_a) {
    var { element = react_1.Fragment, fields, omitFields = [], showInlineError } = _a, props = (0, tslib_1.__rest)(_a, ["element", "fields", "omitFields", "showInlineError"]);
    const { schema } = (0, uniforms_1.useForm)();
    return (0, react_1.createElement)(element, props, (fields !== null && fields !== void 0 ? fields : schema.getSubfields())
        .filter(field => !omitFields.includes(field))
        .map(field => (0, react_1.createElement)(AutoField_1.default, Object.assign({ key: field, name: field }, showInlineError === undefined ? null : { showInlineError }))));
}
exports.default = AutoFields;
