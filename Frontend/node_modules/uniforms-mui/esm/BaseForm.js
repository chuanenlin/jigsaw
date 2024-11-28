import { BaseForm } from 'uniforms';
function Material(parent) {
    class _ extends parent {
    }
    _.Material = Material;
    _.displayName = `Material${parent.displayName}`;
    return _;
}
export default Material(BaseForm);
