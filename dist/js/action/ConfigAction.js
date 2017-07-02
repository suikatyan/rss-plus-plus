define(["require", "exports", "action/Action", "handler/Config", "view/ConfigViewee"], function (require, exports, Action_1, Config_1, ConfigViewee_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ConfigAction extends Action_1.default {
        initialize() {
            const rssConfigs = Config_1.default.getWithAlt(Config_1.default.KEY_RSSLIST, []);
            const configViewee = new ConfigViewee_1.default();
            configViewee.showConfigList(rssConfigs);
            configViewee.subscribe(rssConfigs);
        }
    }
    ConfigAction.fileName = "config.html";
    exports.default = ConfigAction;
});
