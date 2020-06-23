# TypeScriptで学ぶデザインパターン「Flyweight」
## はじめに
本記事は、[Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)の各デザインパターンの題材を`TypeScript`で書いて、個人的な学びを書いています。誤り、勘違い等あれば指摘頂けると助かります。  
  
今回は、「Flyweight」です。  

## 「Flyweight」パターンとは？
ムダをなくすためのパターンの1つ。インスタンスをできるだけ共有させて、無駄にnewしないパターンです。

## どんな時に使うパターンなのか？
主に以下の用途で使われるケースが多いと思います。  
  
① 作成したインスタンスを共有したい。

これも、そのまんまですね。  

## クラス図
![FlyweightClassDiagram](https://github.com/Kodak4400/DesignPattern/blob/master/Flyweight/Flyweight.png)

- Flyweight:普通に扱うとプログラムが重くなるので、共有した方が良いと思うクラス。サンプルコードでは、`BigChar`が該当。
- FlyweightFactory:`Flyweight`を作る工場のクラス。この工場から作るクラスはインスタンスが共有される。サンプルコードでは、`BigCharFactory`が該当。
- Client: `FlyweightFactory`を使って`Flyweight`を作り出し、それを利用するクラスです。サンプルコードでは、`BigString`が該当。

## サンプルコード
```TypeScript:Flyweight.ts
class BigCharFactory {
  private constructor() { }
  private pool = new Map<string, BigChar>();
  private static singleton = new BigCharFactory();
  public static getInstance() {
    return this.singleton;
  }
  public getBigChar(str: string) {
    let bc = this.pool.get(str)
    if (!bc) {
      bc = new BigChar(str);
      this.pool.set(str, bc)
    }
    return bc;
  }
  public getMap() {
    this.pool.forEach( (value, key) => {
      console.log("[" + key + ", " + value + "]" );
    })
  }
}

class BigChar {
  constructor(private charname: string) {}
  public print() {
    console.log(this.charname);
  }
}

class BigString {
  private factory: BigCharFactory;
  private bc: BigChar;
  constructor(str: string) {
    this.factory = BigCharFactory.getInstance();
    this.bc = this.factory.getBigChar(str);
  }
  public print() {
    this.factory.getMap();
    this.bc.print();
  }
}
```

```TypeScript:Main.ts
// 動作確認用
const bs1 = new BigString("123");
const bs2 = new BigString("123");
const bs3 = new BigString("1");
const bs4 = new BigString("123");
bs4.print();
```

```shell:動作確認結果
# 動作確認結果
$ ts-node sample.ts 
[123, [object Object]] # objectはの中に入っているのは、インスタンスですね。
[1, [object Object]]
123
```
  
`Singleton`パターンの応用版ですね。  
`BigString`をnewした時に、インスタンスが存在すれば、それを使うようにしています。  
（作りは甘いですが・・・）関数`getBigChar`で、引数を取り込み、本当に同じインスタンスかどうかもチェックしています。  

## おわりに
`Singleton`含めて、インスタンスの流用パターンは多そう・・・

## 参考文献
- [Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)
