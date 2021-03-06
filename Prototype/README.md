# TypeScriptで学ぶデザインパターン「Prototype」
## はじめに
本記事は、[Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)の各デザインパターンの題材を`TypeScript`で書いて、個人的な学びを書いています。誤り、勘違い等あれば指摘頂けると助かります。  
  
今回は、「Prototype」です。  

## 「Prototype」パターンとは？
インスタンスを生成するパターンの1つ。インスタンスをコピーして、新しいインスタンスを作るデザインパターンです。

## どんな時に使うパターンなのか？
主に以下の用途で使われるケースが多いと思います。  

① 扱うオブジェクトの種類が多くてクラスにまとめられない場合  
② クラスからインスタンスを作るのが難しい場合  

①は、サンプルで言う`decorate`部分のこと。サンプルでは`@`だけだが、`~`とか、`*`のパターンを増やしたい場合に、いちいちnewする必要があるため、それを避けたい。  
②は、クラスが別のクラスに依存していて、簡単にnewできない場合。  

## クラス図
![PrototypeClassDiagram](https://github.com/Kodak4400/DesignPattern/blob/master/Prototype/Prototype.png)

- Prototype: newしなくてもインスタンスを生成する（clone）定義が書かれているインタフェース。サンプルコードでは、Prototypeが該当。
- ConcreteProtoType: `Prototype`の具体的な処理を実装するクラス。サンプルコードでは、ConcreteProtoTypeが該当。
- Manager: インスタンスを生成する（clone）クラス。サンプルコードでは、Managerが該当。

## サンプルコード
```TypeScript:Prototype.ts
interface ProtoType {
  use(str: string): void;
  createClone(): ProtoType;
}

class ConcreteProtoType implements ProtoType {
  constructor(private decorate: string) {}
  public use(str: string) {
    console.log(`${this.decorate}- ${str} -${this.decorate}`);
  }
  public createClone(): ProtoType {
    return Object.create(this); // 注意）インスタンスを作成する。シャローコピーです。
  }
}

class Manager {
  constructor() {}
  private incStorage: { [key: string]: ProtoType } = {};
  public register(name: string, p: ProtoType) {
    this.incStorage[name] = p;
  }
  public create(name: string): ProtoType {
    const p: ProtoType = this.incStorage[name];
    return p.createClone();
  }
}
```

```TypeScript:Main.ts
// 動作確認用
const m = new Manager();
const protoType: ProtoType = new ConcreteProtoType("@");
protoType.use("protoTypeInstancMessage");

m.register("pInstanceCopy", protoType);

const protoTypeClone: ProtoType = m.create("pInstanceCopy");
protoTypeClone.use("protoTypeCloneInstancMessage");
```

```shell:動作確認結果
# 動作確認結果
$ ts-node sample.ts 
@- protoTypeInstancMessage -@
@- protoTypeCloneInstancMessage -@
```
  
ポイントは、サンプルでは`Object.create(this)`を使って、インスタンスをコピーしているが、これはシャローコピーなので完璧なコピーとは言えない。  
そのため、本来であればclone用の別ライブラリ等を使う必要がありそう・・・
  
## おわりに
JSで完璧なインスタンスのコピーは難しそう・・・

## 参考文献
- [Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)
