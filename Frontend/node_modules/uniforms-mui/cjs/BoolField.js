"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Checkbox_1 = (0, tslib_1.__importDefault)(require("@mui/material/Checkbox"));
const FormControlLabel_1 = (0, tslib_1.__importDefault)(require("@mui/material/FormControlLabel"));
const FormGroup_1 = (0, tslib_1.__importDefault)(require("@mui/material/FormGroup"));
const FormLabel_1 = (0, tslib_1.__importDefault)(require("@mui/material/FormLabel"));
const Switch_1 = (0, tslib_1.__importDefault)(require("@mui/material/Switch"));
const omit_1 = (0, tslib_1.__importDefault)(require("lodash/omit"));
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const uniforms_1 = require("uniforms");
const wrapField_1 = (0, tslib_1.__importDefault)(require("./wrapField"));
function Bool(props) {
    const { appearance, disabled, inputRef, label, legend, name, onChange, readOnly, value, } = props;
    const SelectionControl = appearance === 'checkbox' || appearance === undefined ? Checkbox_1.default : Switch_1.default;
    return (0, wrapField_1.default)(Object.assign({ fullWidth: true }, props), legend && (react_1.default.createElement(FormLabel_1.default, { component: "legend", htmlFor: name }, legend)), react_1.default.createElement(FormGroup_1.default, null,
        react_1.default.createElement(FormControlLabel_1.default, { control: react_1.default.createElement(SelectionControl, Object.assign({ checked: !!value, name: name, onChange: event => !disabled &&
                    !readOnly &&
                    onChange &&
                    onChange(event.target.checked), ref: inputRef, value: name }, (0, omit_1.default)((0, uniforms_1.filterDOMProps)(props), ['helperText', 'fullWidth']))), 
            // @ts-expect-error React.Node vs React.Element TODO
            label: label })));
}
exports.default = (0, uniforms_1.connectField)(Bool, { kind: 'leaf' });
