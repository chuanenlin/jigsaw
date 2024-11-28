import { __rest } from "tslib";
import invariant from 'invariant';
import { createContext, createElement, useContext, } from 'react';
import { useField } from './useField';
export function createAutoField(defaultComponentDetector) {
    const context = createContext(defaultComponentDetector);
    function AutoField(_a) {
        var _b;
        var { experimental_absoluteName: absoluteName } = _a, rawProps = __rest(_a, ["experimental_absoluteName"]);
        const options = { absoluteName };
        const [props, uniforms] = useField(rawProps.name, rawProps, options);
        const componentDetector = useContext(context);
        const component = componentDetector(props, uniforms);
        invariant(component, 'AutoField received no component for: %s', props.name);
        return 'options' in component && ((_b = component.options) === null || _b === void 0 ? void 0 : _b.kind) === 'leaf'
            ? createElement(component.Component, props)
            : createElement(component, rawProps);
    }
    return Object.assign(AutoField, {
        componentDetectorContext: context,
        defaultComponentDetector,
    });
}
