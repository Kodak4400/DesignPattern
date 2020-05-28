abstract class Factory {
  constructor() {}
  private static instance: Factory;
  public static getInstance(className: Factory) {
    if (!Factory.instance) {
      Factory.instance = className;
    }
    return Factory.instance;
  }
  public abstract createLink(caption: string, url: string): Link;
  public abstract createTray(caption: string): Tray;
  public abstract createPage(title: string, author: string): Page;
}

abstract class Item {
  constructor(protected caption: string) {}
  public abstract makeHTML(): string;
}

abstract class Link extends Item {
  constructor(protected caption: string, protected url: string) {
    super(caption);
  }
}

abstract class Tray extends Item {
  constructor(protected caption: string) {
    super(caption);
  }
  protected tray: Item[] = [];
  public add(item: Item) {
    this.tray.push(item);
  }
  public output() {
    console.log(this.makeHTML());
  }
}

abstract class Page {
  constructor(protected title: string, protected author: string) {}
  protected content: Item[] = [];
  public add(item: Item) {
    this.content.push(item);
  }
  public output() {
    console.log(this.makeHTML());
  }
  public abstract makeHTML(): string;
}

// -----------------------------------------------------

class ConcreteFactory extends Factory {
  constructor() {
    super();
  }
  public createLink(caption: string, url: string) {
    return new ListLink(caption, url);
  }
  public createTray(caption: string) {
    return new ListTray(caption);
  }
  public createPage(title: string, author: string) {
    return new ListPage(title, author);
  }
}

class ListLink extends Link {
  public constructor(protected caption: string, protected url: string) {
    super(caption, url);
  }
  public makeHTML() {
    return `<a href="${this.url}" alt="${this.caption}"></a>`;
  }
}

class ListTray extends Tray {
  constructor(protected caption: string) {
    super(caption);
  }
  public makeHTML() {
    let buffer: string[] = [];
    buffer.push(`<p>${this.caption}</p>`);
    buffer.push("<ul>");
    this.tray.forEach((item) => {
      buffer.push(`<li>${item.makeHTML()}</li>`);
    });
    buffer.push("</ul>");
    return buffer.join("\n");
  }
}

class ListPage extends Page {
  constructor(protected title: string, protected pages: string) {
    super(title, pages);
  }
  public makeHTML() {
    let buffer: string[] = [];
    buffer.push(`<h1>${this.title}</h1>`);
    this.content.forEach((item) => {
      buffer.push(item.makeHTML());
    });
    buffer.push(`<a>Page: ${this.pages}</a>>`);
    return buffer.join("\n");
  }
}

const factory: Factory = Factory.getInstance(new ConcreteFactory());

const us_yahoo = factory.createLink("Yahoo!", "http://www.yahoo.com/");
const jp_yahoo = factory.createLink("Yahoo!Japan", "http://www.yahoo.co.jp/");
const trayyahoo = factory.createTray("Link List!!");

trayyahoo.add(us_yahoo);
trayyahoo.add(jp_yahoo);
// trayyahoo.output();

const page = factory.createPage("Yahoo!! Link Page", "1");
page.add(trayyahoo);
page.output();
