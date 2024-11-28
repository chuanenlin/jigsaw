import React, { ReactNode } from 'react';
export default function wrapField({ component, disabled, error, errorMessage, fullWidth, helperText, margin, readOnly, required, showInlineError, variant, }: any, ...children: ReactNode[]): React.FunctionComponentElement<{
    children?: React.ReactNode;
    classes?: Partial<import("@mui/material/FormControl").FormControlClasses> | undefined;
    color?: "error" | "warning" | "success" | "info" | "primary" | "secondary" | undefined;
    disabled?: boolean | undefined;
    error?: boolean | undefined;
    fullWidth?: boolean | undefined;
    focused?: boolean | undefined;
    hiddenLabel?: boolean | undefined;
    margin?: "normal" | "none" | "dense" | undefined;
    required?: boolean | undefined;
    size?: "small" | "medium" | undefined;
    sx?: import("@mui/system").SxProps<import("@mui/material").Theme> | undefined;
    variant?: "filled" | "outlined" | "standard" | undefined;
} & import("@mui/material/OverridableComponent").CommonProps & Omit<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null | undefined;
}, "color" | "size" | "disabled" | "margin" | "children" | "required" | "error" | "sx" | keyof import("@mui/material/OverridableComponent").CommonProps | "variant" | "focused" | "fullWidth" | "hiddenLabel">>;
//# sourceMappingURL=wrapField.d.ts.map