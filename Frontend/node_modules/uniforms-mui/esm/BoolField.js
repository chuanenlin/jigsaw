import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Switch from '@mui/material/Switch';
import omit from 'lodash/omit';
import React from 'react';
import { connectField, filterDOMProps } from 'uniforms';
import wrapField from './wrapField';
function Bool(props) {
    const { appearance, disabled, inputRef, label, legend, name, onChange, readOnly, value, } = props;
    const SelectionControl = appearance === 'checkbox' || appearance === undefined ? Checkbox : Switch;
    return wrapField(Object.assign({ fullWidth: true }, props), legend && (React.createElement(FormLabel, { component: "legend", htmlFor: name }, legend)), React.createElement(FormGroup, null,
        React.createElement(FormControlLabel, { control: React.createElement(SelectionControl, Object.assign({ checked: !!value, name: name, onChange: event => !disabled &&
                    !readOnly &&
                    onChange &&
                    onChange(event.target.checked), ref: inputRef, value: name }, omit(filterDOMProps(props), ['helperText', 'fullWidth']))), 
            // @ts-expect-error React.Node vs React.Element TODO
            label: label })));
}
export default connectField(Bool, { kind: 'leaf' });
