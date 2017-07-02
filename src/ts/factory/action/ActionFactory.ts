import Factory from "factory/Factory";
import Action from "action/Action";
import MainAction from "action/MainAction";
import ConfigAction from "action/ConfigAction";

export default class ActionFactory extends Factory {
  public generate(): Action | never {
    switch (location.pathname) {
      case "/main.html":
        return new MainAction();
      case "/config.html":
        return new ConfigAction();
    }

    throw new Error();
  }
}
