# DesignPatternまとめ

[Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)の各デザインパターンの題材を`TypeScript`で書いたサンプルを格納しています。

## 環境

- Node.js: v12.xx.xx
- yarn: 1.21.1
- typescript: 3.8.3
- ts-node: 8.9.1

## 各デザインパターンのサンプルコード実行方法
各パターン名のフォルダー内にある`sample.ts`を`ts-node`で実行する。

```
ts-node sample.ts
```

## 各デザインパターンの一覧とリンク

### デザインパターンに慣れる
- [Iterator](https://github.com/Kodak4400/DesignPattern/blob/master/Iterator) ・・・ 1つ1つ数え上げる
- [Adapter](https://github.com/Kodak4400/DesignPattern/blob/master/Adapter) ・・・ 1皮かぶせて再利用

### サブクラスにまかせる
- [Template Method](https://github.com/Kodak4400/DesignPattern/blob/master/TemplateMethod) ・・・ 具体的な処理をサブクラスにまかせる
- [Factory Method](https://github.com/Kodak4400/DesignPattern/blob/master/FactoryMethod) ・・・ インスタンス作成をサブクラスにまかせる

### インスタンスを作る
- [Singleton](https://github.com/Kodak4400/DesignPattern/blob/master/Singleton) ・・・ たった1つのインスタンス
- [Prototype](https://github.com/Kodak4400/DesignPattern/blob/master/Prototype) ・・・ コピーしてインスタンスを作る
- [Builder](https://github.com/Kodak4400/DesignPattern/blob/master/Builder) ・・・ 複雑なインスタンスを組み立てる
- [Abstract Factory](https://github.com/Kodak4400/DesignPattern/blob/master/AbstractFactory) ・・・ 関連する部品を組み合わせて製品を作る

### 分けて考える
- [Bridge](https://github.com/Kodak4400/DesignPattern/blob/master/Bridge) ・・・ 機能の階層と実装の階層を分ける
- [Strategy](https://github.com/Kodak4400/DesignPattern/blob/master/Strategy) ・・・ アルゴリズムをごっそり切り替える

### 同一視
- [Composite](https://github.com/Kodak4400/DesignPattern/blob/master/Composite) ・・・ 容器の中身と同一視
- [Decorator](https://github.com/Kodak4400/DesignPattern/blob/master/Decorator) ・・・ 飾り枠と中身の同一視

### 構造を渡り歩く
- [Visitor](https://github.com/Kodak4400/DesignPattern/blob/master/Visitor) ・・・ 構造を渡り歩きながら仕事をする
- [Chain of Responsibility](https://github.com/Kodak4400/DesignPattern/blob/master/ChainOfResponsibility) ・・・ 責任のたらい回し

### シンプルにする
- [Facade](https://github.com/Kodak4400/DesignPattern/blob/master/Facade) ・・・ シンプルな窓口
- [Mediator](https://github.com/Kodak4400/DesignPattern/blob/master/Mediator) ・・・ 相手は相談役一人だけ

### 状態を管理する
- [Observer](https://github.com/Kodak4400/DesignPattern/blob/master/Observer) ・・・ 状態の変化を通知する
- Memento ・・・ 状態を保存する
- State ・・・ 状態をクラスとして表現する

### ムダをなくす
- Flyweight ・・・ 同じものを共有してムダをなくす
- Proxy ・・・ 必要になってから作る

### クラスで表現する
- Command ・・・ 命令をクラスにする
- Interpreter ・・・ 文法規則をクラスで表現する
