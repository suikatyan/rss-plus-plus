define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Config {
        static get(key) {
            const config = localStorage.getItem(key);
            return config === null ? null : JSON.parse(config);
        }
        static getWithAlt(key, nullAlt) {
            const config = Config.get(key);
            return config === null ? nullAlt : config;
        }
        static set(key, value) {
            localStorage.setItem(key, value);
        }
    }
    Config.KEY_RSSLIST = "rss_list";
    exports.default = Config;
});
