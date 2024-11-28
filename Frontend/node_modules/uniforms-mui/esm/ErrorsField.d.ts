/// <reference types="react" />
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import { Override } from 'uniforms';
export declare type ErrorsFieldProps = Override<FormHelperTextProps, {
    fullWidth?: boolean;
    margin?: 'dense' | 'normal' | 'none';
    variant?: 'standard' | 'outlined' | 'filled';
}>;
declare function ErrorsField({ children, fullWidth, margin, variant, ...props }: ErrorsFieldProps): JSX.Element | null;
export default ErrorsField;
//# sourceMappingURL=ErrorsField.d.ts.map