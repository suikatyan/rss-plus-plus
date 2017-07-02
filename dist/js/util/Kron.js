define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Kron {
        constructor() {
            this.rules = new Set();
            this.start();
        }
        start() {
            setTimeout(() => {
                this.onTick();
                this.start();
            }, Kron.TICK_INTERVAL);
        }
        addRule(rule) {
            rule = this.updateNext(rule);
            this.rules.add(rule);
        }
        updateNext(rule) {
            rule.next = new Date(Date.now() + rule.interval);
            return rule;
        }
        onTick() {
            const now = new Date();
            for (const rule of this.rules) {
                if (!rule.next) {
                    return;
                }
                if (rule.next > now) {
                    return;
                }
                rule.action();
                this.updateNext(rule);
            }
        }
    }
    Kron.TICK_INTERVAL = 1000;
    exports.default = Kron;
});
