"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoForm = exports.Auto = void 0;
const tslib_1 = require("tslib");
const clone_1 = (0, tslib_1.__importDefault)(require("lodash/clone"));
const isEqual_1 = (0, tslib_1.__importDefault)(require("lodash/isEqual"));
const omit_1 = (0, tslib_1.__importDefault)(require("lodash/omit"));
const setWith_1 = (0, tslib_1.__importDefault)(require("lodash/setWith"));
const ValidatedQuickForm_1 = require("./ValidatedQuickForm");
function Auto(Base) {
    // @ts-expect-error: Mixin class problem.
    class AutoForm extends Base {
        constructor(props) {
            super(props);
            this.state = Object.assign(Object.assign({}, this.state), { model: props.model });
        }
        componentDidUpdate(prevProps, prevState, snapshot) {
            const { model } = this.props;
            if (!(0, isEqual_1.default)(model, prevProps.model)) {
                this.setState({ model });
            }
            super.componentDidUpdate(prevProps, prevState, snapshot);
        }
        getNativeFormProps() {
            const props = super.getNativeFormProps();
            return (0, omit_1.default)(props, ['onChangeModel']);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getModel(mode) {
            return this.state.model;
        }
        onChange(key, value) {
            super.onChange(key, value);
            this.setState(state => ({ model: (0, setWith_1.default)((0, clone_1.default)(state.model), key, value, clone_1.default) }), () => {
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
exports.Auto = Auto;
exports.AutoForm = Auto(ValidatedQuickForm_1.ValidatedQuickForm);
