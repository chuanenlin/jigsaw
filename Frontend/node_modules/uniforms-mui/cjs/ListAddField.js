"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Button_1 = (0, tslib_1.__importDefault)(require("@mui/material/Button"));
const FormControl_1 = (0, tslib_1.__importDefault)(require("@mui/material/FormControl"));
const cloneDeep_1 = (0, tslib_1.__importDefault)(require("lodash/cloneDeep"));
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const uniforms_1 = require("uniforms");
function ListAdd(_a) {
    var { disabled, fullWidth = true, icon = '+', margin = 'dense', name, readOnly, value, variant } = _a, props = (0, tslib_1.__rest)(_a, ["disabled", "fullWidth", "icon", "margin", "name", "readOnly", "value", "variant"]);
    const nameParts = (0, uniforms_1.joinName)(null, name);
    const parentName = (0, uniforms_1.joinName)(nameParts.slice(0, -1));
    const parent = (0, uniforms_1.useField)(parentName, {}, { absoluteName: true })[0];
    const limitNotReached = !disabled && !(parent.maxCount <= parent.value.length);
    return (react_1.default.createElement(FormControl_1.default, { fullWidth: fullWidth, margin: margin, variant: variant },
        react_1.default.createElement(Button_1.default, Object.assign({ size: "large", variant: "outlined" }, (0, uniforms_1.filterDOMProps)(props), { disabled: !limitNotReached, onClick: () => {
                if (!readOnly) {
                    parent.onChange(parent.value.concat([(0, cloneDeep_1.default)(value)]));
                }
            } }), icon)));
}
exports.default = (0, uniforms_1.connectField)(ListAdd, {
    initialValue: false,
    kind: 'leaf',
});
