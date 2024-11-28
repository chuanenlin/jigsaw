import { ListProps } from '@mui/material/List';
import React, { ReactNode } from 'react';
import { FieldProps } from 'uniforms';
export declare type ListFieldProps = FieldProps<unknown[], ListProps, {
    addIcon?: ReactNode;
    itemProps?: object;
}>;
declare const _default: import("uniforms").ConnectedField<import("uniforms").GuaranteedProps<unknown[]> & {
    addIcon?: React.ReactNode;
    itemProps?: object | undefined;
} & Omit<ListProps<"ul", {}>, keyof import("uniforms").GuaranteedProps<unknown[]> | "addIcon" | "itemProps">, unknown[] | undefined>;
export default _default;
//# sourceMappingURL=ListField.d.ts.map