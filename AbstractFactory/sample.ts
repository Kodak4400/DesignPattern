abstract class Factory {
  private static instance: Factory;

  constructor() {}

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
  protected tray: Item[];
  constructor(protected caption: string) {
    super(caption);
  }

  public add(item: Item) {
    console.log(item)
    this.tray.push(item);
  }
}

abstract class Page {
  protected content: Item[] = [];
  constructor(protected title: string, protected author: string) {}

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

class ListPage extends Page {
  constructor(protected title: string, protected author: string) {
    super(title, author);
  }

  public makeHTML() {
    let buffer: string[] = [];
    buffer.push(this.title);
    buffer.push(this.author);
    return buffer.join("/n");
  }
}

class ListTray extends Tray {
  constructor(protected caption: string) {
    super(caption);
  }

  public makeHTML() {
    let buffer: string[] = [];
    buffer.push(this.caption);
    return buffer.join("/n");
  }
}

const factory: Factory = Factory.getInstance(new ListFactory)

let us_yahoo = factory.createLink("Yahoo!", "http://www.yahoo.com/");
// let jp_yahoo = factory.createLink("Yahoo!Japan", "http://www.yahoo.co.jp/");

let trayyahoo = factory.createTray("Yahoo!");
trayyahoo.add(us_yahoo);
// trayyahoo.add(jp_yahoo);

console.log(trayyahoo.makeHTML())

let page = factory.createPage("LinkPage", "page");
page.add(trayyahoo);
page.output();
