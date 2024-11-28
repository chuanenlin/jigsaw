"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const uniforms_1 = require("uniforms");
const AutoField_1 = (0, tslib_1.__importDefault)(require("./AutoField"));
const BaseForm_1 = (0, tslib_1.__importDefault)(require("./BaseForm"));
const ErrorsField_1 = (0, tslib_1.__importDefault)(require("./ErrorsField"));
const SubmitField_1 = (0, tslib_1.__importDefault)(require("./SubmitField"));
function Quick(parent) {
    class _ extends uniforms_1.QuickForm.Quick(parent) {
        getAutoField() {
            return AutoField_1.default;
        }
        getErrorsField() {
            return ErrorsField_1.default;
        }
        getSubmitField() {
            return SubmitField_1.default;
        }
    }
    _.Quick = Quick;
    return _;
}
exports.default = Quick(BaseForm_1.default);
