# TypeScriptで学ぶデザインパターン「Abstract Factory」
## はじめに
本記事は、[Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)の各デザインパターンの題材を`TypeScript`で書いて、個人的な学びを書いています。誤り、勘違い等あれば指摘頂けると助かります。  
  
今回は、「Abstract Factory」です。  

## 「Abstract Factory」パターンとは？
インスタンスを生成するパターンの1つ。抽象的な工場や部品、製品を組み合わせて実装していく。具体的な実装には注目せず、インタフェース（API）に注目して実装していくパターン。

## どんな時に使うパターンなのか？
主に以下の用途で使われるケースが多いと思います。  
  
① 部品や製品の組み合わせが多い場合  
  
一気に完成させたインスタンスを作らずに、部品を組み上げてインスタンスを作るため、変更が発生しても部品の取替だけですむ。  

## クラス図
![AbstractFactoryClassDiagram](https://github.com/Kodak4400/DesignPattern/blob/master/AbstractFactory/AbstractFactory.png)

- Factory:関数（工場）を定義したクラス。newするだけで、関数（部品）、関数（製品）が用意される。サンプルコードでは、`Factory`が該当。
- ConcreateFactory:関数（工場）の具体的な内容を定義したクラス。サンプルコードでは、`ConcreateFactory`が該当
- Product1〜3:関数（部品、製品）を定義したクラス。サンプルコードでは、`Item`、`Link`、`Tray`、`Page`が該当。
- ConcreateProduct1〜3:関数（部品、製品）の具体的な内容を定義したクラス。サンプルコードでは、`ListLink`、`ListTray`、`ListPage`が該当。


## サンプルコード
```TypeScript:AbstractFactory.ts
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
```

```TypeScript:Main.ts
// 動作確認用

const factory: Factory = Factory.getInstance(new ConcreteFactory());

const us_yahoo = factory.createLink("Yahoo!", "http://www.yahoo.com/");
const jp_yahoo = factory.createLink("Yahoo!Japan", "http://www.yahoo.co.jp/");
const trayyahoo = factory.createTray("Link List!!");

trayyahoo.add(us_yahoo);
trayyahoo.add(jp_yahoo);

const page = factory.createPage("Yahoo!! Link Page", "1");
page.add(trayyahoo);
page.output();
```

```shell:動作確認結果
# 動作確認結果
$ ts-node sample.ts 
<h1>Yahoo!! Link Page</h1>
<p>Link List!!</p>
<ul>
<li><a href="http://www.yahoo.com/" alt="Yahoo!"></a></li>
<li><a href="http://www.yahoo.co.jp/" alt="Yahoo!Japan"></a></li>
</ul>
<a>Page: 1</a>>
```
  
ポイントは、`Factory`の関数（工場）の定義方法。  
あらかじめ抽象的な部品をココで用意しておかないと、後から部品を追加するのは工場自体修正しないといけなくなるため、修正が大変。  
逆に、すでに存在する抽象的な部品から具体的な部品を作るのは簡単。  
  
## おわりに
これ、ぜったいコードを読むのが大変なパターン・・・  

## 参考文献
- [Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)
