export interface Options {
    html: string;
    scriptUrl: string;
    url: string;
    eval: (src: string) => any;
}
export declare function context(options?: Options): any;
