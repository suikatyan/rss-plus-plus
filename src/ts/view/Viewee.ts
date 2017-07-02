import UrlResolver from "util/UrlResolver";

export default abstract class Viewee {
  protected async fetchTemplate(name: string): Promise<string> {
    const response = await fetch(this.getUrl(name));
    return await response.text();
  }

  protected getUrl(name: string) {
    return UrlResolver.resolve(`template/${name}.html`);
  }

  protected replace(template: string, target: string, content: string) {
    const regExp = new RegExp(`\{\{ ${target} \}\}`, "g");
    return template.replace(regExp, content);
  }
}
