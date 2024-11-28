import { ComponentType, ReactElement } from 'react';
import { connectField } from './connectField';
import { Context, UnknownObject } from './types';
import { useField } from './useField';
export declare type AutoFieldProps = UnknownObject & {
    component?: Component;
    experimental_absoluteName?: boolean;
    name: string;
};
/** @internal */
export declare type Component = ComponentType<any> | ReturnType<typeof connectField>;
/** @internal */
export declare type ComponentDetector = (props: ReturnType<typeof useField>[0], uniforms: Context<UnknownObject>) => Component;
export declare function createAutoField(defaultComponentDetector: ComponentDetector): (({ experimental_absoluteName: absoluteName, ...rawProps }: AutoFieldProps) => ReactElement) & {
    componentDetectorContext: import("react").Context<ComponentDetector>;
    defaultComponentDetector: ComponentDetector;
};
//# sourceMappingURL=createAutoField.d.ts.map