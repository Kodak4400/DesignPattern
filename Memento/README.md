# TypeScriptで学ぶデザインパターン「Memento」
## はじめに
本記事は、[Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)の各デザインパターンの題材を`TypeScript`で書いて、個人的な学びを書いています。誤り、勘違い等あれば指摘頂けると助かります。  
  
今回は、「Memento」です。  

## 「Memento」パターンとは？
オブジェクトの状態変化に応じて処理するためのパターンの1つ。

## どんな時に使うパターンなのか？
主に以下の用途で使われるケースが多いと思います。  
  
① オブジェクト指向のプログラムでUndo（前の状態に戻したり、進めたり）したい。

インスタンスを前の状態に戻したりするには、インスタンスの内部に自由にアクセスできる必要があります。  
しかし、不用意にアクセスを許してしまうとカプセル化の破壊が起きてしまいます。  
それを防ぐのが、`Memento`パターンです。  

## クラス図
![MementoClassDiagram](https://github.com/Kodak4400/DesignPattern/blob/master/Memento/Memento.png)

- Originator:「作成者」です。自分の現在の状態を保存したい時に`Memento`を作成します。サンプルコードでは、`Gamer`が該当。
- Memento:`Originator`の内部情報を纏めます。しかし、その情報は`Memento`しか使えません。次の2つのインタフェースを持ちます。この2種類のインタフェースを使い分けることで、オブジェクトのカプセル化の破壊を防ぎます。サンプルコードでは、`Memento`が該当。
 - wide interface（広いインタフェース）: オブジェクトの状態をもとに戻すために必要な情報が入ります。
 - narrow interface（狭いインタフェース）: 外部のCaretakerに見せるためのものです。内部状態が外部公開されるのを防ぎます。
- Caretaker:「世話をする人」です。現在の`Originator`の状態を保存したい時に`Originator`に伝えます。サンプルコードでは、`Observer`が該当

## サンプルコード
```TypeScript:Memento.ts
class Memento {
  constructor(public money: number, private fruits: string[] = []) {}
  public getMoney() {
    return this.money;
  }
  public addFruits(fruit: string) {
    this.fruits.push(fruit);
  }
  public getFruits() {
    return this.fruits;
  }
}

class Gamer {
  constructor(private money: number) {}
  private fruits: string[] = [];
  private static fruitsname: string = "フルーツ";
  public getMoney() {
    return this.money;
  }
  public bet() {
    let dice = Math.floor(Math.random() * 6) + 1;
    console.log(`ダイス：${dice}`);
    if (dice === 1) {
      this.money += 100;
      console.log("お金＋100を得た");
    } else if (dice === 2) {
      this.money /= 2;
      console.log("お金が半分になった");
    } else if (dice === 6) {
      let f = this.getFruit();
      console.log("フルーツを得た");
      this.fruits.push(f);
    } else {
      console.log("何も得なかった");
    }
  }
  public createMemento() {
    const m = new Memento(this.money);
    this.fruits.forEach((f) => {
      m.addFruits(f);
    });
    return m;
  }
  public restorMemento(memento: Memento) {
    this.money = memento.money;
    this.fruits = memento.getFruits();
  }
  public toString() {
    return `[money = ${this.money}, fruits = ${this.fruits}]`;
  }
  private getFruit() {
    return Gamer.fruitsname;
  }
}
```

```TypeScript:Main.ts
// 動作確認用
const gamer = new Gamer(100);
let memento = gamer.createMemento();
for (let i = 0; i < 20; i++) {
  gamer.bet();
  console.log(`現在のお金：${gamer.getMoney()}、Mementoにあるお金：${memento.getMoney()}`);

  if (gamer.getMoney() > memento.getMoney()) {
    memento = gamer.createMemento();
  } else if (gamer.getMoney() <= memento.getMoney() / 2) {
    gamer.restorMemento(memento);
  }
}
```

```shell:動作確認結果
# 動作確認結果
$ ts-node sample.ts 
ダイス：3
何も得なかった
現在のお金：100、Mementoにあるお金：100
ダイス：2
お金が半分になった
現在のお金：50、Mementoにあるお金：100
・
・
・
ダイス：4
何も得なかった
現在のお金：400、Mementoにあるお金：400
ダイス：2
お金が半分になった
現在のお金：200、Mementoにあるお金：400
```
  
`Mement`を複数配列で持たせてあげることで、状態保存を複数持つこともできます。  
`restorMemento`から状態を戻すのはうまくできてますが、`memento.money`にして、`money`をパブリックにしているのは、個人的にイマイチなところ・・・  
もう少しうまくできると嬉しいのだが・・・(; ; )

## おわりに
これは使えるっ

## 参考文献
- [Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)
