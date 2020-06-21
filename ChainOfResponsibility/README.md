# TypeScriptで学ぶデザインパターン「Chain of Responsibility」
## はじめに
本記事は、[Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)の各デザインパターンの題材を`TypeScript`で書いて、個人的な学びを書いています。誤り、勘違い等あれば指摘頂けると助かります。  
  
今回は、「Chain of Responsibility」です。  

## 「Chain of Responsibility」パターンとは？
構造を渡り歩くパターンの1つ。複数のオブジェクトをチェーンのように繋いでおき、そのオブジェクトのチェーンを順次渡り歩いて目的のオブジェクトを決定するパターンです。  

## どんな時に使うパターンなのか？
主に以下の用途で使われるケースが多いと思います。  
  
① このクラスで駄目だった処理を次のクラスに回していく（つまり、たらい回しな処理）を作りたい場合

## クラス図
![ChainOfResponsibilityClassDiagram](https://github.com/Kodak4400/DesignPattern/blob/master/ChainOfResponsibility/ChainOfResponsibility.png)

- Handler: 「要求を処理する」抽象クラス。サンプルコードでは、`Support`が担当。
- ConcreteHandler1: `Handler`の具体的な処理を表すクラス。サンプルコードでは、`NoSupport`、`LimitSupport`、`OddSupport`、`SpecialSupport`が担当。
- ConcreteHandler2: 同上。

## サンプルコード
```TypeScript:ChainOfResponsibility.ts
class Trouble {
  constructor(private num: number) {}
  public getNumber() {
    return this.num;
  }
  public toString() {
    return `[Trouble ${this.num}]`;
  }
}

abstract class Support {
  private next: Support;
  constructor(private name: string) {}
  public setNext(next: Support) {
    this.next = next;
    return this.next;
  }
  public support(trouble: Trouble) {
    if (this.resolve(trouble)) {
      this.done(trouble);
    } else if (this.next != null) {
      this.next.support(trouble);
    } else {
      this.fail(trouble);
    }
  }
  public toString() {
    return `[${this.name}]`;
  }
  protected abstract resolve(trouble: Trouble);
  protected done(trouble: Trouble) {
    console.log(`${trouble} is resolved by ${this}.`);
  }
  protected fail(trouble: Trouble) {
    console.log(`${trouble} cannot be resolved.`);
  }
}

class NoSupport extends Support {
  constructor(name: string) {
    super(name);
  }
  protected resolve(trouble: Trouble) {
    return false;
  }
}

class LimitSupport extends Support {
  constructor(name: string, private limit: number) {
    super(name);
  }
  protected resolve(trouble: Trouble) {
    return trouble.getNumber() < this.limit ? true : false;
  }
}

class SpecialSupport extends Support {
  constructor(name: string, private num: number) {
    super(name);
  }
  protected resolve(trouble: Trouble) {
    return trouble.getNumber() === this.num ? true : false;
  }
}

class OddSupport extends Support {
  constructor(name: string) {
    super(name);
  }
  protected resolve(trouble: Trouble) {
    return trouble.getNumber() % 2 === 1 ? true : false;
  }
}
```

```TypeScript:Main.ts
// 動作確認用
const alice: Support   = new NoSupport("Alice");
const bob: Support     = new LimitSupport("Bob", 100);
const charlie: Support = new SpecialSupport("Charlie", 429);
const diana: Support   = new LimitSupport("Diana", 200);
const elmo: Support    = new OddSupport("Elmo");
const fred: Support    = new LimitSupport("Fred", 300);
alice.setNext(bob).setNext(charlie).setNext(diana).setNext(elmo).setNext(fred)
for(let i = 0; i < 500; i += 33) {
    alice.support(new Trouble(i))
}
```

```shell:動作確認結果
# 動作確認結果
$ ts-node sample.ts 
[Trouble 0] is resolved by [Bob].
[Trouble 33] is resolved by [Bob].
[Trouble 66] is resolved by [Bob].
[Trouble 99] is resolved by [Bob].
[Trouble 132] is resolved by [Diana].
[Trouble 165] is resolved by [Diana].
[Trouble 198] is resolved by [Diana].
[Trouble 231] is resolved by [Elmo].
[Trouble 264] is resolved by [Fred].
[Trouble 297] is resolved by [Elmo].
[Trouble 330] cannot be resolved.
[Trouble 363] is resolved by [Elmo].
[Trouble 396] cannot be resolved.
[Trouble 429] is resolved by [Charlie].
[Trouble 462] cannot be resolved.
[Trouble 495] is resolved by [Elmo].
```
  
ポイントは、1つ1つのクラスが自分の処理に集中できているという点です。  
「処理のたらい回し」を行うことで、各クラスは自分の処理に集中できています。  

## おわりに
あんまり使うケースがないかもしれない・・・

## 参考文献
- [Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)
