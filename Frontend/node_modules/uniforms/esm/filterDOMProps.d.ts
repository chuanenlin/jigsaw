import { FilterDOMProps } from '.';
/** @internal */
export declare type FilterDOMPropsKeys = keyof FilterDOMProps;
export declare const filterDOMProps: (<T extends object>(props: T) => Omit<T, keyof FilterDOMProps>) & {
    register(...props: FilterDOMPropsKeys[]): void;
    registered: readonly (keyof FilterDOMProps)[];
};
//# sourceMappingURL=filterDOMProps.d.ts.map