import Formatter from "formatter/Formatter";
import { RssData, RssItem } from "handler/Rss";

export default class Atom extends Formatter {
  public format($data: JQuery): RssData {
    return {
      title: this.getSiteTitle($data),
      link: this.getSiteLink($data),
      items: this.getItems($data)
    };
  }

  private getSiteTitle($data: JQuery): string {
    return $data.find("feed > title").text();
  }

  private getSiteLink($data: JQuery): string {
    return $data.find("feed > link[rel='alternate']").attr("href");
  }

  private getItems($data: JQuery): RssItem[] {
    return this.formatItems($data.find("feed > entry"));
  }

  private formatItems($items: JQuery): RssItem[] {
    let output: RssItem[] = [];
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

  private getPageTitle($item: JQuery): string {
    return $item.children("title").text();
  }

  private getPageLink($item: JQuery): string {
    return $item.children("link").attr("href");
  }

  private getPageDescription($item: JQuery): string {
    return $item.children("summary").text();
  }

  private getPageDate($item: JQuery): Date | null {
    const date = $item.find("updated").text();
    return date ? new Date(date) : null;
  }
}
