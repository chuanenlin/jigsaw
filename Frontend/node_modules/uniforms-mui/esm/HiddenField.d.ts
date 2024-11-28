import { HTMLProps, Ref } from 'react';
import { Override } from 'uniforms';
export declare type HiddenFieldProps = Override<HTMLProps<HTMLInputElement>, {
    inputRef?: Ref<HTMLInputElement>;
    name: string;
    noDOM?: boolean;
    value?: unknown;
}>;
export default function HiddenField({ value, ...rawProps }: HiddenFieldProps): JSX.Element | null;
//# sourceMappingURL=HiddenField.d.ts.map