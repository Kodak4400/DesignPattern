# TypeScriptで学ぶデザインパターン「Adapter」
## はじめに
本記事は、[Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)の各デザインパターンの題材を`TypeScript`で書いて、個人的な学びを書いています。誤り、勘違い等あれば指摘頂けると助かります。  
  
今回は、「Adapter」です。  

## 「Adapter」パターンとは？
既存のクラスに対して直接修正をせずに、処理の動作を変更するためのデザインパターンです。  
本書では「すでに提供されているもの」を「利用できるもの」にするためのデザインパターンであり、Wrapperパターンと呼ばれたりすると書かれています。  

## どんな時に使うパターンなのか？
主に以下の用途で使われるケースが多いと思います。  

①：既存のクラスに対して直接修正をせずに、処理の動作を変更、再利用したい場合

## クラス図
![AdapterClassDiagram](https://github.com/Kodak4400/DesignPattern/blob/master/Iterator/Adapter.png)

- Target: Adapterを定義したInterface。サンプルコードでは、Targetが該当。
- Adapter: Targetで定義した具体的な処理を実装します。サンプルコードでは、Adapterが該当。
- Adaptee: 既存のクラス（Targetの対象クラス）。サンプルコードでは、AdapterSampleClassが該当。

## サンプルコード
```TypeScript:Adapter.ts
class AdapterSampleClass {
    constructor(public msg: string) {}
    public getMessage() {
        return `*${this.msg}*`
    }
    public getAdapterSampleClassMessage() {
        return `+${this.msg}+`
    }
}

interface Target {
    targetFunction1(): void;
    targetFunction2(): void;
}

class Adapter implements Target {
    private createAdapterSampleInstance: AdapterSampleClass
    constructor() {}
    public createAdapterSample(msg: string) {
        this.createAdapterSampleInstance = new AdapterSampleClass(msg)
    }
    public targetFunction1() {
        console.log(this.createAdapterSampleInstance.getMessage())
    }
    public targetFunction2() {
        console.log(this.createAdapterSampleInstance.getAdapterSampleClassMessage())
    }
}
```

```TypeScript:Main.ts
// 動作確認用
const adapter = new Adapter()
adapter.createAdapterSample('Hello')
adapter.targetFunction1()
adapter.targetFunction2()
```

```shell:動作確認結果
# 動作確認結果
$ ts-node sample.ts 
*Hello*
+Hello+
```
  
ポイントは、既存のクラス（`AdapterSampleClass`）を新しいインタフェース（`Target`）に適合させていることです。 
  
つまり、既存のクラスに対して直接修正をせずに、インタフェースに合わせたクラスを作ることができます。  
クラスの書き換えなので、既存のクラスとあまりにかけ離れたクラスを作るのはNGですね。  

## おわりに
「Adapter」は既存のクラスを書き換えて、違うクラスにしてしまうので使用に注意が必要だと思いました。  
とはいえ、既存のクラスを触らずに別のクラスを作成できるのは、既存のクラスに対してテストが不要だということなので、便利な面もあると思いました。  
使うときは慎重にしたいパターンの1つですね。  

## 参考文献
- [Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)
