# TypeScriptで学ぶデザインパターン「Observer」
## はじめに
本記事は、[Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)の各デザインパターンの題材を`TypeScript`で書いて、個人的な学びを書いています。誤り、勘違い等あれば指摘頂けると助かります。  
  
今回は、「Observer」です。  

## 「Observer」パターンとは？
オブジェクトの状態変化に応じて処理するためのパターンの1つ。

## どんな時に使うパターンなのか？
主に以下の用途で使われるケースが多いと思います。  
  
① 交換可能な部品を用意したい

以下にしておくことで、具象クラスの交換を容易にしている。
- 抽象クラスやインタフェースを使って、具象クラスから抽象メソッドをひきはがす
- 引数でインスタンスを渡すときや、フィールドでインスタンスを保持するときには、具象クラスの型にせず、抽象クラスやインタフェースの型にする

## クラス図
![ObserverClassDiagram](https://github.com/Kodak4400/DesignPattern/blob/master/Observer/Observer.png)

- Subject:「観測される側」を表す。Obserberを登録、削除、ステータスを参照するメソッドを持つ。サンプルコードでは、`NumberGenerator`が該当。
- ConcreteSubject:`Subject`の具体的な内容を定義するクラス。サンプルコードでは、`RandomNumberGenerator`が該当。
- Observer:「観察者」を表す。サンプルコードでは、`Observer`が該当
- ConcreteObserver:`Observer`の具体的な内容を定義するクラス。サンプルコードでは、`DigitObserver`や`GraphObserver`が該当。

## サンプルコード
```TypeScript:Observer.ts
interface Observer {
  update(generator: NumberGenerator): void;
}

abstract class NumberGenerator {
  private observers: Observer[] = [];
  public addObserver(observer: Observer) {
    this.observers.push(observer);
  }
  public deleteObserver(observer: Observer) {
    if (this.observers.indexOf(observer) !== -1) {
      this.observers.splice(this.observers.indexOf(observer));
    }
  }
  public notifyObservers() {
    this.observers.forEach((o) => {
      o.update(this);
    });
  }
  public abstract getNumber(): number;
  public abstract execute(): void;
}

class RandomNumberGenerator extends NumberGenerator {
  private num: number;
  constructor() {
    super();
  }
  public getNumber() {
    return this.num;
  }
  public execute() {
    for (let i = 0; i < 10; i++) {
      this.num = Math.floor(Math.random() * 51);
      this.notifyObservers();
    }
  }
}

class DigitObserver implements Observer {
  constructor() {}
  public update(generator: NumberGenerator) {
    console.log(`DigitObserver: ${generator.getNumber()}`);
  }
}

class GraphObserver implements Observer {
  constructor() {}
  public update(generator: NumberGenerator) {
    let str = "GraphObserver: ";
    for (let i = 0; i <= generator.getNumber(); i++) {
      str += "*";
    }
    console.log(str);
  }
}
```

```TypeScript:Main.ts
// 動作確認用
const generator: NumberGenerator = new RandomNumberGenerator();
const observer1: Observer = new DigitObserver();
const observer2: Observer = new GraphObserver();
generator.addObserver(observer1);
generator.addObserver(observer2);
generator.execute();
```

```shell:動作確認結果
# 動作確認結果
$ ts-node sample.ts 
DigitObserver: 4
GraphObserver: *****
DigitObserver: 8
GraphObserver: *********
DigitObserver: 17
GraphObserver: ******************
DigitObserver: 8
GraphObserver: *********
DigitObserver: 44
GraphObserver: *********************************************
DigitObserver: 46
GraphObserver: ***********************************************
DigitObserver: 21
GraphObserver: **********************
DigitObserver: 2
GraphObserver: ***
DigitObserver: 6
GraphObserver: *******
DigitObserver: 29
GraphObserver: ******************************
```
  
observerの本来の意味は「観察者」だけど、実際にはObserverは「観察」よりも「通知」されるのを受動的に待っています。
そのため、`Observerパターン`は`Publish-Subscribeパターン`とも呼ばれることがあります。

## おわりに
結構使われているところが多いパターン。覚えておきたい。

## 参考文献
- [Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)
