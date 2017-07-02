import { ConfigRss } from "handler/Config";
import Formatter from "formatter/Formatter";
import RssFactory from "factory/rss/RssFactory";


export const enum RssVersion {
  One, // 1.0
  Two, // 2.0
  Atom // Atom
}

export interface RssData {
  // サイト名
  // 1.0: $("channel > title"), 2.0: $("channel > title"), Atom: $("feed > title")
  readonly title: string;

  // サイトURL
  // 1.0: $("channel > link"), 2.0: $("channel > link"), Atom: $("feed > link[rel='alternate']").attr("href")
  readonly link: string;

  // アイテム
  // 1.0: $("item"), 2.0: $("channel > item"), Atom: $("feed > entry")
  readonly items: RssItem[];
}

export interface RssItem {
  // ページ名
  // 1.0: $("title"), 2.0: $("title"), Atom: $("title")
  readonly title: string;

  // ページURL
  // 1.0: $("link"), 2.0: $("link"), Atom: $("id")
  readonly link: string;

  // ページ内容
  // 1.0: $("description"), 2.0: $("description"), Atom: $("summary")
  readonly description: string;

  // 公開日・更新日
  // 1.0: $("dc:date").text().match(/<dc:date([\s\S]+?)<\/dc:date>/)の$1, 2.0: $("pubDate"), Atom: $("updated")
  readonly date: Date | null;

  // 取得日
  readonly fetched: Date;
}

export default class Rss {
  private isInitialized = false;
  private name: string;
  private url: string;
  private raw: string;
  private rssVersion: RssVersion;
  private data: RssData;

  constructor({ name, url }: ConfigRss) {
    [this.name, this.url] = [name, url];
  }

  public async fetch(): Promise<RssData> {
    const response = await fetch(this.url);
    this.raw = await response.text();
    this.data = this.comvert(this.raw);
    this.isInitialized = true;
    return this.data;
  }

  private comvert(data: string): RssData {
    const $data = $((new DOMParser()).parseFromString(data, "text/xml"));
    this.rssVersion = this.guessVersion($data);
    return (this.getFormatter()).format($data);
  }

  private guessVersion($data: JQuery): RssVersion {
    if ($data.find("rss").attr("version") === "2.0") {
      return RssVersion.Two;
    }

    if ($data.find("entry").length) {
      return RssVersion.Atom;
    }

    return RssVersion.One;
  }

  private getFormatter(): Formatter {
    return (new RssFactory()).generate(this.rssVersion);
  }
}
