# TypeScriptで学ぶデザインパターン「Template Method」
## はじめに
本記事は、[Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)の各デザインパターンの題材を`TypeScript`で書いて、個人的な学びを書いています。誤り、勘違い等あれば指摘頂けると助かります。  
  
今回は、「Template Method」です。  

## 「Template Method」パターンとは？
テンプレートの機能を持つパターンの1つ。スーパークラスで処理の枠組みを定めて、サブクラスでその具体的内容を定めるデザインパターンです。  

## どんな時に使うパターンなのか？
主に以下の用途で使われるケースが多いと思います。  

①：同じような処理をするClassを複数用意したい。

どのような関数や変数が必要なのかをスーパークラスに定義しておきます。  
具体的な実装はサブクラスに定義します。  

このスーパークラスをテンプレートとします。  
このテンプレートを用意しておくことで、同じような処理をするClassを複数用意したい場合、関数の定義漏れや共通処理を纏めておくことができます。  

## クラス図
![TemplateMethodClassDiagram](https://github.com/Kodak4400/DesignPattern/blob/master/TemplateMethod/TemplateMethod.png)


- AbstractClass：テンプレートです。サンプルコードでは、AbstractDisplayが該当。
- ConcreteClass1：テンプレートで定義した具体的な処理を実装します。サンプルコードでは、CharDisplayやStringDisplayが該当。
- ConcreteClass2：同上。

## サンプルコード
```TypeScript:TemplateMethod.ts
// スーパークラス（テンプレート）
abstract class AbstractDisplay {
  constructor() {}
  public abstract open(): void;
  public abstract print(): void;
  public abstract close(): void;
  public display() {
    this.open();
    for (let i = 0; i < 2; i++) {
      this.print();
    }
    this.close();
  }
}

// テンプレートを使ったクラス（その①）
class CharDisplay extends AbstractDisplay {
  constructor(private ch: string) {
    super();
  }
  public open() {
    console.log("<<");
  }
  public print() {
    console.log(this.ch);
  }
  public close() {
    console.log(">>");
  }
}

// テンプレートを使ったクラス（その②）
class StringDisplay extends AbstractDisplay {
  private width: number;
  constructor(private str: string) {
    super();
    this.width = str.length;
  }
  public open() {
    this.printLine();
  }
  public print() {
    console.log(`|${this.str}|`);
  }
  public close() {
    this.printLine();
  }
  private printLine() {
    let frame = "+";
    for (let i = 0; i < this.width; i++) {
      frame += "-";
    }
    frame += "+";
    console.log(frame);
  }
}
```

```TypeScript:Main.ts
// 動作確認用
const d1: AbstractDisplay = new CharDisplay("H");
const d2: AbstractDisplay = new StringDisplay("Hello, world.");
const d3: AbstractDisplay = new StringDisplay("hogefuga");

d1.display();
d2.display();
d3.display();
```

```shell:動作確認結果
# 動作確認結果
$ ts-node sample.ts 
<<
H
H
>>
+-------------+
|Hello, world.|
|Hello, world.|
+-------------+
+--------+
|hogefuga|
|hogefuga|
+--------+
$
```
  
ポイントは、スーパークラスに必要な機能を纏めてしまうことです。  
  
ただし、なんでもかんでもスーパークラスに機能を纏めてしまうのはNG。  
また、スーパークラスに実装した共通機能をサブクラス側でオーバーライドしてしまうのも、あまりオススメできません。  
名前の通りテンプレートなので、魔改造せずにシンプルに使うのが良いのだと思います。  

## おわりに
「Template Method」はデザインパターンの中でも大変よく使われる＆分かりやすい分類に入るのではないでしょうか。  
「継承の使い方」に注目したデザインパターンなので、使える場面も多そうです。  

## 参考文献
- [Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)
