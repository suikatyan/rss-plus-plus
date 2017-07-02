define(["require", "exports", "formatter/Formatter"], function (require, exports, Formatter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Atom extends Formatter_1.default {
        format($data) {
            return {
                title: this.getSiteTitle($data),
                link: this.getSiteLink($data),
                items: this.getItems($data)
            };
        }
        getSiteTitle($data) {
            return $data.find("feed > title").text();
        }
        getSiteLink($data) {
            return $data.find("feed > link[rel='alternate']").attr("href");
        }
        getItems($data) {
            return this.formatItems($data.find("feed > entry"));
        }
        formatItems($items) {
            let output = [];
            for (const item of Array.from($items)) {
                const $item = $(item);
                output.push({
                    title: this.getPageTitle($item),
                    link: this.getPageLink($item),
                    description: this.getPageDescription($item),
                    date: this.getPageDate($item),
                    fetched: new Date()
                });
            }
            return output;
        }
        getPageTitle($item) {
            return $item.children("title").text();
        }
        getPageLink($item) {
            return $item.children("id").text();
        }
        getPageDescription($item) {
            return $item.children("summary").text();
        }
        getPageDate($item) {
            const date = $item.find("updated").text();
            return date ? new Date(date) : null;
        }
    }
    exports.default = Atom;
});
