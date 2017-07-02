import Action from "action/Action";
import ConfigAction from "action/ConfigAction";
import Config, { ConfigRss } from "handler/Config";
import Rss from "handler/Rss";
import Kron from "util/Kron";
import RssViewee from "view/RssViewee";
import UrlResolver from "util/UrlResolver";

export default class MainAction extends Action {
  static fileName: string = "main.html";

  private rssList: Set<Rss> = new Set;
  private kron: Kron = new Kron();

  public initialize(): void {
    const rssConfigs = Config.getWithAlt<ConfigRss[]>(Config.KEY_RSSLIST, []);
    // const rssConfigs = [
    //   {name: "hoge", url: "http://feeds.feedburner.com/hatena/b/hotentry"},
    //   {name: "hoge", url: "http://www.nicovideo.jp/newarrival?rss=2.0&lang=ja-jp"},
    //   {name: "hoge", url: "http://itlifehack.jp/atom.xml"}
    // ];

    if (rssConfigs.length === 0) {
      location.href = UrlResolver.resolve(ConfigAction.fileName);
    }

    for (const config of rssConfigs) {
      this.rssList.add(new Rss(config));
    }

    this.kron.addRule({ interval: 5 * 60 * 1000, action: () => {
      this.excute();
    }});

    this.excute();
  }

  private async excute(): Promise<void> {
    let output = [];
    for (const rss of this.rssList) {
      const xml = await rss.fetch();
      for (const item of xml.items) {
        output.push(Object.assign(item, {siteTitle: xml.title}));
      }
    }

    output.sort((a, b) => {
      const aDate = a.date ? a.date : a.fetched;
      const bDate = b.date ? b.date : b.fetched;
      if (!(aDate instanceof Date) || !(bDate instanceof Date)) {
        return 0;
      }
      if( aDate < bDate ) {
        return -1;
      }
      if( aDate > bDate ) {
        return 1;
      }
      return 0;
    });

    const rssViewee = new RssViewee();
    await rssViewee.push(output);
    rssViewee.removeExtra();
    rssViewee.scroll();
    rssViewee.updateDate();
  }
}
