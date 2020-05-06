abstract class Builder {
  public abstract makeTitle(title: string): void;
  public abstract makeString(str: string): void;
  public abstract makeItems(items: string[]): void;
  public abstract close(): void;
}

class TextBuilder extends Builder {
  constructor(private buffer: string[] = []) {
    super();
  }

  public makeTitle(title: string) {
    this.buffer.push("==============================");
    this.buffer.push(`${title}`);
  }

  public makeString(str: string) {
    this.buffer.push(`${str}`);
  }

  public makeItems(items: string[]) {
    this.buffer.push(items.join(","));
  }

  public close() {
    this.buffer.push("==============================");
  }

  public getResult(): string {
    return this.buffer.join("\n");
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

class HTMLBuilder extends Builder {
  constructor(private buffer: string[] = []) {
    super();
  }

  public makeTitle(title: string) {
    this.buffer.push("------------------------------");
    this.buffer.push(`<h1>${title}</h1>`);
  }

  public makeString(str: string) {
    this.buffer.push(`<p>${str}</p>`);
  }

  public makeItems(items: string[]) {
    this.buffer.push("<ul>");
    items.forEach((item) => {
      this.buffer.push(`<li>${item}</li>`);
    });
    this.buffer.push("</ul>");
  }

  public close() {
    this.buffer.push("------------------------------");
  }

  public getResult(): string {
    return this.buffer.join("\n");
  }
}

const textBuilder: TextBuilder = new TextBuilder();
const textDirector: Director = new Director(textBuilder);
textDirector.construct();
let textResult: string = textBuilder.getResult();
console.log(textResult);

const htmlbuilder: HTMLBuilder = new HTMLBuilder();
const htmlDirector: Director = new Director(htmlbuilder);
htmlDirector.construct();
let htmlResult: string = htmlbuilder.getResult();
console.log(htmlResult);
