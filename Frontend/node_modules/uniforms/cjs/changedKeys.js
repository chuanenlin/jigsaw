"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changedKeys = void 0;
const tslib_1 = require("tslib");
const isEqual_1 = (0, tslib_1.__importDefault)(require("lodash/isEqual"));
const joinName_1 = require("./joinName");
function isObject(value) {
    return !!value && value === Object(value) && !(value instanceof Date);
}
// eslint-disable-next-line complexity
function changedKeys(root, valueA, valueB) {
    if (!isObject(valueA) || (valueB && typeof valueA !== typeof valueB)) {
        return (0, isEqual_1.default)(valueA, valueB) ? [] : [root];
    }
    const changed = [root];
    if (isObject(valueB)) {
        for (const key in valueA) {
            if (!(key in valueB) || !(0, isEqual_1.default)(valueA[key], valueB[key])) {
                changed.push((0, joinName_1.joinName)(root, key));
            }
        }
        for (const key in valueB) {
            if (!(key in valueA)) {
                changed.push((0, joinName_1.joinName)(root, key));
            }
        }
        if (changed.length === 1) {
            changed.pop();
        }
    }
    else {
        // eslint-disable-next-line guard-for-in
        for (const key in valueA) {
            changed.push((0, joinName_1.joinName)(root, key));
        }
    }
    return changed;
}
exports.changedKeys = changedKeys;
