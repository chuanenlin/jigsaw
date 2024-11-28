import { __rest } from "tslib";
import IconButton from '@mui/material/IconButton';
import React from 'react';
import { connectField, filterDOMProps, joinName, useField, } from 'uniforms';
function ListDel(_a) {
    var { disabled, icon = '-', name, readOnly } = _a, props = __rest(_a, ["disabled", "icon", "name", "readOnly"]);
    const nameParts = joinName(null, name);
    const nameIndex = +nameParts[nameParts.length - 1];
    const parentName = joinName(nameParts.slice(0, -1));
    const parent = useField(parentName, {}, { absoluteName: true })[0];
    disabled || (disabled = readOnly || parent.minCount >= parent.value.length);
    return (React.createElement(IconButton, Object.assign({}, filterDOMProps(props), { disabled: disabled, onClick: () => {
            const value = parent.value.slice();
            value.splice(nameIndex, 1);
            parent.onChange(value);
        }, size: "large" }), icon));
}
export default connectField(ListDel, {
    initialValue: false,
    kind: 'leaf',
});
