var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "util/UrlResolver"], function (require, exports, UrlResolver_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Viewee {
        fetchTemplate(name) {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield fetch(this.getUrl(name));
                return yield response.text();
            });
        }
        getUrl(name) {
            return UrlResolver_1.default.resolve(`template/${name}.html`);
        }
        replace(template, target, content) {
            const regExp = new RegExp(`\{\{ ${target} \}\}`, "g");
            return template.replace(regExp, content);
        }
    }
    exports.default = Viewee;
});
