define(["require", "exports", "factory/Factory", "formatter/rss/Rss1", "formatter/rss/Rss2", "formatter/rss/Atom"], function (require, exports, Factory_1, Rss1_1, Rss2_1, Atom_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RssFactory extends Factory_1.default {
        generate(version) {
            switch (version) {
                case 0:
                    return new Rss1_1.default();
                case 1:
                    return new Rss2_1.default();
                case 2:
                    return new Atom_1.default();
            }
        }
    }
    exports.default = RssFactory;
});
