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

class ListFactory extends Factory {
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
    return `url=${this.url} caption=${this.caption}`;
  }
}

class ListTray extends Tray {
  constructor(protected caption: string) {
    super(caption);
  }
  public makeHTML() {
    let buffer: string[] = [];
    console.log(this.caption);
    this.tray.forEach((item) => {
      buffer.push(item.makeHTML());
    });
    return buffer.join("\n");
  }
}

class ListPage extends Page {
  constructor(protected title: string, protected author: string) {
    super(title, author);
  }
  public makeHTML() {
    let buffer: string[] = [];
    buffer.push(this.title);
    buffer.push(this.author);
    return buffer.join(",");
  }
}

const factory: Factory = Factory.getInstance(new ListFactory());

const us_yahoo = factory.createLink("Yahoo!", "http://www.yahoo.com/");
const jp_yahoo = factory.createLink("Yahoo!Japan", "http://www.yahoo.co.jp/");
const trayyahoo = factory.createTray("Yahoo!");

trayyahoo.add(us_yahoo);
trayyahoo.add(jp_yahoo);
trayyahoo.output();
let page = factory.createPage("LinkPage", "page");
page.add(trayyahoo);
page.output();
