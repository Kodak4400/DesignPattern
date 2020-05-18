# TypeScriptで学ぶデザインパターン「Factory Method」
## はじめに
本記事は、[Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)の各デザインパターンの題材を`TypeScript`で書いて、個人的な学びを書いています。誤り、勘違い等あれば指摘頂けると助かります。  
  
今回は、「Factory Method」です。  

## 「Factory Method」パターンとは？
「Template Method」の派生パターンの1つ。インスタンスの生成方法をフレームワーク化したデザインパターンです。  
「Template Method」同様、スーパークラスで処理の枠組みを定めて、サブクラスでその具体的内容を定めます。  

## どんな時に使うパターンなのか？
主に以下の用途で使われるケースが多いと思います。  
  
①：同じような処理をするクラスを複数用意したい。  
②：①の種類が多い  
  
「`Factory`と呼ばれるインスタンスを生成する工場を用意して、インスタンス（`Product`）を作る」という一連の流れをフレームワーク化しています。  
フレームワークなので、`Factory`や`Product`のスーパークラス側には具体的な内容は定めずに、すべてサブクラス側で定めます。  

## クラス図
![FactoryMethodClassDiagram](https://github.com/Kodak4400/DesignPattern/blob/master/FactoryMethod/FactoryMethod.png)

- Factory: インスタンスの作り方を定義したクラス。サンプルコードでは、Factoryが該当。
- Product: 生成したインスタンスの使い方を定義したクラス。サンプルコードでは、Productが該当。
- concreteFactory: 具体的にインスタンスを生成するクラス名を定義したクラス。サンプルコードでは、concreteFactoryが該当。
- concreteProduct: 生成したインスタンスの具体的な使い方を定義したクラス。サンプルコードでは、concreteProductが該当。

## サンプルコード
```TypeScript:FactoryMethod.ts
abstract class Product {
    constructor() {}
    public abstract use(): void;
}

abstract class Factory {
    constructor() {}
    public create(msg: string): Product {
        const productInstance: Product = this.createProduct(msg)
        this.registerProduct(productInstance)
        return productInstance
    }
    protected abstract createProduct(msg: string): Product
    protected abstract registerProduct(productInstance: Product): void
}

class concreteProduct {
    constructor(private msg: string) {}
    public use() {
        console.log(`Message: ${this.msg}`)
    }
    public getMessage() {
        return this.msg
    }
}

class concreteFactory extends Factory {
    constructor(private messages: string[] = []) {
        super()
    }
    protected createProduct(msg: string) {
        return new concreteProduct(msg)
    }
    protected registerProduct(productInstance: concreteProduct) {
        this.messages.push(productInstance.getMessage())
    }
    public getMessages() {
        console.log(this.messages)
    }
}
```

```TypeScript:Main.ts
// 動作確認用
const factory = new concreteFactory
const factorySampleInstance1 = factory.create('おはようございます')
const factorySampleInstance2 = factory.create('こんにちは')
const factorySampleInstance3 = factory.create('さようなら')
factorySampleInstance1.use()
factorySampleInstance2.use()
factorySampleInstance3.use()
factory.getMessages()
```

```shell:動作確認結果
# 動作確認結果
$ ts-node sample.ts 
Message: おはようございます
Message: こんにちは
Message: さようなら
[ 'おはようございます', 'こんにちは', 'さようなら' ]
```
  
ポイントは、`Factory`の`create`で、newによるインスタンスの生成を`createProduct`のメソッド呼び出しにしていることです。  
これにより、サブクラス側でnewするクラスを自由に定義できます。  
  
また、上記によりサブクラス側に具体的な処理を定義するため、フレームワークである`Factory`や`Product`に修正が発生することはありません。  
  
## おわりに
個人的に、わざわざ`Factory`と呼ばれるインスタンスを生成する工場を用意して、インスタンス（`Product`）を作るのは、少し大変なのかなと思いました。  

## 参考文献
- [Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)
