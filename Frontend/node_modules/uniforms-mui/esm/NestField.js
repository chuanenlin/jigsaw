import { __rest } from "tslib";
import FormLabel from '@mui/material/FormLabel';
import React from 'react';
import { connectField } from 'uniforms';
import AutoField from './AutoField';
import wrapField from './wrapField';
function Nest(_a) {
    var { children, fields, fullWidth = true, itemProps, label, margin = 'dense' } = _a, props = __rest(_a, ["children", "fields", "fullWidth", "itemProps", "label", "margin"]);
    return wrapField(Object.assign(Object.assign({ fullWidth,
        margin }, props), { component: undefined }), label && React.createElement(FormLabel, { component: "legend" }, label), children ||
        fields.map(field => (React.createElement(AutoField, Object.assign({ key: field, name: field }, itemProps)))));
}
export default connectField(Nest);
