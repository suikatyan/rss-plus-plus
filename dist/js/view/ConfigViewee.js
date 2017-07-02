var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "view/Viewee", "handler/Config", "handler/Rss"], function (require, exports, Viewee_1, Config_1, Rss_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ConfigViewee extends Viewee_1.default {
        showConfigList(rssConfigs) {
            return __awaiter(this, void 0, void 0, function* () {
                this.template = this.template ? this.template : yield this.fetchTemplate("configList");
                for (const config of rssConfigs) {
                    let template = this.template;
                    template = this.replace(template, "name", config.name);
                    template = this.replace(template, "url", config.url);
                    const $config = $(template).appendTo("#config");
                    $config.find(".rss-config-delete").on("click", () => {
                        const newConfig = rssConfigs.filter((value) => {
                            return value.url === config.url ? false : true;
                        });
                        Config_1.default.set(Config_1.default.KEY_RSSLIST, JSON.stringify(newConfig));
                        this.reload();
                    });
                }
            });
        }
        subscribe(rssConfigs) {
            $("#config-input > button").on("click", () => __awaiter(this, void 0, void 0, function* () {
                const $input = $("#config-input > input");
                const url = $input.val();
                if (typeof url !== "string") {
                    $input.val();
                    return;
                }
                const rss = new Rss_1.default({ name: "", url });
                try {
                    const xml = yield rss.fetch();
                    if (!xml.title) {
                        throw new Error();
                    }
                    const hasConfig = rssConfigs.some((value) => {
                        return value.url === url;
                    });
                    if (!hasConfig) {
                        rssConfigs.push({ name: xml.title, url });
                        Config_1.default.set(Config_1.default.KEY_RSSLIST, JSON.stringify(rssConfigs));
                    }
                    this.reload();
                }
                catch (e) {
                    $("#config-input-error").text("エラー");
                }
            }));
        }
        reload() {
            location.reload();
        }
    }
    exports.default = ConfigViewee;
});
