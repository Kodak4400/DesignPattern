abstract class Builder {
  public abstract makeTitle(title: string): void;
  public abstract makeString(str: string): void;
  public abstract makeItems(items: string[]): void;
  public abstract close(): void;
}

class TextBuilder extends Builder {
  constructor() {
    super();
  }
  private store: string[] = [];
  public makeTitle(title: string) {
    this.store.push("==============================");
    this.store.push(`${title}`);
  }
  public makeString(str: string) {
    this.store.push(`${str}`);
  }
  public makeItems(items: string[]) {
    this.store.push(items.join(","));
  }
  public close() {
    this.store.push("==============================");
  }
  public getResult(): string {
    return this.store.join("\n");
  }
}

class HtmlBuilder extends Builder {
  constructor() {
    super();
  }
  private store: string[] = [];
  public makeTitle(title: string) {
    this.store.push("------------------------------");
    this.store.push(`<h1>${title}</h1>`);
  }
  public makeString(str: string) {
    this.store.push(`<p>${str}</p>`);
  }
  public makeItems(items: string[]) {
    this.store.push("<ul>");
    items.forEach((item) => {
      this.store.push(`<li>${item}</li>`);
    });
    this.store.push("</ul>");
  }
  public close() {
    this.store.push("------------------------------");
  }
  public getResult(): string {
    return this.store.join("\n");
  }
}

class Director {
  constructor(private builder: Builder) {}
  public construct() {
    this.builder.makeTitle("Greeting");
    this.builder.makeString("Hello. This class is follows");
    this.builder.makeItems(["Director", "TextBuilder", "Builder"]);
    this.builder.close();
  }
}

const textBuilder: TextBuilder = new TextBuilder();
const textDirector: Director = new Director(textBuilder);
textDirector.construct();
const textResult: string = textBuilder.getResult();
console.log(textResult);

const htmlBuilder: HtmlBuilder = new HtmlBuilder();
const htmlDirector: Director = new Director(htmlBuilder);
htmlDirector.construct();
const htmlResult: string = htmlBuilder.getResult();
console.log(htmlResult);
