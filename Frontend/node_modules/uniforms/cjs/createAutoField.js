"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAutoField = void 0;
const tslib_1 = require("tslib");
const invariant_1 = (0, tslib_1.__importDefault)(require("invariant"));
const react_1 = require("react");
const useField_1 = require("./useField");
function createAutoField(defaultComponentDetector) {
    const context = (0, react_1.createContext)(defaultComponentDetector);
    function AutoField(_a) {
        var _b;
        var { experimental_absoluteName: absoluteName } = _a, rawProps = (0, tslib_1.__rest)(_a, ["experimental_absoluteName"]);
        const options = { absoluteName };
        const [props, uniforms] = (0, useField_1.useField)(rawProps.name, rawProps, options);
        const componentDetector = (0, react_1.useContext)(context);
        const component = componentDetector(props, uniforms);
        (0, invariant_1.default)(component, 'AutoField received no component for: %s', props.name);
        return 'options' in component && ((_b = component.options) === null || _b === void 0 ? void 0 : _b.kind) === 'leaf'
            ? (0, react_1.createElement)(component.Component, props)
            : (0, react_1.createElement)(component, rawProps);
    }
    return Object.assign(AutoField, {
        componentDetectorContext: context,
        defaultComponentDetector,
    });
}
exports.createAutoField = createAutoField;
