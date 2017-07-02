import Formatter from "formatter/Formatter";
import { RssData, RssItem } from "handler/Rss";

export default class Rss1 extends Formatter {
  public format($data: JQuery): RssData {
    return {
      title: this.getSiteTitle($data),
      link: this.getSiteLink($data),
      items: this.getItems($data)
    };
  }

  private getSiteTitle($data: JQuery): string {
    return $data.find("channel > title").text();
  }

  private getSiteLink($data: JQuery): string {
    return $data.find("channel > link").text();
  }

  private getItems($data: JQuery): RssItem[] {
    return this.formatItems($data.find("item"));
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
    return $item.children("link").text();
  }

  private getPageDescription($item: JQuery): string {
    return $item.children("description").text();
  }

  private getPageDate($item: JQuery): Date | null {
    const date =  $item.html().match(/<dc:date[^>]+>([\s\S]+?)<\/dc:date>/m);

    return date ? new Date(date[1]) : null;
  }
}
