import Viewee from "view/Viewee";
import { RssItem } from "handler/rss";

interface OutputItem extends RssItem {
  siteTitle: string;
}

export default class RssViewee extends Viewee {
  static MAX_ITEM_COUNT = 4000;
  private template: string;

  public async push(data: OutputItem | OutputItem[]): Promise<void> {
    let items= Array.isArray(data) ? data : [data];
    this.template = this.template ? this.template : await this.fetchTemplate("rss");

    for (const item of items) {
      if ($(`.item > a[href='${item.link}']`).length) {
        continue;
      }

      let template = this.template;
      template = this.replace(template, "title", item.title);
      template = this.replace(template, "siteTitle", item.siteTitle);
      template = this.replace(template, "link", item.link);
      template = this.replace(template, "hatenaLink", `http://b.hatena.ne.jp/entry/${item.link}`);
      // template = this.replace(
      //   template,
      //   "hatenaCount",
      //   await (await fetch(`http://api.b.st-hatena.com/entry.count?url=${item.link}`)).text()
      // );


      const $item = $(template).appendTo("#main");
      $item.on("mousemove", () => {
        $item.removeClass("unread");
      });
    }
  }

  public removeExtra(): void {
    const itemCount = $(".item").length;
    if (itemCount <= RssViewee.MAX_ITEM_COUNT) {
      return;
    }

    for (let i = RssViewee.MAX_ITEM_COUNT; i < itemCount ; i++) {
      $(".item").eq(0).remove();
    }
  }

  public scroll(): void {
    // const $window = $(window);
    // const $document = $(document);
    // if ($document.scrollTop() + $window.height() === $document.height()) {
    //   $document.scrollTop($document.height());
    // }
    const $document = $(document);
    $document.scrollTop($document.height());
  }

  private zero(number: number, length = 2): string {
    const string = number.toString();
    if (string.length >= length) {
      return string;
    }
    return ("0".repeat(length) + string).slice(length * -1);
  }

  private getDateString(date: Date): string {
    const ymd =  `${this.zero(date.getFullYear())}/${this.zero(date.getMonth())}/${this.zero(date.getDate())}`;
    const hms = `${this.zero(date.getHours())}:${this.zero(date.getMinutes())}:${this.zero(date.getSeconds())}`;

    return `${ymd} ${hms}`;
  }

  public updateDate(): void {
    $("#update-time").text(`最終更新日時：${this.getDateString(new Date())}`);
  }
}
