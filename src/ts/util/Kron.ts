interface Rule {
  readonly interval: number; // ミリ秒単位
  readonly action: () => void;
  next?: Date;
}

export default class Kron {
  static readonly TICK_INTERVAL = 1000;
  private rules: Set<Rule> = new Set();

  constructor() {
    this.start();
  }

  private start() {
    setTimeout(() => {
      this.onTick();
      this.start();
    }, Kron.TICK_INTERVAL);
  }

  public addRule(rule: Rule): void {
    rule = this.updateNext(rule);
    this.rules.add(rule);
  }

  private updateNext(rule: Rule): Rule {
    rule.next = new Date(Date.now() + rule.interval);
    return rule;
  }

  private onTick(): void {
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
