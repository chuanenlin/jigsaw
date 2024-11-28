import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import omit from 'lodash/omit';
import xor from 'lodash/xor';
import React from 'react';
import { connectField, filterDOMProps } from 'uniforms';
import wrapField from './wrapField';
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
        const SelectionControl = appearance === 'checkbox' ? Checkbox : Switch;
        const filteredProps = omit(filterDOMProps(props), [
            'checkboxes',
            'disableItem',
            'id',
            'inputRef',
        ]);
        const children = fieldType !== Array ? (React.createElement(RadioGroup, { id: id, name: name, onChange: event => disabled || readOnly || onChange(event.target.value), ref: inputRef, value: value !== null && value !== void 0 ? value : '' }, options.map(option => {
            var _a, _b, _c;
            return (React.createElement(FormControlLabel, { control: React.createElement(Radio, Object.assign({ id: `${id}-${(_a = option.key) !== null && _a !== void 0 ? _a : escape(option.value)}` }, filteredProps)), disabled: option.disabled || disabled, key: (_b = option.key) !== null && _b !== void 0 ? _b : option.value, label: (_c = option.label) !== null && _c !== void 0 ? _c : option.value, value: option.value }));
        }))) : (React.createElement(FormGroup, { id: id }, options.map(option => {
            var _a, _b, _c;
            return (React.createElement(FormControlLabel, { control: React.createElement(SelectionControl, Object.assign({ checked: value.includes(option.value), id: `${id}-${(_a = option.key) !== null && _a !== void 0 ? _a : escape(option.value)}`, name: name, onChange: () => disabled || readOnly || onChange(xor([option.value], value)), ref: inputRef, value: name }, filteredProps)), disabled: option.disabled || disabled, key: (_b = option.key) !== null && _b !== void 0 ? _b : option.value, label: (_c = option.label) !== null && _c !== void 0 ? _c : option.value }));
        })));
        return wrapField(Object.assign(Object.assign({}, props), { component: 'fieldset' }), (legend || label) && (React.createElement(FormLabel, { component: "legend" }, legend || label)), children);
    }
    const { options, disabled, error, errorMessage, fieldType, fullWidth = true, helperText, id, InputLabelProps, inputProps, label, labelProps, margin = 'dense', name, native, onChange, placeholder, readOnly, required, showInlineError, variant, textFieldProps, } = props;
    const Item = native ? 'option' : MenuItem;
    const hasPlaceholder = !!placeholder;
    const hasValue = value !== '' && value !== undefined;
    const filteredProps = omit(filterDOMProps(props), [
        'checkboxes',
        'disableItem',
        'fullWidth',
        'helperText',
        'margin',
        'textFieldProps',
        'variant',
    ]);
    return (React.createElement(TextField, Object.assign({ disabled: disabled, error: !!error, fullWidth: fullWidth, helperText: (!!error && showInlineError && errorMessage) || helperText, InputLabelProps: Object.assign(Object.assign({ shrink: !!label && (hasPlaceholder || hasValue) }, labelProps), InputLabelProps), label: label, margin: margin, onChange: event => disabled ||
            readOnly ||
            onChange(event.target.value !== '' ? event.target.value : undefined), required: required, select: true, SelectProps: Object.assign({ displayEmpty: hasPlaceholder, inputProps: Object.assign({ name, id }, inputProps), multiple: fieldType === Array || undefined, native }, filteredProps), value: native && !value ? '' : value, variant: variant }, textFieldProps),
        (hasPlaceholder || !required || !hasValue) && (React.createElement(Item, { value: "", disabled: !!required }, placeholder || label)),
        options.map(option => {
            var _a, _b;
            return (React.createElement(Item, { disabled: option.disabled, key: (_a = option.key) !== null && _a !== void 0 ? _a : option.value, value: option.value }, (_b = option.label) !== null && _b !== void 0 ? _b : option.value));
        })));
}
export default connectField(Select, { kind: 'leaf' });
