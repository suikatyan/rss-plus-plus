define(["require", "exports", "formatter/Formatter"], function (require, exports, Formatter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Rss2 extends Formatter_1.default {
        format($data) {
            return {
                title: this.getSiteTitle($data),
                link: this.getSiteLink($data),
                items: this.getItems($data)
            };
        }
        getSiteTitle($data) {
            return $data.find("channel > title").text();
        }
        getSiteLink($data) {
            return $data.find("channel > link").text();
        }
        getItems($data) {
            return this.formatItems($data.find("channel > item"));
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
            return $item.children("link").text();
        }
        getPageDescription($item) {
            return $item.children("description").text();
        }
        getPageDate($item) {
            const date = new Date($item.find("pubDate").text());
            return date ? new Date(date) : null;
        }
    }
    exports.default = Rss2;
});
