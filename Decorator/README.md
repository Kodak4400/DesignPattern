# TypeScriptで学ぶデザインパターン「Decorator」
## はじめに
本記事は、[Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)の各デザインパターンの題材を`TypeScript`で書いて、個人的な学びを書いています。誤り、勘違い等あれば指摘頂けると助かります。  
  
今回は、「Decorator」です。  

## 「Decorator」パターンとは？
同一視するパターンの1つ。「飾り枠」と「中身」を同一視します。たとえば、「スポンジケーキ（容器）」に対して「デコレーション（飾り枠）」していくような・・・  
つまり、オブジェクトに対して、どんどん飾り付けをして1つのオブジェクトを完成させていくパターンです。

## どんな時に使うパターンなのか？
主に以下の用途で使われるケースが多いと思います。  
  
① 中身を変えずに機能追加したい。  
② 動的な機能追加をしたい。  
  
飾り付け次第で、オブジェクトに対して機能追加が自由にできます。  

## クラス図
![DecoratorClassDiagram](https://github.com/Kodak4400/DesignPattern/blob/master/Decorator/Decorator.png)

- Component: 「スポンジケーキ（容器）」のクラスです。サンプルコードでは、`Display`が該当。
- ConcreteComponent: 具体的な「スポンジケーキ（容器）」のクラスです。サンプルコードでは、`StringDisplay`が該当。
- Decorator: 「デコレーション（飾り枠）」のクラスです。Componentを持ちます。サンプルコードでは、`Border`が該当。
- ConcreteDecorator: 具体的な「デコレーション（飾り枠）」のクラスです。サンプルコードでは、`SideBorder`と`FullBorder`が該当。

## サンプルコード
```TypeScript:Decorator.ts
abstract class Display {
  constructor() {}
  public abstract getColumns(): number;
  public abstract getRows(): number;
  public abstract getRowText(row: number): string;
  public show() {
    for (let i = 0; i < this.getRows(); i++) {
      console.log(this.getRowText(i));
    }
  }
}

abstract class Border extends Display {
  constructor(protected display: Display) {
    super();
  }
}

class StringDisplay extends Display {
  constructor(private str: string) {
    super();
  }
  public getColumns() {
    return this.str.length;
  }
  public getRows() {
    return 1;
  }
  public getRowText(row: number) {
    return row === 0 ? this.str : null;
  }
}

class SideBorder extends Border {
  constructor(protected display: Display, private borderChar: string) {
    super(display);
  }
  public getColumns() {
    return 1 + this.display.getColumns() + 1;
  }
  public getRows() {
    return this.display.getRows();
  }
  public getRowText(row: number) {
    return `${this.borderChar}${this.display.getRowText(row)}${
      this.borderChar
    }`;
  }
}

class FullBorder extends Border {
  constructor(protected display: Display) {
    super(display);
  }
  public getColumns() {
    return 1 + this.display.getColumns() + 1;
  }
  public getRows() {
    return 1 + this.display.getRows() + 1;
  }
  public getRowText(row: number) {
    if (row === 0) {
      return `+${this.makeLine("-", this.display.getColumns())}+`;
    } else if (row === this.display.getRows() + 1) {
      return `+${this.makeLine("-", this.display.getColumns())}+`;
    } else {
      return `|${this.display.getRowText(row - 1)}|`;
    }
  }
  private makeLine(ch: string, count: number) {
    let buf = "";
    for (let i = 0; i < count; i++) {
      buf += ch;
    }
    return buf;
  }
}
```

```TypeScript:Main.ts
// 動作確認用
const b1: Display = new StringDisplay("A");
const b2: Display = new SideBorder(b1, "#");
const b3: Display = new FullBorder(b2);
b1.show();
b2.show();
b3.show();
const b4: Display = new SideBorder(
  new FullBorder(
    new FullBorder(
      new SideBorder(
        new FullBorder(
          new StringDisplay("Hello, world.")
        ),
        "*"
      )
    ),
  ),
  '/'
);
b4.show()
```

```shell:動作確認結果
# 動作確認結果
$ ts-node sample.ts 
A
#A#
+---+
|#A#|
+---+
/+-------------------+/
/|+-----------------+|/
/||*+-------------+*||/
/||*|Hello, world.|*||/
/||*+-------------+*||/
/|+-----------------+|/
/+-------------------+/
```
  
最後のパターンで、`SideBorder`が`FllBorder`を入れ子しあっています。  
こんなことができるのは、各々のクラスが`Border`クラスを継承しており、`Border`クラスは`Display`クラスを継承しているからです。  
こうやって委譲と継承を組み合わせて、同一視を実現させています。  

## おわりに
小さなクラスがたくさん作られる（飾り付けが多くなる）可能性があるため、注意が必要です。

## 参考文献
- [Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)
