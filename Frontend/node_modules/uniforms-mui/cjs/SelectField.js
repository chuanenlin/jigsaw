"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Checkbox_1 = (0, tslib_1.__importDefault)(require("@mui/material/Checkbox"));
const FormControlLabel_1 = (0, tslib_1.__importDefault)(require("@mui/material/FormControlLabel"));
const FormGroup_1 = (0, tslib_1.__importDefault)(require("@mui/material/FormGroup"));
const FormLabel_1 = (0, tslib_1.__importDefault)(require("@mui/material/FormLabel"));
const MenuItem_1 = (0, tslib_1.__importDefault)(require("@mui/material/MenuItem"));
const Radio_1 = (0, tslib_1.__importDefault)(require("@mui/material/Radio"));
const RadioGroup_1 = (0, tslib_1.__importDefault)(require("@mui/material/RadioGroup"));
const Switch_1 = (0, tslib_1.__importDefault)(require("@mui/material/Switch"));
const TextField_1 = (0, tslib_1.__importDefault)(require("@mui/material/TextField"));
const omit_1 = (0, tslib_1.__importDefault)(require("lodash/omit"));
const xor_1 = (0, tslib_1.__importDefault)(require("lodash/xor"));
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const uniforms_1 = require("uniforms");
const wrapField_1 = (0, tslib_1.__importDefault)(require("./wrapField"));
const base64 = typeof btoa === 'undefined'
    ? /* istanbul ignore next */ /* istanbul ignore next */ x => Buffer.from(x).toString('base64')
    : btoa;
const escape = (x) => base64(encodeURIComponent(x)).replace(/=+$/, '');
// eslint-disable-next-line complexity
function Select(props) {
    var _a, _b;
    const value = (_a = props.value) !== null && _a !== void 0 ? _a : '';
    if (props.checkboxes) {
        const { options, disabled, fieldType, id, inputRef, label, legend, name, onChange, readOnly, } = props;
        const appearance = (_b = props.appearance) !== null && _b !== void 0 ? _b : 'checkbox';
        const SelectionControl = appearance === 'checkbox' ? Checkbox_1.default : Switch_1.default;
        const filteredProps = (0, omit_1.default)((0, uniforms_1.filterDOMProps)(props), [
            'checkboxes',
            'disableItem',
            'id',
            'inputRef',
        ]);
        const children = fieldType !== Array ? (react_1.default.createElement(RadioGroup_1.default, { id: id, name: name, onChange: event => disabled || readOnly || onChange(event.target.value), ref: inputRef, value: value !== null && value !== void 0 ? value : '' }, options.map(option => {
            var _a, _b, _c;
            return (react_1.default.createElement(FormControlLabel_1.default, { control: react_1.default.createElement(Radio_1.default, Object.assign({ id: `${id}-${(_a = option.key) !== null && _a !== void 0 ? _a : escape(option.value)}` }, filteredProps)), disabled: option.disabled || disabled, key: (_b = option.key) !== null && _b !== void 0 ? _b : option.value, label: (_c = option.label) !== null && _c !== void 0 ? _c : option.value, value: option.value }));
        }))) : (react_1.default.createElement(FormGroup_1.default, { id: id }, options.map(option => {
            var _a, _b, _c;
            return (react_1.default.createElement(FormControlLabel_1.default, { control: react_1.default.createElement(SelectionControl, Object.assign({ checked: value.includes(option.value), id: `${id}-${(_a = option.key) !== null && _a !== void 0 ? _a : escape(option.value)}`, name: name, onChange: () => disabled || readOnly || onChange((0, xor_1.default)([option.value], value)), ref: inputRef, value: name }, filteredProps)), disabled: option.disabled || disabled, key: (_b = option.key) !== null && _b !== void 0 ? _b : option.value, label: (_c = option.label) !== null && _c !== void 0 ? _c : option.value }));
        })));
        return (0, wrapField_1.default)(Object.assign(Object.assign({}, props), { component: 'fieldset' }), (legend || label) && (react_1.default.createElement(FormLabel_1.default, { component: "legend" }, legend || label)), children);
    }
    const { options, disabled, error, errorMessage, fieldType, fullWidth = true, helperText, id, InputLabelProps, inputProps, label, labelProps, margin = 'dense', name, native, onChange, placeholder, readOnly, required, showInlineError, variant, textFieldProps, } = props;
    const Item = native ? 'option' : MenuItem_1.default;
    const hasPlaceholder = !!placeholder;
    const hasValue = value !== '' && value !== undefined;
    const filteredProps = (0, omit_1.default)((0, uniforms_1.filterDOMProps)(props), [
        'checkboxes',
        'disableItem',
        'fullWidth',
        'helperText',
        'margin',
        'textFieldProps',
        'variant',
    ]);
    return (react_1.default.createElement(TextField_1.default, Object.assign({ disabled: disabled, error: !!error, fullWidth: fullWidth, helperText: (!!error && showInlineError && errorMessage) || helperText, InputLabelProps: Object.assign(Object.assign({ shrink: !!label && (hasPlaceholder || hasValue) }, labelProps), InputLabelProps), label: label, margin: margin, onChange: event => disabled ||
            readOnly ||
            onChange(event.target.value !== '' ? event.target.value : undefined), required: required, select: true, SelectProps: Object.assign({ displayEmpty: hasPlaceholder, inputProps: Object.assign({ name, id }, inputProps), multiple: fieldType === Array || undefined, native }, filteredProps), value: native && !value ? '' : value, variant: variant }, textFieldProps),
        (hasPlaceholder || !required || !hasValue) && (react_1.default.createElement(Item, { value: "", disabled: !!required }, placeholder || label)),
        options.map(option => {
            var _a, _b;
            return (react_1.default.createElement(Item, { disabled: option.disabled, key: (_a = option.key) !== null && _a !== void 0 ? _a : option.value, value: option.value }, (_b = option.label) !== null && _b !== void 0 ? _b : option.value));
        })));
}
exports.default = (0, uniforms_1.connectField)(Select, { kind: 'leaf' });
