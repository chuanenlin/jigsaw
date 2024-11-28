import { TextFieldProps } from '@mui/material/TextField';
import { FieldProps } from 'uniforms';
export declare type NumFieldProps = FieldProps<number, TextFieldProps, {
    decimal?: boolean;
    max?: number;
    min?: number;
    step?: number;
}>;
declare const _default: import("uniforms").ConnectedField<NumFieldProps, number | undefined>;
export default _default;
//# sourceMappingURL=NumField.d.ts.map