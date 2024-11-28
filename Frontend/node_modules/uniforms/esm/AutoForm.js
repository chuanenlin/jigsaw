import clone from 'lodash/clone';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import setWith from 'lodash/setWith';
import { ValidatedQuickForm, } from './ValidatedQuickForm';
export function Auto(Base) {
    // @ts-expect-error: Mixin class problem.
    class AutoForm extends Base {
        constructor(props) {
            super(props);
            this.state = Object.assign(Object.assign({}, this.state), { model: props.model });
        }
        componentDidUpdate(prevProps, prevState, snapshot) {
            const { model } = this.props;
            if (!isEqual(model, prevProps.model)) {
                this.setState({ model });
            }
            super.componentDidUpdate(prevProps, prevState, snapshot);
        }
        getNativeFormProps() {
            const props = super.getNativeFormProps();
            return omit(props, ['onChangeModel']);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getModel(mode) {
            return this.state.model;
        }
        onChange(key, value) {
            super.onChange(key, value);
            this.setState(state => ({ model: setWith(clone(state.model), key, value, clone) }), () => {
                if (this.props.onChangeModel) {
                    this.props.onChangeModel(this.state.model);
                }
            });
        }
        __reset(state) {
            return Object.assign(Object.assign({}, super.__reset(state)), { model: this.props.model });
        }
    }
    AutoForm.Auto = Auto;
    AutoForm.displayName = `Auto${Base.displayName}`;
    return AutoForm;
}
export const AutoForm = Auto(ValidatedQuickForm);
