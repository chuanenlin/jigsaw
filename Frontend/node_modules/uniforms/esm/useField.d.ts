import { GuaranteedProps, UnknownObject } from './types';
export declare function useField<Props extends Record<string, any>, Value = Props['value'], Model extends UnknownObject = UnknownObject>(fieldName: string, props: Props, options?: {
    absoluteName?: boolean;
    initialValue?: boolean;
}): [GuaranteedProps<Value> & Props, import("./types").Context<Model>];
//# sourceMappingURL=useField.d.ts.map