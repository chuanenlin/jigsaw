import { CheckboxProps } from '@mui/material/Checkbox';
import { SwitchProps } from '@mui/material/Switch';
import { FieldProps } from 'uniforms';
export declare type BoolFieldProps = FieldProps<boolean, CheckboxProps | SwitchProps, {
    appearance?: 'checkbox' | 'switch';
    fullWidth?: boolean;
    helperText?: string;
    legend?: string;
    margin?: 'dense' | 'normal' | 'none';
}>;
declare const _default: import("uniforms").ConnectedField<BoolFieldProps, boolean | undefined>;
export default _default;
//# sourceMappingURL=BoolField.d.ts.map