# TypeScriptで学ぶデザインパターン「State」
## はじめに
本記事は、[Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)の各デザインパターンの題材を`TypeScript`で書いて、個人的な学びを書いています。誤り、勘違い等あれば指摘頂けると助かります。  
  
今回は、「State」です。  

## 「State」パターンとは？
オブジェクトの状態変化に応じて処理するためのパターンの1つ。

## どんな時に使うパターンなのか？
主に以下の用途で使われるケースが多いと思います。  
  
① オブジェクト指向のプログラムでアンドュ（前の状態に戻したり、進めたり）したい。

「状態」をクラスとして表現したもの。

## クラス図
![StateClassDiagram](https://github.com/Kodak4400/DesignPattern/blob/master/State/State.png)

- State:「状態」のクラスです。状態に依存した振る舞いをするメソッドの集まりです。サンプルコードでは、`State`が該当。
- ConcreteState:`State`の具体的な処理を実装します。サンプルコードでは、`DayState`と`NightState`が該当。
- Context: 現在の状態を表します。`State`を利用するために必要なインタフェースを定義します。サンプルコードでは、`Context`が該当
- ConcreteContext:`Context`の具体的な処理を実装します。サンプルコードでは、`SafeFrame`が該当。

## サンプルコード
```TypeScript:State.ts
interface State {
  doClock(context: Context, hour: number): void;
  doUse(context: Context): void;
  doAlarm(context: Context): void;
  doPhone(contet: Context): void;
}

interface Context {
  setClock(hour: number): void;
  changeState(state: State): void;
  callSecurityCenter(msg: string): void;
  recordLog(msg: string): void;
}

class DayState implements State {
  private constructor() {}
  private static singleton = new DayState();
  public static getInstance() {
    return this.singleton;
  }
  public doClock(context: Context, hour: number) {
    if ( 5 > hour || hour >= 17 ) {
      context.changeState(NightState.getInstance());
    }
  }
  public doUse(context: Context) {
    context.recordLog("昼の警備です。");
  }
  public doAlarm(context: Context) {
    context.callSecurityCenter("昼のアラームです。");
  }
  public doPhone(context: Context) {
    context.callSecurityCenter("昼の電話です。");
  }
}

class NightState implements State {
  private constructor() {}
  private static singleton = new NightState();
  public static getInstance() {
    return this.singleton;
  }
  public doClock(context: Context, hour: number) {
    if ( 5 < hour && hour <= 17 ) {
      context.changeState(DayState.getInstance());
    }
  }
  public doUse(context: Context) {
    context.recordLog("夜の警備です。");
  }
  public doAlarm(context: Context) {
    context.callSecurityCenter("夜のアラームです。");
  }
  public doPhone(context: Context) {
    context.callSecurityCenter("夜の電話です。");
  }
}

class SafeFrame implements Context {
  constructor() {}
  private state: State = DayState.getInstance();
  public actionPerformed() {
    this.state.doUse(this);
    this.state.doAlarm(this);
    this.state.doPhone(this);
  }
  public setClock(hour: number) {
    this.state.doClock(this, hour);
  }
  public changeState(state: State) {
    this.state = state;
  }
  public callSecurityCenter(msg: string) {
    console.log(msg);
  }
  public recordLog(msg: string) {
    console.log(msg);
  }
}
```

```TypeScript:Main.ts
// 動作確認用
const frame = new SafeFrame();
frame.setClock(10);
frame.actionPerformed();
frame.setClock(18);
frame.actionPerformed();
```

```shell:動作確認結果
# 動作確認結果
$ ts-node sample.ts 
昼の警備です。
昼のアラームです。
昼の電話です。
夜の警備です。
夜のアラームです。
夜の電話です。
```
  
`Context`はインタフェースにしなくても良いのですが、インタフェースにして具体的な処理を分けて書くこともできます。  
`setClock`からの`doClock`で状態を切り替えていることがわかります。  
簡単そうにみえますが、この1クラスだけで状態の切り替えができるのはすごい・・・(= = ;;)  

## おわりに
これは使えるっ

## 参考文献
- [Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)
