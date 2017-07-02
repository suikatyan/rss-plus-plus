define(["require", "exports", "formatter/Formatter"], function (require, exports, Formatter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Rss1 extends Formatter_1.default {
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
            return this.formatItems($data.find("item"));
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
            const date = $item.html().match(/<dc:date[^>]+>([\s\S]+?)<\/dc:date>/m);
            return date ? new Date(date[1]) : null;
        }
    }
    exports.default = Rss1;
});
