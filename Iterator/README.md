# TypeScriptで学ぶデザインパターン「Iterator」
## はじめに
本記事は、[Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)の各デザインパターンの題材を`TypeScript`で書いて、個人的な学びを書いています。誤り、勘違い等あれば指摘頂けると助かります。  
  
今回は、「Iterator」です。  

## 「Iterator」パターンとは？
集約したオブジェクトを列挙していき、全体をスキャンしていく処理を行うためのデザインパターンです。

## どんな時に使うパターンなのか？
主に以下の用途で使われるケースが多いと思います。  

①：固有なデータを持つ集約したオブジェクトを列挙、全体をスキャンしたい場合

## クラス図
![SingletonClassDiagram](https://github.com/Kodak4400/DesignPattern/blob/master/Singleton/Singleton.png)


## サンプルコード
```TypeScript:Singleton.ts
class Component {
  constructor(public name: string) {}
}

class AppleProduct implements Iterator<Component> {
  private pointer = 0;

  constructor(public name: string, public components: Component[]) {}

  public next(): IteratorResult<Component> {
    if (this.pointer < this.components.length) {
      return {
        done: false,
        value: this.components[this.pointer++],
      };
    } else {
      return {
        done: true,
        value: 'データなし'
      };
    }
  }
}
```

```TypeScript:Main.ts
// 動作確認用
let mac: Iterator = new AppleProduct("mac", [new Component("macbook"), new Component("macbook pro"), new Component("macbook air"), new Component("mac mini")]);
console.log(mac.next())
console.log(mac.next())
console.log(mac.next())
console.log(mac.next())
console.log(mac.next())
```

```shell:動作確認結果
# 動作確認結果
$ ts-node sample.ts
{ done: false, value: Component { name: 'macbook' } }
{ done: false, value: Component { name: 'macbook pro' } }
{ done: false, value: Component { name: 'macbook air' } }
{ done: false, value: Component { name: 'mac mini' } }
{ done: true, value: 'データなし' }
```
  
ポイントは、`constructor`関数が`private`であることです。  
  
これにより、クラスの外側から`new Singleton()`ができません。  
インスタンスを生成するには、`getInstance`関数を呼ぶしかありませんが、この関数はすでにインスタンスが生成済みであれば、生成済みのインスタンスを返すようにしています。  
  
このようにして、生成するインスタンスが1つしか存在しないことを実現しています。  

## おわりに
「Singleton」はデザインパターンの中でも大変よく使われる＆分かりやすい分類に入るのではないでしょうか。  
ボタンを押下する度に`new`してインスタンスを生成してしまうようなケースやDBから取得した値を保持しておきたいケース等で使えそうなパターンですね。  

## 参考文献
- [Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)
