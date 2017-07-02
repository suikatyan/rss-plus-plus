define(["require", "exports", "factory/Factory", "action/MainAction", "action/ConfigAction"], function (require, exports, Factory_1, MainAction_1, ConfigAction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ActionFactory extends Factory_1.default {
        generate() {
            switch (location.pathname) {
                case "/main.html":
                    return new MainAction_1.default();
                case "/config.html":
                    return new ConfigAction_1.default();
            }
            throw new Error();
        }
    }
    exports.default = ActionFactory;
});
