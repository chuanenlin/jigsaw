import { __rest } from "tslib";
import React from 'react';
import { BaseForm } from './BaseForm';
export function Quick(Base) {
    // @ts-expect-error: Mixin class problem.
    class QuickForm extends Base {
        getNativeFormProps() {
            const _props = super.getNativeFormProps();
            const { errorsField: ErrorsField = this.getErrorsField(), submitField: SubmitField = this.getSubmitField() } = _props, props = __rest(_props, ["errorsField", "submitField"]);
            const AutoField = this.getAutoField();
            if (!props.children) {
                props.children = this.getContextSchema()
                    .getSubfields()
                    .map(key => React.createElement(AutoField, { key: key, name: key }))
                    .concat([
                    React.createElement(ErrorsField, { key: "$ErrorsField" }),
                    React.createElement(SubmitField, { key: "$SubmitField" }),
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
export const QuickForm = Quick(BaseForm);
