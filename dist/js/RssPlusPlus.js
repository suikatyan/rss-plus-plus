var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "handler/Rss", "util/Kron", "view/RssViewee"], function (require, exports, Rss_1, Kron_1, RssViewee_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RssPlusPlus {
        constructor() {
            this.rssList = new Set;
            this.kron = new Kron_1.default();
        }
        initialize() {
            const rssConfigs = [
                { name: "hoge", url: "http://feeds.feedburner.com/hatena/b/hotentry" },
                { name: "hoge", url: "http://www.nicovideo.jp/newarrival?rss=2.0&lang=ja-jp" },
                { name: "hoge", url: "http://itlifehack.jp/atom.xml" }
            ];
            if (rssConfigs.length === 0) {
                location.href = "";
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
                const rssViewee = new RssViewee_1.default();
                yield rssViewee.push(output);
                rssViewee.removeExtra();
                rssViewee.scroll();
                rssViewee.updateDate();
            });
        }
    }
    exports.default = RssPlusPlus;
});
