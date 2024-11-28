import mapValues from 'lodash/mapValues';
import React from 'react';
import { context as contextReference } from './context';
import { useField } from './useField';
function getNextContext(context, props, options) {
    // Leaf components by definition do not affect the context. `AutoField` will
    // skip most of them anyway, but if rendered directly we have to do it here.
    // An example in the core theme are the `List*Field`s.
    if ((options === null || options === void 0 ? void 0 : options.kind) === 'leaf') {
        return context;
    }
    const changesName = props.name !== '';
    const changesState = Object.keys(context.state).some(key => {
        const next = props[key];
        return next !== null && next !== undefined;
    });
    // There are no other ways of affecting the context.
    if (!changesName && !changesState) {
        return context;
    }
    const nextContext = Object.assign({}, context);
    if (changesName) {
        nextContext.name = nextContext.name.concat(props.name);
    }
    if (changesState) {
        nextContext.state = mapValues(nextContext.state, (prev, key) => {
            const next = props[key];
            return next !== null && next !== undefined ? !!next : prev;
        });
    }
    return nextContext;
}
export function connectField(Component, options) {
    function Field(props) {
        const [fieldProps, context] = useField(props.name, props, options);
        const nextContext = getNextContext(context, props, options);
        const body = React.createElement(Component, Object.assign({}, props, fieldProps));
        // If the context has not changed, then don't render the `Provider`. It's
        // possible that it will change at some point, but it's extremely rare, as
        // either `name` or one of the "state props" has to change.
        if (context === nextContext) {
            return body;
        }
        return React.createElement(contextReference.Provider, { children: body, value: nextContext });
    }
    Field.displayName = `${Component.displayName || Component.name}Field`;
    return Object.assign(Field, { Component, options });
}
