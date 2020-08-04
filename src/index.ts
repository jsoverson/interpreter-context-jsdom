import {JSDOM} from 'jsdom';
import atob from 'atob';
import btoa from 'btoa';
import urlencode from 'urlencode';

export interface Options {
  html: string;
  scriptUrl: string;
  url: string;
  eval: (src: string) => any;
}

const defaultOptions: Options = {
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

export function domcontext(options = defaultOptions) {
  const dom = new JSDOM(options.html, {
    url: options.url,
    contentType: 'text/html',
    storageQuota: 10000000,
  });
  const native = {
    undefined,
    atob,
    btoa,
    encodeURIComponent: urlencode,
    decodeURIComponent: urlencode.decode,
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
    get(target: any, prop: string) {
      if (prop in target) return target[prop];
      return dom.window[prop];
    },
    has(target: any, prop: string) {
      if (prop in target) return prop in target;
      return prop in dom.window;
    },
  });
  return context;
}
