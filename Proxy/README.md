# TypeScriptで学ぶデザインパターン「Proxy」
## はじめに
本記事は、[Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)の各デザインパターンの題材を`TypeScript`で書いて、個人的な学びを書いています。誤り、勘違い等あれば指摘頂けると助かります。  
  
今回は、「Proxy」です。  

## 「Proxy」パターンとは？
ムダをなくすためのパターンの1つ。必要になるまで、インスタンスを作らないパターンです。

## どんな時に使うパターンなのか？
主に以下の用途で使われるケースが多いと思います。  
  
① 修正、調整が多い機能を分けたい場合

`Proxy`というのは「代理人」という意味です。つまり、特定の処理を「代理人」に任せてしまうのが`Proxy`パターンです。
なぜ「代理人」に処理を任せてしまうのかというと、その処理がが重かったり（メモリを大量に使用したり）、修正が頻繁に発生するような要注意な処理だったりするためです。そのため、必要になるまでインスタンスを作らないでおいて、必要がきたら「代理人」に任せて処理を行う。それが、`Proxy`パターンです。

## クラス図
![ProxyClassDiagram](https://github.com/Kodak4400/DesignPattern/blob/master/Proxy/Proxy.png)

- Subject: `Proxy`と`RealSubect`を同一視するためのインタフェース。`Client`からはこの2つの違いを意識する必要がない。サンプルコードでは、`Printable`が該当。
- Proxy:`Client`からの要求をできるだけ行う。特定の重い処理だけを`RealSubject`にお願いする。サンプルコードでは、`PrinterProxy`が該当。
- RealSubject: `Proxy`が手に負えない仕事を行うクラス。サンプルコードでは、`Printer`が該当。
- Client: `Proxy`を利用するクラス。`Main.ts`が該当。

## サンプルコード
```TypeScript:Proxy.ts

interface Printable {
  setPrinterName(name: string): void;
  getPrinterName(): string;
  print(str: string): void;
}

class Printer implements Printable {
  constructor(private name: string) {
    this.heavyJob(`Printerインスタンス${this.name}を生成`);
  }
  public setPrinterName(name: string) {
    this.name = name;
  }
  public getPrinterName() {
    return this.name;
  }
  public print(str: string) {
    console.log(`=== ${this.name} ===`);
    console.log(str);
  }
  private heavyJob(msg: string) {
    console.log(msg);
  }
}

class PrinterProxy implements Printable {
  constructor(private name: string) {}
  private real: Printer;
  public setPrinterName(name: string) {
    if(this.real) {
      this.real.setPrinterName(name);
    }
    this.name = name;
  }
  public getPrinterName() {
    return this.name;
  }
  public print(str: string) {
    this.realize();
    this.real.print(str);
  }
  private realize() {
    if(!this.real) {
      this.real = new Printer(this.name);
    }
  }
}

```

```TypeScript:Main.ts
// 動作確認用
const p: Printable = new PrinterProxy("Alice");
console.log(`### ${p.getPrinterName()} ###`);
p.setPrinterName("Bob");
console.log(`### ${p.getPrinterName()} ###`);
p.print("Hello, world.");
```

```shell:動作確認結果
# 動作確認結果
$ ts-node sample.ts 
### Alice ###
### Bob ###
PrinterインスタンスBobを生成
=== Bob ===
Hello, world.
```
  
上に書いてしまっていますが・・・`Proxy`と`RealSubect`を同一視するためのインタフェース`Subject`クラスを置くことで、`Client`からはこの2つの違いを意識する必要がなく、呼び出すことができます。

## おわりに
理解、納得はしましたが、つ、使うかなぁ・・・？

## 参考文献
- [Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)
