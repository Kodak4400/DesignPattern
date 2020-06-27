# TypeScriptで学ぶデザインパターン「Command」
## はじめに
本記事は、[Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)の各デザインパターンの題材を`TypeScript`で書いて、個人的な学びを書いています。誤り、勘違い等あれば指摘頂けると助かります。  
  
今回は、「Command」です。  

## 「Command」パターンとは？
クラスで表現するパターンの1つ。インスタンスを「もの」として扱い、そのインスタンスに対して処理をしろと命令するパターン。

## どんな時に使うパターンなのか？
主に以下の用途で使われるケースが多いと思います。  
  
① 特定のインスタンにある処理を動かしたい場合

## クラス図
![CommandClassDiagram](https://github.com/Kodak4400/DesignPattern/blob/master/Command/Command.png)

- Command: 命令のインタフェースを定義するクラス。サンプルコードでは、`Command`が該当。
- ConcreteCommand: `Command`の具体的な処理を定義するクラス。サンプルコードでは、`ConcreteCommand`が該当。
- Receiver: `Command`が命令を実行するときに対象となるクラス。サンプルコードでは、`Receiver`が該当。
- Invoker: 命令の開始するクラス。サンプルコードでは、`Invoker`が該当。
- Client: `ConcreteCommand`を生成して、`Receiver`を割り当てるクラス。`Main.ts`が該当。

## サンプルコード
```TypeScript:Command.ts
class Receiver {
  constructor() {}
  public action(msg: string) {
    console.log(msg);
  }
}

interface Command {
  setReceiver(receriver: Receiver): void;
  execute(): void;
}

class ConcreteCommand implements Command {
  constructor(private msg: string) {}
  receiver: Receiver;
  public setReceiver(receriver: Receiver) {
    this.receiver = receriver;
  }
  public execute() {
    this.receiver.action(this.msg);
  }
}

class Invoker {
  private commands: Command[] = [];
  public addCommand(command: Command) {
    this.commands.push(command);
  }
  public execute() {
    this.commands.forEach( e => {
      e.execute();
    })
  }
}
```

```TypeScript:Main.ts
// 動作確認用

const receiver = new Receiver;
const invoker = new Invoker;

const c1: Command = new ConcreteCommand("Input Command c1");
c1.setReceiver(receiver);
const c2: Command = new ConcreteCommand("Input Command c2");
c2.setReceiver(receiver);

invoker.addCommand(c1);
invoker.addCommand(c2);

invoker.execute();
```

```shell:動作確認結果
# 動作確認結果
$ ts-node sample.ts 
Input Command c1
Input Command c2
```
  
`ConcreteCommand`から`Receiver`の`action`メソッドを動かしているのがわかると思います。  

## おわりに
これはわかりやすいパターンの方だと思います。  

## 参考文献
- [Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)
