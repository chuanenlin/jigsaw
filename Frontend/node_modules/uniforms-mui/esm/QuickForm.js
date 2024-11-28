import { QuickForm } from 'uniforms';
import AutoField from './AutoField';
import BaseForm from './BaseForm';
import ErrorsField from './ErrorsField';
import SubmitField from './SubmitField';
function Quick(parent) {
    class _ extends QuickForm.Quick(parent) {
        getAutoField() {
            return AutoField;
        }
        getErrorsField() {
            return ErrorsField;
        }
        getSubmitField() {
            return SubmitField;
        }
    }
    _.Quick = Quick;
    return _;
}
export default Quick(BaseForm);
