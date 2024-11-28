import ListItemMaterial from '@mui/material/ListItem';
import React from 'react';
import { connectField } from 'uniforms';
import AutoField from './AutoField';
import ListDelField from './ListDelField';
function ListItem({ children = React.createElement(AutoField, { label: null, name: "" }), dense = true, disableGutters, divider, removeIcon, }) {
    return (React.createElement(ListItemMaterial, { dense: dense, disableGutters: disableGutters, divider: divider },
        children,
        React.createElement(ListDelField, { name: "", icon: removeIcon })));
}
export default connectField(ListItem, {
    initialValue: false,
});
