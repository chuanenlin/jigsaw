"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const uniforms_1 = require("uniforms");
const BaseForm_1 = (0, tslib_1.__importDefault)(require("./BaseForm"));
function Validated(parent) {
    class _ extends uniforms_1.ValidatedForm.Validated(parent) {
    }
    _.Validated = Validated;
    return _;
}
exports.default = Validated(BaseForm_1.default);
