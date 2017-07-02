export interface ConfigRss {
  name: string;
  url: string;
}

export default class Config {
  static readonly KEY_RSSLIST = "rss_list";

  static get<T>(key: string): T | null {
    const config = localStorage.getItem(key);
    return config === null ? null : JSON.parse(config);
  }

  // もし設定値が取得出来なければ第2引数を返す
  static getWithAlt<T>(key: string, nullAlt: T): T {
    const config = Config.get<T>(key);
    return config === null ? nullAlt : config;
  }

  static set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
}
