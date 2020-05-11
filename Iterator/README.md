# TypeScriptで学ぶデザインパターン「Iterator」
## はじめに
本記事は、[Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)の各デザインパターンの題材を`TypeScript`で書いて、個人的な学びを書いています。誤り、勘違い等あれば指摘頂けると助かります。  
  
今回は、「Iterator」です。  
なお、ES6から`Iterator`が使用可能となったため、サンプルコードではこちらを使用します。

## 「Iterator」パターンとは？
集約したオブジェクトを列挙していき、全体をスキャンしていく処理を行うためのデザインパターンです。

## どんな時に使うパターンなのか？
主に以下の用途で使われるケースが多いと思います。  

①：固有なデータを持つ集約したオブジェクトを列挙、全体をスキャンしたい場合

## クラス図
![IteratorClassDiagram](https://github.com/Kodak4400/DesignPattern/blob/master/Iterator/Iterator.png)

- Agregate: 集約したオブジェクトを表すInterface。ここで`Iterator`を作ります。
- ConcreteAgregate：集約したオブジェクトで使用する具体的な処理を実装する。サンプルコードでは、AppleProductが該当。
- Target: 集合の対象。サンプルコードでは、Productが該当。
- ConcreteIterator：集約したオブジェクトを列挙、スキャンする処理を実装する。サンプルコードでは、AppleProductIteratorが該当。

## サンプルコード
```TypeScript:Iterator.ts
interface Aggregate<T> {
  iterator(): Iterator<T>;
}

class Product {
  constructor(public name: string) {}
}

class AppleProduct implements Aggregate<Product> {
  private product: Product[] = [];

  constructor() {}

  public show(i: number) {
    return this.product[i]
  }

  public add(p: Product) {
    this.product.push(p)
  }

  public getLength() {
    return this.product.length
  }

  public iterator(): Iterator<Product> {
    return new AppleProductIterator(this)
  }
}

class AppleProductIterator implements Iterator<Product>{
  private pointer = 0;

  constructor(private appleproduct : AppleProduct) {}

  public next(): IteratorResult<Product> {
    if (this.pointer < this.appleproduct.getLength()) {
      return {
        done: false,
        value: this.appleproduct.show(this.pointer++),
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
const mac = new AppleProduct()
mac.add(new Product("macbook"))
mac.add(new Product("macbook pro"))
mac.add(new Product("macbook air"))
mac.add(new Product("mac mini"))
const itr = mac.iterator();
console.log(itr.next())
console.log(itr.next())
console.log(itr.next())
console.log(itr.next())
console.log(itr.next())
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
  
ポイントは、集約したオブジェクトを列挙する際に、`Iterator`の`next`関数しか使用していないことです。  
`AppleProduct`の実装には依存していません。  
  
つまり、「集約したオブジェクト」から「列挙する」という部分を切り離すことができます。  
これにより、「集約したオブジェクト」に対して変更があっても、「列挙する」部分には影響が無く、いつでも切り離し可能な部品としても扱うことができます。  

## おわりに
個人的に「Iterator」の使用頻度はあまり高くない気がしていますが、デザインパターンの基本として、必ず出てくるので覚えておきたい。  
「列挙する」という処理の一部を切り離せるという考え方は、デザインパターンの基本なので、こういった考え方を定着させたいですね。  

## 参考文献
- [Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)
- [TypeScript Deep Dive 日本語版(iterators)](https://typescript-jp.gitbook.io/deep-dive/future-javascript/iterators)
