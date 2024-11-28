import { UnknownObject } from './types';
export declare abstract class Bridge {
    constructor(...args: any[]);
    /**
     * Get an error for field `name` out of `error`. There is no standarized
     * format, but fields treat truthy values as a sign of being invalid. Fields
     * receive this as a `error` guaranteed prop.
     */
    getError(name: string, error: unknown): unknown;
    /**
     * Get an error message for field `name` out of `error`. If there is no error,
     * return an empty string. Fields receive this as a `errorMessage` guaranteed
     * prop.
     */
    getErrorMessage(name: string, error: unknown): string;
    /**
     * Get all error messages from `error`. Only `ErrorsField` make use of that
     * (in builtin themes).
     */
    getErrorMessages(error: unknown): string[];
    /**
     * Get internal field definition for field `name`. Fields receive this as a
     * `field` guaranteed prop. There is no standarized field format. Most bridges
     * use it as a common object, used in calculation of initial values, props,
     * and types.
     */
    getField(name: string): unknown;
    /**
     * Get initial value of field `name`. It is used as a default when no value is
     * set (e.g. the form is rendered with an empty `model`). Additionally,
     * `props` are this field instance props. If a field is rendered multiple
     * times, this function will be called multiple times, possibly with different
     * `props`.
     */
    getInitialValue(name: string): unknown;
    /**
     * Get props defined in schema for a field `name`. There are no required nor
     * banned fields, however properties like `required` are often available.
     */
    getProps(name: string): UnknownObject;
    /**
     * Get a list of subfields of field `name` or top-level fields, if no `name`
     * is passed.
     */
    getSubfields(name?: string): string[];
    /**
     * There is no standarized field type format. However, `AutoField` component
     * will work correctly only with standard JavaScript constructors, like
     * `String` or `Number`.
     */
    getType(name: string): unknown;
    /**
     * Get a validator function. The `options` here are from the `validator` prop
     * of the form. A validator function receives a model and returns an error or
     * a promise that will resolve (not reject!) with an error. If there is no
     * error, return (or resolve with) a `null` value instead.
     */
    getValidator(options?: unknown): (model: UnknownObject) => unknown;
}
//# sourceMappingURL=Bridge.d.ts.map