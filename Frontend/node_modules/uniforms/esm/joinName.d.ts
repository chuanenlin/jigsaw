/** @internal */
declare function escape(string: string): string;
/** @internal */
declare function unescape(string: string): string;
declare function joinNameImpl(flag: null, ...parts: unknown[]): string[];
declare function joinNameImpl(...parts: unknown[]): string;
export declare const joinName: typeof joinNameImpl & {
    escape: typeof escape;
    unescape: typeof unescape;
};
export {};
//# sourceMappingURL=joinName.d.ts.map