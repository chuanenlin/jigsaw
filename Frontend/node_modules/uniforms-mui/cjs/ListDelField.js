"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const IconButton_1 = (0, tslib_1.__importDefault)(require("@mui/material/IconButton"));
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const uniforms_1 = require("uniforms");
function ListDel(_a) {
    var { disabled, icon = '-', name, readOnly } = _a, props = (0, tslib_1.__rest)(_a, ["disabled", "icon", "name", "readOnly"]);
    const nameParts = (0, uniforms_1.joinName)(null, name);
    const nameIndex = +nameParts[nameParts.length - 1];
    const parentName = (0, uniforms_1.joinName)(nameParts.slice(0, -1));
    const parent = (0, uniforms_1.useField)(parentName, {}, { absoluteName: true })[0];
    disabled || (disabled = readOnly || parent.minCount >= parent.value.length);
    return (react_1.default.createElement(IconButton_1.default, Object.assign({}, (0, uniforms_1.filterDOMProps)(props), { disabled: disabled, onClick: () => {
            const value = parent.value.slice();
            value.splice(nameIndex, 1);
            parent.onChange(value);
        }, size: "large" }), icon));
}
exports.default = (0, uniforms_1.connectField)(ListDel, {
    initialValue: false,
    kind: 'leaf',
});
