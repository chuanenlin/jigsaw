import { __rest } from "tslib";
import React, { useEffect } from 'react';
import { filterDOMProps, useField } from 'uniforms';
export default function HiddenField(_a) {
    var _b;
    var { value } = _a, rawProps = __rest(_a, ["value"]);
    const props = useField(rawProps.name, rawProps, { initialValue: false })[0];
    useEffect(() => {
        if (value !== undefined && value !== props.value) {
            props.onChange(value);
        }
    });
    return props.noDOM ? null : (React.createElement("input", Object.assign({ disabled: props.disabled, name: props.name, readOnly: props.readOnly, ref: props.inputRef, type: "hidden", 
        // @ts-expect-error `value` should be serializable.
        value: (_b = value !== null && value !== void 0 ? value : props.value) !== null && _b !== void 0 ? _b : '' }, filterDOMProps(props))));
}
