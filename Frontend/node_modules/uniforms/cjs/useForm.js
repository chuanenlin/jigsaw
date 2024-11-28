"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useForm = void 0;
const tslib_1 = require("tslib");
const invariant_1 = (0, tslib_1.__importDefault)(require("invariant"));
const react_1 = require("react");
const context_1 = require("./context");
function useForm() {
    const context = (0, react_1.useContext)(context_1.context);
    (0, invariant_1.default)(context !== null, `useForm must be used within a form.

Two most common reasons for this error are:
1. Component calling this function doesn't have a parent Form component in the tree.
2. A duplicate uniforms dependency is installed in node_modules.

For more info check FAQ: https://uniforms.tools/docs/faq/#useform-must-be-used-within-a-form
  `);
    return context;
}
exports.useForm = useForm;
