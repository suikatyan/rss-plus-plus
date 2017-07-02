import Factory from "factory/Factory";
import { RssVersion } from "handler/Rss";
import Formatter from "formatter/Formatter";
import Rss1 from "formatter/rss/Rss1";
import Rss2 from "formatter/rss/Rss2";
import Atom from "formatter/rss/Atom";

export default class RssFactory extends Factory {
  public generate(version: RssVersion): Formatter {
    switch (version) {
      case RssVersion.One:
        return new Rss1();
      case RssVersion.Two:
        return new Rss2();
      case RssVersion.Atom:
        return new Atom();
    }
  }
}
