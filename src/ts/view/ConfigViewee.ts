import Viewee from "view/Viewee";
import Config, { ConfigRss } from "handler/Config";
import Rss from "handler/Rss";

export default class ConfigViewee extends Viewee {
  private template: string;

  public async showConfigList(rssConfigs: ConfigRss[]): Promise<void> {
    this.template = this.template ? this.template : await this.fetchTemplate("configList");

    for (const config of rssConfigs) {
      let template = this.template;
      template = this.replace(template, "name", config.name);
      template = this.replace(template, "url", config.url);

      const $config = $(template).appendTo("#config");
      $config.find(".rss-config-delete").on("click", () => {
        const newConfig = rssConfigs.filter((value) => {
          return value.url === config.url ? false : true;
        });
        Config.set(Config.KEY_RSSLIST, JSON.stringify(newConfig));
        this.reload();
      });
    }
  }

  public subscribe(rssConfigs: ConfigRss[]): void {
    $("#config-input > button").on("click", async () => {
      const $input = $("#config-input > input");
      const url = $input.val();
      if (typeof url !== "string") {
        $input.val();
        return;
      }

      const rss = new Rss({name: "", url});
      try {
        const xml = await rss.fetch();
        if (!xml.title) {
          throw new Error();
        }
        const hasConfig = rssConfigs.some((value) => {
          return value.url === url;
        });
        if (!hasConfig) {
          rssConfigs.push({name: xml.title, url});
          Config.set(Config.KEY_RSSLIST, JSON.stringify(rssConfigs));
        }
        this.reload();
      } catch (e) {
        $("#config-input-error").text("エラー");
      }
    });
  }

  private reload(): void {
    location.reload();
  }
}
