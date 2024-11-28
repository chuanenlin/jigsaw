"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uniforms_1 = require("uniforms");
function Material(parent) {
    class _ extends parent {
    }
    _.Material = Material;
    _.displayName = `Material${parent.displayName}`;
    return _;
}
exports.default = Material(uniforms_1.BaseForm);
