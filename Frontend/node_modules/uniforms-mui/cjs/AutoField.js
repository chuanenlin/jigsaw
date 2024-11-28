"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const invariant_1 = (0, tslib_1.__importDefault)(require("invariant"));
const uniforms_1 = require("uniforms");
const BoolField_1 = (0, tslib_1.__importDefault)(require("./BoolField"));
const DateField_1 = (0, tslib_1.__importDefault)(require("./DateField"));
const ListField_1 = (0, tslib_1.__importDefault)(require("./ListField"));
const NestField_1 = (0, tslib_1.__importDefault)(require("./NestField"));
const NumField_1 = (0, tslib_1.__importDefault)(require("./NumField"));
const RadioField_1 = (0, tslib_1.__importDefault)(require("./RadioField"));
const SelectField_1 = (0, tslib_1.__importDefault)(require("./SelectField"));
const TextField_1 = (0, tslib_1.__importDefault)(require("./TextField"));
const AutoField = (0, uniforms_1.createAutoField)(props => {
    if (props.component) {
        return props.component;
    }
    if (props.options) {
        return props.checkboxes && props.fieldType !== Array
            ? RadioField_1.default
            : SelectField_1.default;
    }
    switch (props.fieldType) {
        case Array:
            return ListField_1.default;
        case Boolean:
            return BoolField_1.default;
        case Date:
            return DateField_1.default;
        case Number:
            return NumField_1.default;
        case Object:
            return NestField_1.default;
        case String:
            return TextField_1.default;
    }
    return (0, invariant_1.default)(false, 'Unsupported field type: %s', props.fieldType);
});
exports.default = AutoField;
