"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const List_1 = (0, tslib_1.__importDefault)(require("@mui/material/List"));
const ListSubheader_1 = (0, tslib_1.__importDefault)(require("@mui/material/ListSubheader"));
const react_1 = (0, tslib_1.__importStar)(require("react"));
const uniforms_1 = require("uniforms");
const ListAddField_1 = (0, tslib_1.__importDefault)(require("./ListAddField"));
const ListItemField_1 = (0, tslib_1.__importDefault)(require("./ListItemField"));
function List(_a) {
    var { addIcon, children = react_1.default.createElement(ListItemField_1.default, { name: "$" }), itemProps, label, value } = _a, props = (0, tslib_1.__rest)(_a, ["addIcon", "children", "itemProps", "label", "value"]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(List_1.default, Object.assign({ dense: true, subheader: label ? (react_1.default.createElement(ListSubheader_1.default, { disableSticky: true }, label)) : undefined }, (0, uniforms_1.filterDOMProps)(props)), value === null || value === void 0 ? void 0 : value.map((item, itemIndex) => react_1.Children.map(children, (child, childIndex) => {
            var _a;
            return (0, react_1.isValidElement)(child)
                ? (0, react_1.cloneElement)(child, Object.assign({ key: `${itemIndex}-${childIndex}`, name: (_a = child.props.name) === null || _a === void 0 ? void 0 : _a.replace('$', '' + itemIndex) }, itemProps))
                : child;
        }))),
        react_1.default.createElement(ListAddField_1.default, { icon: addIcon, name: "$" })));
}
exports.default = (0, uniforms_1.connectField)(List);
