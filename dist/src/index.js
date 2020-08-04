"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.domcontext = void 0;
const jsdom_1 = require("jsdom");
const atob_1 = __importDefault(require("atob"));
const btoa_1 = __importDefault(require("btoa"));
const urlencode_1 = __importDefault(require("urlencode"));
const defaultOptions = {
    scriptUrl: 'https://127.0.0.1/main.js',
    url: 'https://127.0.0.1/',
    html: `
  <!DOCTYPE html>
  <html>
  <body>
  <script src="/main.js"></script>
  </body>
  </html>`,
    eval: function (src) {
        console.log('Evaling: ' + src);
        return eval(src);
    },
};
function domcontext(options = defaultOptions) {
    const dom = new jsdom_1.JSDOM(options.html, {
        url: options.url,
        contentType: 'text/html',
        storageQuota: 10000000,
    });
    const native = {
        undefined,
        atob: atob_1.default,
        btoa: btoa_1.default,
        encodeURIComponent: urlencode_1.default,
        decodeURIComponent: urlencode_1.default.decode,
        Array,
        String,
        RegExp,
        Math,
        Object,
        Symbol,
        Error,
        JSON,
        Date,
        parseInt,
        parseFloat,
        eval: options.eval,
    };
    const context = new Proxy(native, {
        get(target, prop) {
            if (prop in target)
                return target[prop];
            return dom.window[prop];
        },
        has(target, prop) {
            if (prop in target)
                return prop in target;
            return prop in dom.window;
        },
    });
    return context;
}
exports.domcontext = domcontext;
//# sourceMappingURL=index.js.map