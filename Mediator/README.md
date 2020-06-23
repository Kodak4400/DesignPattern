# TypeScriptで学ぶデザインパターン「Mediator」
## はじめに
本記事は、[Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)の各デザインパターンの題材を`TypeScript`で書いて、個人的な学びを書いています。誤り、勘違い等あれば指摘頂けると助かります。  
  
今回は、「Mediator」です。  

## 「Mediator」パターンとは？
シンプルにするパターンの1つ。大きなプログラムを作っていると、クラス間の連携が大変になってくるため、1人の「相談役」クラスを用意して、その「相談役」を通してクラス間の連携を取る方法です。

## どんな時に使うパターンなのか？
主に以下の用途で使われるケースが多いと思います。  
  
① クラス間でのやり取りが多い場合

## クラス図
![MediatorClassDiagram](https://github.com/Kodak4400/DesignPattern/blob/master/Facade/Facade.png)

- Mediator:「相談役」となるインタフェース。サンプルコードでは、`Mediator`が該当。
- ConcreteMediator: `Mediator`の具体的な内容を定義するクラス。サンプルコードでは、`LoginFrame`が該当。
- Colleague: `Mediator`とのインタフェースを定義するクラス。サンプルコードでは、`Colleague`が該当。
- ConcreteColleague: `Colleague`の具体的な内容を定義するクラス。サンプルコードでは、`ColleagueButton`、`ColleagueTextField`、`ColleagueCheckbox`が該当。

## サンプルコード
```TypeScript:Mediator.ts
interface Mediator {
  createColleagues(): void;
  colleagueChanged(str: string): void;
  colleaguLogin(): void;
}

interface Colleague {
  setMediator(mediator: Mediator): void;
  setColleagueEnabled(enabled: string): void;
}

class ColleagueButton implements Colleague {
  private meadiator: Mediator;
  constructor() {}
  public setMediator(meadiator: Mediator) {
    this.meadiator = meadiator;
  }
  public setColleagueEnabled(enabled: string) {
    console.log(`ColleagueButton: ${enabled}`);
  }
}

class ColleagueCheckbox implements Colleague {
  private meadiator: Mediator;
  private enabled: string;
  constructor() {}
  public setMediator(meadiator: Mediator) {
    this.meadiator = meadiator;
  }
  public setColleagueEnabled(enabled: string) {
    this.enabled = enabled;
    console.log(`ColleagueCheckbox: ${enabled}`);
  }
  public getColleagueEnabled() {
    return this.enabled;
  }
}

class ColleagueTextField implements Colleague {
  private meadiator: Mediator;
  private enabled: string;
  constructor() {}
  public setMediator(meadiator: Mediator) {
    this.meadiator = meadiator;
  }
  public setColleagueEnabled(enabled: string) {
    this.enabled = enabled;
    this.meadiator.colleaguLogin();
  }
  public getColleagueEnabled() {
    return this.enabled;
  }
}

class LoginFrame implements Mediator {
  private checkGuest: ColleagueCheckbox;
  private checkLogin: ColleagueCheckbox;
  private textUser: ColleagueTextField;
  private btnOK: ColleagueButton;
  private btnNG: ColleagueButton;
  constructor(str: string) {
    this.createColleagues();
    this.colleagueChanged(str);
  }
  public createColleagues() {
    this.checkGuest = new ColleagueCheckbox();
    this.checkLogin = new ColleagueCheckbox();
    this.textUser = new ColleagueTextField();
    this.btnOK = new ColleagueButton();
    this.btnNG = new ColleagueButton();
    this.checkGuest.setMediator(this);
    this.checkLogin.setMediator(this);
    this.textUser.setMediator(this);
    this.btnOK.setMediator(this);
    this.btnNG.setMediator(this);
  }
  public colleagueChanged(str: string) {
    if (str) {
      this.checkGuest.setColleagueEnabled("Gest check OK");
      this.checkLogin.setColleagueEnabled("Login check OK");
      this.textUser.setColleagueEnabled(str);
    } else {
      this.checkGuest.setColleagueEnabled("Gest check NG");
      this.checkLogin.setColleagueEnabled("Login check NG");
    }
  }
  public colleaguLogin() {
    if (this.textUser.getColleagueEnabled() === "Gest") {
      this.btnOK.setColleagueEnabled("Gest Button OK");
    } else {
      this.btnNG.setColleagueEnabled("Gest Button NG");
    }
  }
}
```

```TypeScript:Main.ts
// 動作確認用
new LoginFrame("Gest");
console.log("------------------------");
new LoginFrame("");
console.log("------------------------");
new LoginFrame("Hoge");
```

```shell:動作確認結果
# 動作確認結果
$ ts-node sample.ts 
ColleagueCheckbox: Gest check OK
ColleagueCheckbox: Login check OK
ColleagueButton: Gest Button OK
------------------------
ColleagueCheckbox: Gest check NG
ColleagueCheckbox: Login check NG
------------------------
ColleagueCheckbox: Gest check OK
ColleagueCheckbox: Login check OK
ColleagueButton: Gest Button NG
```
  
`Facade`とよく似ていますが、`Facade`一方向にクラスを呼び出して処理していくのに対して、`Mediator`は双方向にクラスを呼び出して処理します。  
良いサンプルコードが書けなかったので、雰囲気だけ掴めるといいかもしれない・・・

## おわりに
こちらも頻繁に出てくるパターンなので、是非覚えておきたい。

## 参考文献
- [Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)
