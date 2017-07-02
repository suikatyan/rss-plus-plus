import Action from "action/Action";
import Config, { ConfigRss } from "handler/Config";
import ConfigViewee from "view/ConfigViewee";

export default class ConfigAction extends Action {
  static fileName: string = "config.html";

  public initialize(): void {
    const rssConfigs = Config.getWithAlt<ConfigRss[]>(Config.KEY_RSSLIST, []);
    const configViewee = new ConfigViewee();
    configViewee.showConfigList(rssConfigs);
    configViewee.subscribe(rssConfigs);
  }
}
