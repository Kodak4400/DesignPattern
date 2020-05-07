# TypeScriptで学ぶデザインパターン「Singleton」
## はじめに
本記事は、[Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)の各デザインパターンの題材を`TypeScript`で書いて、個人的な学びを書いています。誤り、勘違い等あれば指摘頂けると助かります。  
  
今回は、「Singleton」です。  

## 「Singleton」パターンとは？
インスタンスを生成するパターンの1つ。生成するインスタンスが1つしか存在しないことを保証するためのデザインパターンです。  

## どんな時に使うパターンなのか？
主に以下の用途で使われるケースが多いと思います。  

①：生成するインスタンスを1つに制限したい。  
②：状態の保持、共通関数を使用する目的のため、生成したインスタンスを使いまわしたい。  

インスタンスの生成すると、その情報を保持するためにマシンパワー（メモリー）を使用します。  
そのため、インスタンスが多く生成すると、それだけマシンパワー（メモリー）使われ、パフォーマンスが悪くなります。  

生成した1つ1つのインスタンスに意味があるのであれば、仕方がないのかもしれませんが、むだに同じClassから生成したインスタンスが大量に存在するのは、あまり良いプログラミングとは言えません。  

また、インスタンスには、状態の保持や共通関数を使用する目的で作るものもあります。  
そのような場合、同じClassから生成したインスタンスが大量に存在するとプログラミングが複雑になり、書く側、見る側双方にとっても大変わかり難いものになります。  

## クラス図
![SingletonClassDiagram](https://github.com/Kodak4400/DesignPattern/Singleton/Singleton.png)


## サンプルコード
```TypeScript:Singleton.ts
class Singleton {
  private static instance: Singleton;

  private constructor() {}

  public static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}
```

```TypeScript:Main.ts
// 動作確認用
const ins1 = Singleton.getInstance()
const ins2 = Singleton.getInstance()
if (ins1 === ins2) {
  console.log('同じインスタンス')
} else {
  console.log('異なるインスタンス')
}
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
