import { TextFieldProps } from '@mui/material/TextField';
import { FieldProps } from 'uniforms';
export declare type DateFieldProps = FieldProps<Date, TextFieldProps, {
    labelProps?: object;
    max?: Date;
    min?: Date;
    type?: 'date' | 'datetime-local';
}>;
declare const _default: import("uniforms").ConnectedField<DateFieldProps, Date | undefined>;
export default _default;
//# sourceMappingURL=DateField.d.ts.map