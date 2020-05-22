# TypeScriptで学ぶデザインパターン「Builder」
## はじめに
本記事は、[Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)の各デザインパターンの題材を`TypeScript`で書いて、個人的な学びを書いています。誤り、勘違い等あれば指摘頂けると助かります。  
  
今回は、「Builder」です。  

## 「Builder」パターンとは？
インスタンスから別のインスタンスを作成するパターン。

## どんな時に使うパターンなのか？
主に以下の用途で使われるケースが多いと思います。  

## クラス図
![BuilderClassDiagram](https://github.com/Kodak4400/DesignPattern/blob/master/Builder/Builder.png)

- Prototype: インスタンスの作り方を定義したクラス。サンプルコードでは、Factoryが該当。
- ConcreteProtoType: 生成したインスタンスの使い方を定義したクラス。サンプルコードでは、Productが該当。
- Manager: 具体的にインスタンスを生成するクラス名を定義したクラス。サンプルコードでは、concreteFactoryが該当。

## サンプルコード
```TypeScript:Builder.ts
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
```

```TypeScript:Main.ts
// 動作確認用
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
```

```shell:動作確認結果
# 動作確認結果
$ ts-node sample.ts 
==============================
Greeting
Hello. This class is follows
Director,TextBuilder,Builder
==============================
------------------------------
<h1>Greeting</h1>
<p>Hello. This class is follows</p>
<ul>
<li>Director</li>
<li>TextBuilder</li>
<li>Builder</li>
</ul>
------------------------------
```
  
ポイントは・・・  
  
## おわりに

## 参考文献
- [Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)
