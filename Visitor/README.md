# TypeScriptで学ぶデザインパターン「Visitor」
## はじめに
本記事は、[Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)の各デザインパターンの題材を`TypeScript`で書いて、個人的な学びを書いています。誤り、勘違い等あれば指摘頂けると助かります。  
  
今回は、「Visitor」です。  

## 「Visitor」パターンとは？
構造を渡り歩くパターンの1つ。データ構造と処理を分離し、データ構造の中を渡り歩くVisitor（訪問者）を用意して、そのクラスに処理をまかせるパターンです。

## どんな時に使うパターンなのか？
主に以下の用途で使われるケースが多いと思います。  
  
① 部品の独立性を高めたい。  
② 既存の処理に影響を与えずに機能追加したい。  

## クラス図
![VisitorClassDiagram](https://github.com/Kodak4400/DesignPattern/blob/master/Visitor/Visitor.png)

- Visitor: 「訪問者」の抽象クラス。サンプルコードでは、`Visitor`が担当。
- ConcreteVisitor: `Visitor`の具体的な処理を表すクラス。サンプルコードでは、`ListVisitor`が担当。
- Element: `Visitor`の訪問先を表すクラス。サンプルコードでは、`Item`、`Entry`が担当
- ConcreteElementA: `Element`の具体的な処理を表すクラス。サンプルコードでは、`File`や`Directory`が担当。
- ConcreteElementB: 同上。
- ObjectStructure: `Element`の集合を扱うクラス。サンプルコードでは、`Directory`が担当（一人二役です）。

## サンプルコード
```TypeScript:Visitor.ts
abstract class Visitor {
  constructor() {}
  public abstract visitFile(file: Files): void;
  public abstract visitDirectory(directory: Directory): void;
}

interface Item {
  accept(v: Visitor): void;
}

abstract class Entry implements Item {
  constructor() {}
  public abstract getName(): string;
  public abstract getSize(): number;
  public next(): Entry {
    return this
  };
  public abstract accept(v: Visitor): void;
  public toString() {
    return `${this.getName()}(${this.getSize()})`;
  }
}

class Directory extends Entry {
  constructor(private name: string, private directory: Entry[] = [], private pointer: number = 0) {
    super();
  }
  public getName() {
    return this.name;
  }
  public getSize() {
    let size = 0;
    if (this.directory.length) {
      this.directory.forEach((entry) => {
        size += entry.getSize();
      });
    }
    return size;
  }

  public add(entry: Entry) {
    this.directory.push(entry);
    return this;
  }
  public hasNext() {
    return this.pointer < this.directory.length
  }
  public next() {
    return this.directory[this.pointer++]
  }
  public accept(v: Visitor) {
    v.visitDirectory(this);
  }
}

class Files extends Entry {
  constructor(private name: string, private size: number) {
    super();
  }
  public getName() {
    return this.name;
  }
  public getSize() {
    return this.size;
  }
  public accept(v: Visitor) {
    v.visitFile(this);
  }
}

class ListVisitor extends Visitor {
  constructor(private currentdir: string = "") {
    super();
  }
  public visitFile(file: Files) {
    console.log(`${this.currentdir}/${file}`);
  }
  public visitDirectory(directory: Directory) {
    console.log(`${this.currentdir}/${directory}`);
    let sevedir = this.currentdir;
    this.currentdir = `${this.currentdir}/${directory.getName()}`;
    while (directory.hasNext()) {
      const en: Entry = directory.next()
      en.accept(this)
    }
    this.currentdir = sevedir
  }
}
```

```TypeScript:Main.ts
// 動作確認用
const rootdir: Directory = new Directory("root");
const bindir: Directory = new Directory("bin");
const tmpdir: Directory = new Directory("tmp");
const usrdir: Directory = new Directory("usr");
rootdir.add(bindir);
rootdir.add(tmpdir);
rootdir.add(usrdir);
bindir.add(new Files("vi", 10000));
bindir.add(new Files("a", 10000));
bindir.add(new Files("b", 10000));
tmpdir.add(new Files("c", 10000));
tmpdir.add(new Files("d", 10000));
usrdir.add(new Files("e", 10000));
rootdir.accept(new ListVisitor());
```

```shell:動作確認結果
# 動作確認結果
$ ts-node sample.ts 
/root(60000)
/root/bin(30000)
/root/bin/vi(10000)
/root/bin/a(10000)
/root/bin/b(10000)
/root/tmp(20000)
/root/tmp/c(10000)
/root/tmp/d(10000)
/root/usr(10000)
/root/usr/e(10000)
```
  
ポイントは、データ構造と処理をちゃんと分離できているところです。  
つまり、処理は`Visitor`と`ConcreteVisitor（ListVisitor）`にしか書かれていません。  
データ構造と処理を分離できていることで、処理の修正がデータ構造に影響しないため、新たな処理の追加が容易になります。

## おわりに
今まで何度か出てきたデータ構造と処理の分離・・・これは実践でも活かせるようにならなくてはならない・・・

## 参考文献
- [Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)
