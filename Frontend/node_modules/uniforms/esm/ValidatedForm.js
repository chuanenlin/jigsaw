import clone from 'lodash/clone';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import noop from 'lodash/noop';
import omit from 'lodash/omit';
import setWith from 'lodash/setWith';
import { BaseForm } from './BaseForm';
export function Validated(Base) {
    // @ts-expect-error: Mixin class problem.
    class ValidatedForm extends Base {
        constructor(props) {
            super(props);
            this.state = Object.assign(Object.assign({}, this.state), { error: null, validate: false, validating: false, validator: this.getContextSchema().getValidator(props.validator) });
            this.onValidate = this.validate = this.onValidate.bind(this);
            this.onValidateModel = this.validateModel =
                this.onValidateModel.bind(this);
        }
        getContextError() {
            var _a;
            return (_a = super.getContextError()) !== null && _a !== void 0 ? _a : this.state.error;
        }
        getContext() {
            return Object.assign(Object.assign({}, super.getContext()), { validating: this.state.validating });
        }
        getNativeFormProps() {
            const props = super.getNativeFormProps();
            return omit(props, [
                'onValidate',
                'validate',
                'validator',
            ]);
        }
        componentDidUpdate(prevProps, prevState, snapshot) {
            super.componentDidUpdate(prevProps, prevState, snapshot);
            const { model, schema, validate, validator } = this.props;
            if (schema !== prevProps.schema || validator !== prevProps.validator) {
                this.setState({ validator: schema.getValidator(validator) }, () => {
                    if (shouldRevalidate(validate, this.state.validate)) {
                        this.onValidate();
                    }
                });
            }
            else if (!isEqual(model, prevProps.model) &&
                shouldRevalidate(validate, this.state.validate)) {
                this.onValidateModel(model);
            }
        }
        onChange(key, value) {
            if (shouldRevalidate(this.props.validate, this.state.validate)) {
                this.onValidate(key, value);
            }
            super.onChange(key, value);
        }
        __reset(state) {
            return Object.assign(Object.assign({}, super.__reset(state)), { error: null, validate: false, validating: false });
        }
        onSubmit(event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            this.setState({ submitted: true, validate: true });
            const result = this.onValidate().then(error => {
                if (error !== null) {
                    return Promise.reject(error);
                }
                // Validation failed (i.e. returned an error), so no error is present
                // both in the props nor the state.
                return super.onSubmit().catch(error => {
                    this.setState({ error });
                    throw error;
                });
            });
            result.catch(noop);
            return result;
        }
        onValidate(key, value) {
            let model = this.getContextModel();
            if (model && key) {
                model = setWith(clone(model), key, cloneDeep(value), clone);
            }
            return this.onValidateModel(model);
        }
        onValidateModel(originalModel) {
            const model = this.getModel('validate', originalModel);
            // Using `then` allows using the same code for both synchronous and
            // asynchronous cases. We could use `await` here, but it would make all
            // calls asynchronous, unnecessary delaying synchronous validation.
            const then = makeThen(() => {
                this.setState({ validating: true });
            });
            return then(this.state.validator(model), (error = null) => then(this.props.onValidate(model, error), (error = null) => {
                var _a;
                // Do not copy the error from props to the state.
                error = this.props.error === error ? null : error;
                // If the whole operation was synchronous and resulted in the same
                // error, we can skip the re-render.
                this.setState(state => state.error === error && !state.validating
                    ? null
                    : { error, validating: false });
                // A predefined error takes precedence over the validation one.
                return Promise.resolve((_a = this.props.error) !== null && _a !== void 0 ? _a : error);
            }));
        }
    }
    ValidatedForm.Validated = Validated;
    ValidatedForm.displayName = `Validated${Base.displayName}`;
    ValidatedForm.defaultProps = Object.assign(Object.assign({}, Base.defaultProps), { onValidate(model, error) {
            return error;
        }, validate: 'onChangeAfterSubmit' });
    return ValidatedForm;
}
function makeThen(callIfAsync) {
    function then(value, fn) {
        if (value instanceof Promise) {
            callIfAsync();
            return value.then(fn);
        }
        return fn(value);
    }
    return then;
}
function shouldRevalidate(inProps, inState) {
    return (inProps === 'onChange' || (inProps === 'onChangeAfterSubmit' && inState));
}
export const ValidatedForm = Validated(BaseForm);
