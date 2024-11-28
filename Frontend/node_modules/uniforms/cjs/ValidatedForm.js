"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatedForm = exports.Validated = void 0;
const tslib_1 = require("tslib");
const clone_1 = (0, tslib_1.__importDefault)(require("lodash/clone"));
const cloneDeep_1 = (0, tslib_1.__importDefault)(require("lodash/cloneDeep"));
const isEqual_1 = (0, tslib_1.__importDefault)(require("lodash/isEqual"));
const noop_1 = (0, tslib_1.__importDefault)(require("lodash/noop"));
const omit_1 = (0, tslib_1.__importDefault)(require("lodash/omit"));
const setWith_1 = (0, tslib_1.__importDefault)(require("lodash/setWith"));
const BaseForm_1 = require("./BaseForm");
function Validated(Base) {
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
            return (0, omit_1.default)(props, [
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
            else if (!(0, isEqual_1.default)(model, prevProps.model) &&
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
            result.catch(noop_1.default);
            return result;
        }
        onValidate(key, value) {
            let model = this.getContextModel();
            if (model && key) {
                model = (0, setWith_1.default)((0, clone_1.default)(model), key, (0, cloneDeep_1.default)(value), clone_1.default);
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
exports.Validated = Validated;
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
exports.ValidatedForm = Validated(BaseForm_1.BaseForm);
