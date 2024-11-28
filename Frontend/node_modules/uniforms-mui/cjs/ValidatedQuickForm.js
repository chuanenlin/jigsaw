"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const BaseForm_1 = (0, tslib_1.__importDefault)(require("./BaseForm"));
const QuickForm_1 = (0, tslib_1.__importDefault)(require("./QuickForm"));
const ValidatedForm_1 = (0, tslib_1.__importDefault)(require("./ValidatedForm"));
exports.default = ValidatedForm_1.default.Validated(QuickForm_1.default.Quick(BaseForm_1.default));
