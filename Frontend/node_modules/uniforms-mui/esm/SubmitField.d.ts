import { ButtonProps } from '@mui/material/Button';
import { ReactNode, Ref } from 'react';
import { Override } from 'uniforms';
export declare type SubmitFieldProps = Override<ButtonProps, {
    inputRef?: Ref<any>;
    label?: ReactNode;
}>;
declare function SubmitField({ children, disabled, inputRef, label, value, ...props }: SubmitFieldProps): JSX.Element;
export default SubmitField;
//# sourceMappingURL=SubmitField.d.ts.map