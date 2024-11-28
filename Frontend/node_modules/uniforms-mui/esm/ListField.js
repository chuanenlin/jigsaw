import { __rest } from "tslib";
import ListMaterial from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import React, { Children, cloneElement, isValidElement, } from 'react';
import { connectField, filterDOMProps } from 'uniforms';
import ListAddField from './ListAddField';
import ListItemField from './ListItemField';
function List(_a) {
    var { addIcon, children = React.createElement(ListItemField, { name: "$" }), itemProps, label, value } = _a, props = __rest(_a, ["addIcon", "children", "itemProps", "label", "value"]);
    return (React.createElement(React.Fragment, null,
        React.createElement(ListMaterial, Object.assign({ dense: true, subheader: label ? (React.createElement(ListSubheader, { disableSticky: true }, label)) : undefined }, filterDOMProps(props)), value === null || value === void 0 ? void 0 : value.map((item, itemIndex) => Children.map(children, (child, childIndex) => {
            var _a;
            return isValidElement(child)
                ? cloneElement(child, Object.assign({ key: `${itemIndex}-${childIndex}`, name: (_a = child.props.name) === null || _a === void 0 ? void 0 : _a.replace('$', '' + itemIndex) }, itemProps))
                : child;
        }))),
        React.createElement(ListAddField, { icon: addIcon, name: "$" })));
}
export default connectField(List);
