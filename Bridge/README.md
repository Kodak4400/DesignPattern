# TypeScriptで学ぶデザインパターン「Bridge」
## はじめに
本記事は、[Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)の各デザインパターンの題材を`TypeScript`で書いて、個人的な学びを書いています。誤り、勘違い等あれば指摘頂けると助かります。  
  
今回は、「Bridge」です。  

## 「Bridge」パターンとは？
機能と実装を分けて考えるパターンの1つ。「継承を使って機能を追加する階層（機能のクラス階層）」と「抽象なものから実装する階層（実装のクラス階層）」とを分けて考える。

## どんな時に使うパターンなのか？
主に以下の用途で使われるケースが多いと思います。  
  
① 「機能のクラス階層」と「実装のクラス階層」がわかれているので、リファクタリングや機能追加が容易
  
## クラス図
![BridgeClassDiagram](https://github.com/Kodak4400/DesignPattern/blob/master/Bridge/Bridge.png)

- Abstraction:「機能のクラス階層」の最上位クラス。サンプルコードでは、`Display`が該当。
- RefinedAbstraction:`Abstraction`に機能を追加したクラス。サンプルコードでは、`CountDisplay`が該当。
- Implementer:「実装のクラス階層」の最上位クラス。サンプルコードでは、`DisplayImpl`が該当
- ConcreateImplementer:`Implementer`の具体的な内容を定義するクラス。サンプルコードでは、`StringDisplayImpl`が該当。

## サンプルコード
```TypeScript:Bridge.ts
abstract class DisplayImpl {
  public abstract rawOpen(): void;
  public abstract rawPrint(): void;
  public abstract rawClose(): void;
}

class StringDisplayImpl extends DisplayImpl {
  constructor(private str: string) {
    super();
  }
  public rawOpen() {
    this.printLine();
  }
  public rawPrint() {
    console.log(`| ${this.str} |`);
  }
  public rawClose() {
    this.printLine();
  }
  private printLine() {
    let line = '+ ';
    for (let i = 0; i < this.str.length; i++) {
      line += '-';
    }
    line += ' +';
    console.log(line)
  }
}

class Display {
  constructor(protected impl: DisplayImpl) {}
  public open() {
    this.impl.rawOpen();
  }
  public print() {
    this.impl.rawPrint();
  }
  public close() {
    this.impl.rawClose();
  }
  public display() {
    this.open();
    this.print();
    this.close();
  }
}

class CountDisplay extends Display {
  constructor(protected impl: DisplayImpl) {
    super(impl);
  }
  public multiDisplay(times: number) {
    this.open();
    for (let i = 0; i < times; i++) {
      this.print();
    }
    this.close();
  }
}
```

```TypeScript:Main.ts
// 動作確認用
const d1: Display = new Display(new StringDisplayImpl("Hello, Japan."))
const d2: Display = new CountDisplay(new StringDisplayImpl("Hello, World."))
const d3: CountDisplay = new CountDisplay(new StringDisplayImpl("Hello, Universe."))
d1.display();
d2.display();
d3.display();
d3.multiDisplay(5);
```

```shell:動作確認結果
# 動作確認結果
$ ts-node sample.ts 
+ ------------- +
| Hello, Japan. |
+ ------------- +
+ ------------- +
| Hello, World. |
+ ------------- +
+ ---------------- +
| Hello, Universe. |
+ ---------------- +
+ ---------------- +
| Hello, Universe. |
| Hello, Universe. |
| Hello, Universe. |
| Hello, Universe. |
| Hello, Universe. |
+ ---------------- +
```
  
ポイントは、`Abstraction`と`Implementor`橋渡しをしているところ。  
ここで「機能のクラス階層」と「実装のクラス階層」を分けています。機能クラスが大きくなってくると見通しが悪くなるので、注意が必要。

## おわりに
こうやって「機能のクラス階層」と「実装のクラス階層」を分けて考えることで、コードがキレイになりますね。
これは是非取り入れていきたい・・・

## 参考文献
- [Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)
