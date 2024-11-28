"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const uniforms_1 = require("uniforms");
const ValidatedQuickForm_1 = (0, tslib_1.__importDefault)(require("./ValidatedQuickForm"));
function Auto(parent) {
    class _ extends uniforms_1.AutoForm.Auto(parent) {
    }
    _.Auto = Auto;
    return _;
}
exports.default = Auto(ValidatedQuickForm_1.default);
