# TypeScriptで学ぶデザインパターン「Interpreter」
## はじめに
本記事は、[Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)の各デザインパターンの題材を`TypeScript`で書いて、個人的な学びを書いています。誤り、勘違い等あれば指摘頂けると助かります。  
  
今回は、「Interpreter」です。  

## 「Interpreter」パターンとは？
クラスで表現するパターンの1つ。「ミニ言語」と呼ばれる文法規則を作成して、それを用いてプログラムを作成していくパターンです。

## どんな時に使うパターンなのか？
主に以下の用途で使われるケースが多いと思います。  
  
① なにかしら法則を持った形で処理をさせたい場合

とはいつつ、たぶんTypeScriptだと使うケースがないかも・・・  
  
BNF(Backs Naur Form)つまり、文法を表現する表記法。今回は「ミニ言語」を用いてプログラムを書きます。  
「ミニ言語」と「ミニ言語を解析する」プログラムを用意して、修正箇所を「ミニ言語」で止めることができるパターンです。  

## クラス図
![InterpreterClassDiagram](https://github.com/Kodak4400/DesignPattern/blob/master/Interpreter/Interpreter.png)

- Context: インタプリタが構文解析を行うための情報を提供するクラス。サンプルコードでは、`Context`が該当。
- AbstractExpression: 共通のインタフェースを定義するクラス。サンプルコードでは、`AbstractEcptrddion`が該当。
- TerminalExpression: BNFのターミナル（終端記号）に対応するクラス。サンプルコードでは、`TerminalExpression`が該当。
- NonTerminalExpression: BNFのノンターミナル（非終端記号）に対応するクラス。サンプルコードでは、`NoterminalExpression`、`CommandParse`が該当。
- Client: `TerminalExpression`や`NonTerminalExpression`を呼び出すクラス。`Main.ts`が該当。

## サンプルコード
```TypeScript:Interpreter.ts
class Context {
  constructor(private text: string[]) {}
  private pointer = 0;
  public getInfoToInterpret() {
    // ミニ言語の構造解析
  }
  public next() {
    if (this.pointer < this.text.length) {
      this.pointer++;
    } else {
      console.log("Error: No Text Data.");
    }
  }
  public skip(msg: string) {
    if (msg === this.text[this.pointer]) {
      this.next();
    } else {
      console.log("Warning: No matches found");
    }
  }
  public current() {
    return this.text[this.pointer];
  }
  public show() {
    console.log(this.text[this.pointer]);
  }
}

abstract class AbstractEcptrddion {
  constructor() {}
  abstract interpret(context: Context): void;
}

class NoterminalExpression extends AbstractEcptrddion {
  constructor() {
    super();
  }
  public interpret(context: Context) {
    context.skip("Start");
    const commandParse = new CommandParse();
    commandParse.interpret(context);
  }
}

class CommandParse extends AbstractEcptrddion {
  constructor() {
    super();
  }
  public interpret(context: Context) {
    while (context.current()) {
      if (context.current() === "End") {
        const terminal = new TerminalExpression();
        terminal.interpret(context);
      } else {
        context.show();
        context.next();
      }
    }
  }
}

class TerminalExpression extends AbstractEcptrddion {
  constructor() {
    super();
  }
  public interpret(context: Context) {
    context.skip("End");
    console.log("=== 終了 ===")
  }
}
```

```TypeScript:Main.ts
// 動作確認用
let text1 = ["Start", "End"];
const node1: AbstractEcptrddion = new NoterminalExpression();
node1.interpret(new Context(text1));

let text2 = ["Start", "1", "2", "End"];
const node2: AbstractEcptrddion = new NoterminalExpression();
node2.interpret(new Context(text2));
```

```shell:動作確認結果
# 動作確認結果
$ ts-node sample.ts 
=== 終了 ===
1
2
=== 終了 ===
```
  
今回は、解析してコンソールに表示して終わっています。さらに解析結果を使ってなにかしら処理を加えたい場合は、新しいクラス（「ミニ言語」クラス）を用意して`CommandParse`に処理を加えていきます。

## おわりに
上にも書きましたが、TypeScriptだと多分使わないパターンだと思います。  

## 参考文献
- [Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)
