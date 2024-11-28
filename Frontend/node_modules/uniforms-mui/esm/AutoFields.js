import { __rest } from "tslib";
import { Fragment, createElement } from 'react';
import { useForm } from 'uniforms';
import AutoField from './AutoField';
export default function AutoFields(_a) {
    var { element = Fragment, fields, omitFields = [], showInlineError } = _a, props = __rest(_a, ["element", "fields", "omitFields", "showInlineError"]);
    const { schema } = useForm();
    return createElement(element, props, (fields !== null && fields !== void 0 ? fields : schema.getSubfields())
        .filter(field => !omitFields.includes(field))
        .map(field => createElement(AutoField, Object.assign({ key: field, name: field }, showInlineError === undefined ? null : { showInlineError }))));
}
