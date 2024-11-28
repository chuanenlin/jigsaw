"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickForm = exports.Quick = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const BaseForm_1 = require("./BaseForm");
function Quick(Base) {
    // @ts-expect-error: Mixin class problem.
    class QuickForm extends Base {
        getNativeFormProps() {
            const _props = super.getNativeFormProps();
            const { errorsField: ErrorsField = this.getErrorsField(), submitField: SubmitField = this.getSubmitField() } = _props, props = (0, tslib_1.__rest)(_props, ["errorsField", "submitField"]);
            const AutoField = this.getAutoField();
            if (!props.children) {
                props.children = this.getContextSchema()
                    .getSubfields()
                    .map(key => react_1.default.createElement(AutoField, { key: key, name: key }))
                    .concat([
                    react_1.default.createElement(ErrorsField, { key: "$ErrorsField" }),
                    react_1.default.createElement(SubmitField, { key: "$SubmitField" }),
                ]);
            }
            return props;
        }
        getAutoField() {
            return () => null;
        }
        getErrorsField() {
            return () => null;
        }
        getSubmitField() {
            return () => null;
        }
    }
    QuickForm.Quick = Quick;
    QuickForm.displayName = `Quick${Base.displayName}`;
    return QuickForm;
}
exports.Quick = Quick;
exports.QuickForm = Quick(BaseForm_1.BaseForm);
