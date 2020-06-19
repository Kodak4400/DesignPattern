# TypeScriptで学ぶデザインパターン「Composite」
## はじめに
本記事は、[Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)の各デザインパターンの題材を`TypeScript`で書いて、個人的な学びを書いています。誤り、勘違い等あれば指摘頂けると助かります。  
  
今回は、「Composite」です。  

## 「Composite」パターンとは？
同一視するパターンの1つ。「容器」と「中身」を同一視し、再帰的な構造を作ります。たとえば、ファイルシステムの「ディレクトリ（容器）」のように「ディレクトリ（容器）」と「ファイル（容器）」は別物ですが、「ディレクトリ（容器）」も「ディレクトリ（容器）」の中に入れることができます。そんな入れ子になった構造、再帰的な構造を作るパターンです。  

## どんな時に使うパターンなのか？
主に以下の用途で使われるケースが多いと思います。  
  
① 再帰的な構造を作りたい。
  

## クラス図
![CompositeClassDiagram](https://github.com/Kodak4400/DesignPattern/blob/master/Composite/Composite.png)

- Component: LeafとCompositeを同一視するためのクラスです。サンプルコードでは、`Entry`が該当。
- Composite: 「容器」のクラスです。サンプルコードでは、`Directory`が該当。
- Leaf: 「中身」のクラスです。。サンプルコードでは、`File`が該当。

## サンプルコード
```TypeScript:Composite.ts
abstract class Entry {
  constructor() {}
  public abstract getName(): string;
  public abstract getSize(): number;
  public add(entry: Entry) {
    throw new Error();
  }
  public printList() {
    this.print("");
  }
  public abstract print(prefix: string): void;
  public toString() {
    return `${this.getName()}(${this.getSize()})`;
  }
}

class Directory extends Entry {
  private directory: Entry[] = [];
  constructor(private name: string) {
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
  public print(prefix: string) {
    console.log(`${prefix}/${this}`);
    if (this.directory.length) {
      this.directory.forEach((entry) => {
        entry.print(`${prefix}/${this.name}`);
      });
    }
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
  public print(prefix: string) {
    console.log(`${prefix}/${this}`);
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
bindir.add(new Files("latex", 20000));
tmpdir.add(new Files("diary.html", 100));
tmpdir.add(new Files("Composite.java", 200));
usrdir.add(new Files("memo.tex", 500))
rootdir.printList();
```

```shell:動作確認結果
# 動作確認結果
$ ts-node sample.ts 
/root(30800)
/root/bin(30000)
/root/bin/vi(10000)
/root/bin/latex(20000)
/root/tmp(300)
/root/tmp/diary.html(100)
/root/tmp/Composite.java(200)
/root/usr(500)
/root/usr/memo.tex(500)
```
  
addの実装方法に注目です。抽象クラス上でエラーにしておくことで、addクラスをオーバーライドさせないと使えないものにしています。  

## おわりに
再帰的構造はあらゆる場面で登場するため、是非覚えておきたい。

## 参考文献
- [Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)
