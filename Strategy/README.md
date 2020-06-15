# TypeScriptで学ぶデザインパターン「Strategy」
## はじめに
本記事は、[Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)の各デザインパターンの題材を`TypeScript`で書いて、個人的な学びを書いています。誤り、勘違い等あれば指摘頂けると助かります。  
  
今回は、「Strategy」です。  

## 「Strategy」パターンとは？
機能と実装を分けて考えるパターンの1つ。アルゴリズムで実装した部分をごっそり交換できる。

## どんな時に使うパターンなのか？
主に以下の用途で使われるケースが多いと思います。  
  
① アルゴリズムで作られた処理を容易に交換、追加したい。  
  
そのまんまですね。  

## クラス図
![StrategyClassDiagram](https://github.com/Kodak4400/DesignPattern/blob/master/Strategy/Strategy.png)

- Strategy: 戦略を利用するためのインタフェースクラス。サンプルコードでは、`Strategy`が該当。
- Context: Strategyを利用するクラス。ConcreteStrategyのインスタンスを持つ。サンプルコードでは、`Player`が該当。
- ConcreteStrategy1: 戦略の具体的な内容を定義したクラス。サンプルコードでは、`WinningStrategy`や`ProbStrategy`が該当。
- ConcreteStrategy2: 同上。

## サンプルコード
```TypeScript:Strategy.ts
interface Strategy {
  nextHand(): Hand;
  study(win: boolean): void;
}

class WinningStrategy implements Strategy {
  private won = false;
  private prevHand: Hand;
  constructor(private seed: number) {}
  public nextHand() {
    if (!this.won) {
      this.prevHand = Hand.getHand(Math.floor(Math.random() * Math.floor(3)));
    } else {
      this.prevHand = Hand.getHand(this.seed);
    }
    return this.prevHand;
  }
  public study(win: boolean) {
    this.won = win;
  }
}

class ProbStrategy implements Strategy {
  private prevHandValue = 0;
  private currentHandValue = 0;
  private history: number[][] = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ];
  constructor(private seed: number) {}
  public nextHand() {
    let bet = Math.floor(
      Math.random() * Math.floor(this.getSum(this.currentHandValue))
    );
    let handvalue = 0;
    if (bet < this.history[this.currentHandValue][0]) {
      handvalue = 0;
    } else if (
      bet <
      this.history[this.currentHandValue][0] +
        this.history[this.currentHandValue][1]
    ) {
      handvalue = 1;
    } else {
      handvalue = 2;
    }
    this.prevHandValue = this.currentHandValue;
    this.currentHandValue = handvalue;
    return Hand.getHand(handvalue);
  }
  private getSum(hv: number) {
    let sum = 0;
    for (let i = 0; i < 3; i++) {
      sum += this.history[hv][i];
    }
    return sum;
  }
  public study(win: boolean) {
    if (win) {
      this.history[this.prevHandValue][this.currentHandValue]++;
    } else {
      this.history[this.prevHandValue][(this.currentHandValue + 1) % 3]++;
      this.history[this.prevHandValue][(this.currentHandValue + 2) % 3]++;
    }
  }
}

class Hand {
  public static HANDVALUE_GUU = 0;
  public static HANDVALUE_CHO = 1;
  public static HANDVALUE_PAA = 2;
  public static hand: Hand[] = [
    new Hand(Hand.HANDVALUE_GUU),
    new Hand(Hand.HANDVALUE_CHO),
    new Hand(Hand.HANDVALUE_PAA),
  ];
  private static names: string[] = ["グー", "チョキ", "パー"];
  private constructor(private handvalue: number) {}
  public static getHand(handvalue: number) {
    return this.hand[handvalue];
  }
  public isStrongerThan(h: Hand) {
    return this.fight(h) === 1;
  }
  public isWeakerThan(h: Hand) {
    return this.fight(h) === -1;
  }
  private fight(h: Hand) {
    if (this === h) {
      return 0;
    } else if ((this.handvalue + 1) % 3 === h.handvalue) {
      return 1;
    } else {
      return -1;
    }
  }
  public toString(): string {
    return Hand.names[this.handvalue];
  }
}

class Player {
  private wincount: number = 0;
  private losecount: number = 0;
  private gamecount: number = 0;
  constructor(public name: string, private strategy: Strategy) {}
  public nextHand() {
    return this.strategy.nextHand();
  }
  public win() {
    this.strategy.study(true);
    this.wincount++;
    this.gamecount++;
  }
  public lose() {
    this.strategy.study(false);
    this.losecount++;
    this.gamecount++;
  }
  public even() {
    this.gamecount++;
  }

  public toString(): string {
    return `${this.name}: ${this.gamecount}games, ${this.wincount}win, ${this.losecount}lose`;
  }
}
```

```TypeScript:Main.ts
// 動作確認用
const player1: Player = new Player("Taro", new WinningStrategy(1));
const player2: Player = new Player("Hana", new ProbStrategy(1));

for (let i = 0; i < 50; i++) {
  let nextHand1: Hand = player1.nextHand();
  let nextHand2: Hand = player2.nextHand();
  
  console.log(`Taro:${nextHand1.toString()}`);
  console.log(`Hana:${nextHand2.toString()}`);

  console.log("--- Fight Result ----");
  if (nextHand1.isStrongerThan(nextHand2)) {
    console.log(`結果: Winner: ${player1.name}`);
    player1.win();
    player2.lose();
  } else if (nextHand2.isStrongerThan(nextHand1)) {
    console.log(`結果: Winner: ${player2.name}`);
    player2.win();
    player1.lose();
  } else {
    console.log("結果: Even...");
    player1.even();
    player2.even();
  }
}
console.log("--- Total Result ----");
console.log(player1.toString());
console.log(player2.toString());
```

```shell:動作確認結果
# 動作確認結果
$ ts-node sample.ts 
Taro:グー
Hana:チョキ
--- Fight Result ----
結果: Winner: Taro
Taro:チョキ
Hana:チョキ
--- Fight Result ----
結果: Even...
・
・
・
Taro:チョキ
Hana:チョキ
--- Fight Result ----
結果: Even...
--- Total Result ----
Taro: 50games, 18win, 20lose
Hana: 50games, 20win, 18lose
```
  
何気ないパターンですが、アルゴリズムの処理を実装する時に、メソッドの中に溶け込んだ形で実装してしまうのを止めるためのパターンです。  
Context側でConcreateStrategyを持って処理（委譲）しているため、アルゴリズムを呼び出す側との結びつきが弱く、容易に交換、追加が可能です。  

## おわりに
アルゴリズムの処理を実装するときは是非使っていきましょう。  

## 参考文献
- [Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)
