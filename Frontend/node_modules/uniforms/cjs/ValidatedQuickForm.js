"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatedQuickForm = void 0;
const BaseForm_1 = require("./BaseForm");
const QuickForm_1 = require("./QuickForm");
const ValidatedForm_1 = require("./ValidatedForm");
exports.ValidatedQuickForm = (0, ValidatedForm_1.Validated)((0, QuickForm_1.Quick)(BaseForm_1.BaseForm));
