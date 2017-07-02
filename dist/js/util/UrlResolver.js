define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UrlResolver {
        static resolve(path) {
            return chrome.extension.getURL(path);
        }
    }
    exports.default = UrlResolver;
});
