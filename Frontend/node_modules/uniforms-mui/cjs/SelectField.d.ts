import { CheckboxProps } from '@mui/material/Checkbox';
import { SelectProps as MaterialSelectProps } from '@mui/material/Select';
import { SwitchProps } from '@mui/material/Switch';
import { TextFieldProps } from '@mui/material/TextField';
import { Ref } from 'react';
import { FieldProps } from 'uniforms';
import type { Option } from './types';
declare type SelectFieldCommonProps = {
    options?: Option<string>[];
    appearance?: 'checkbox' | 'switch';
    inputRef?: Ref<HTMLButtonElement>;
    required?: boolean;
};
declare type CheckboxesProps = FieldProps<string | string[], CheckboxProps | SwitchProps, SelectFieldCommonProps & {
    checkboxes: true;
    legend?: string;
    variant?: undefined;
}>;
declare type SelectProps = FieldProps<string | string[], MaterialSelectProps & TextFieldProps, SelectFieldCommonProps & {
    checkboxes?: false;
    labelProps?: object;
    native?: boolean;
    textFieldProps?: Omit<TextFieldProps, 'value'>;
}>;
export declare type SelectFieldProps = CheckboxesProps | SelectProps;
declare const _default: import("uniforms").ConnectedField<SelectFieldProps, string | string[] | undefined>;
export default _default;
//# sourceMappingURL=SelectField.d.ts.map