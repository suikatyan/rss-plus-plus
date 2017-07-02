var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "factory/rss/RssFactory"], function (require, exports, RssFactory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Rss {
        constructor({ name, url }) {
            this.isInitialized = false;
            [this.name, this.url] = [name, url];
        }
        fetch() {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield fetch(this.url);
                this.raw = yield response.text();
                this.data = this.comvert(this.raw);
                this.isInitialized = true;
                return this.data;
            });
        }
        comvert(data) {
            const $data = $((new DOMParser()).parseFromString(data, "text/xml"));
            this.rssVersion = this.guessVersion($data);
            return (this.getFormatter()).format($data);
        }
        guessVersion($data) {
            if ($data.find("rss").attr("version") === "2.0") {
                return 1;
            }
            if ($data.find("entry").length) {
                return 2;
            }
            return 0;
        }
        getFormatter() {
            return (new RssFactory_1.default()).generate(this.rssVersion);
        }
    }
    exports.default = Rss;
});
