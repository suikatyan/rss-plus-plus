var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "view/Viewee"], function (require, exports, Viewee_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RssViewee extends Viewee_1.default {
        push(data) {
            return __awaiter(this, void 0, void 0, function* () {
                let items = Array.isArray(data) ? data : [data];
                this.template = this.template ? this.template : yield this.fetchTemplate("rss");
                for (const item of items) {
                    if ($(`.item > a[href='${item.link}']`).length) {
                        continue;
                    }
                    let template = this.template;
                    template = this.replace(template, "title", item.title);
                    template = this.replace(template, "siteTitle", item.siteTitle);
                    template = this.replace(template, "link", item.link);
                    const $item = $(template).appendTo("#main");
                    $item.on("mousemove", () => {
                        $item.removeClass("unread");
                    });
                }
            });
        }
        removeExtra() {
            const itemCount = $(".item").length;
            if (itemCount <= RssViewee.MAX_ITEM_COUNT) {
                return;
            }
            for (let i = RssViewee.MAX_ITEM_COUNT; i < itemCount; i++) {
                $(".item").eq(0).remove();
            }
        }
        scroll() {
            const $document = $(document);
            $document.scrollTop($document.height());
        }
        zero(number, length = 2) {
            const string = number.toString();
            if (string.length >= length) {
                return string;
            }
            return ("0".repeat(length) + string).slice(length * -1);
        }
        getDateString(date) {
            const ymd = `${this.zero(date.getFullYear())}/${this.zero(date.getMonth())}/${this.zero(date.getDate())}`;
            const hms = `${this.zero(date.getHours())}:${this.zero(date.getMinutes())}:${this.zero(date.getSeconds())}`;
            return `${ymd} ${hms}`;
        }
        updateDate() {
            $("#update-time").text(`最終更新日時：${this.getDateString(new Date())}`);
        }
    }
    RssViewee.MAX_ITEM_COUNT = 200;
    exports.default = RssViewee;
});
