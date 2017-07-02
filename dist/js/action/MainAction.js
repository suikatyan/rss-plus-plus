var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "action/Action", "action/ConfigAction", "handler/Config", "handler/Rss", "util/Kron", "view/RssViewee", "util/UrlResolver"], function (require, exports, Action_1, ConfigAction_1, Config_1, Rss_1, Kron_1, RssViewee_1, UrlResolver_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MainAction extends Action_1.default {
        constructor() {
            super(...arguments);
            this.rssList = new Set;
            this.kron = new Kron_1.default();
        }
        initialize() {
            const rssConfigs = Config_1.default.getWithAlt(Config_1.default.KEY_RSSLIST, []);
            if (rssConfigs.length === 0) {
                location.href = UrlResolver_1.default.resolve(ConfigAction_1.default.fileName);
            }
            for (const config of rssConfigs) {
                this.rssList.add(new Rss_1.default(config));
            }
            this.kron.addRule({ interval: 5 * 60 * 1000, action: () => {
                    this.excute();
                } });
            this.excute();
        }
        excute() {
            return __awaiter(this, void 0, void 0, function* () {
                let output = [];
                for (const rss of this.rssList) {
                    const xml = yield rss.fetch();
                    for (const item of xml.items) {
                        output.push(Object.assign(item, { siteTitle: xml.title }));
                    }
                }
                output.sort((a, b) => {
                    const aDate = a.date ? a.date : a.fetched;
                    const bDate = b.date ? b.date : b.fetched;
                    if (!(aDate instanceof Date) || !(bDate instanceof Date)) {
                        return 0;
                    }
                    if (aDate < bDate) {
                        return -1;
                    }
                    if (aDate > bDate) {
                        return 1;
                    }
                    return 0;
                });
                const rssViewee = new RssViewee_1.default();
                yield rssViewee.push(output);
                rssViewee.removeExtra();
                rssViewee.scroll();
                rssViewee.updateDate();
            });
        }
    }
    MainAction.fileName = "main.html";
    exports.default = MainAction;
});
