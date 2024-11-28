"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ListItem_1 = (0, tslib_1.__importDefault)(require("@mui/material/ListItem"));
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const uniforms_1 = require("uniforms");
const AutoField_1 = (0, tslib_1.__importDefault)(require("./AutoField"));
const ListDelField_1 = (0, tslib_1.__importDefault)(require("./ListDelField"));
function ListItem({ children = react_1.default.createElement(AutoField_1.default, { label: null, name: "" }), dense = true, disableGutters, divider, removeIcon, }) {
    return (react_1.default.createElement(ListItem_1.default, { dense: dense, disableGutters: disableGutters, divider: divider },
        children,
        react_1.default.createElement(ListDelField_1.default, { name: "", icon: removeIcon })));
}
exports.default = (0, uniforms_1.connectField)(ListItem, {
    initialValue: false,
});
