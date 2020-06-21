# TypeScriptで学ぶデザインパターン「Facade」
## はじめに
本記事は、[Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)の各デザインパターンの題材を`TypeScript`で書いて、個人的な学びを書いています。誤り、勘違い等あれば指摘頂けると助かります。  
  
今回は、「Facade」です。  

## 「Facade」パターンとは？
シンプルにするパターンの1つ。大きなプログラムを作っていると、クラス間の呼び出しの制御が大変になってくるため、1つの「窓口」を用意して、その「窓口」から処理を呼び出すパターン。

## どんな時に使うパターンなのか？
主に以下の用途で使われるケースが多いと思います。  
  
① 複雑な関係を持つクラス軍を簡単に使いたい

## クラス図
![FacadeClassDiagram](https://github.com/Kodak4400/DesignPattern/blob/master/Facade/Facade.png)

- Facade: 「窓口」となるクラス。サンプルコードでは、`PageMaker`が担当。
- class: 複雑な関係を持つクラス軍

## サンプルコード
```TypeScript:Facade.ts
class Database {
    constructor() {}
    public static getProperties() {
        return {
            title: "Yahoo!のアドレスです。",
            msg: "こんにちは。Yahoo!のURLを記載します。",
            href: "https://www.yahoo.com",
            caption: "Yahoo!"
        }
    }
}

class PageMaker {
    constructor() {}
    public static makeWelcomPage(mailaddr: string, username: string) {
        const dbData = Database.getProperties();
        const writer = new HtmlWriter();
        writer.title(dbData.title)
        writer.paragraph(dbData.msg)
        writer.link(dbData.href, dbData.caption)
        writer.mailto(mailaddr, username)
        writer.close()
    }
}

class HtmlWriter {
    constructor() {}
    public title(title: string) {
        console.log("<html>")
        console.log("<head>")
        console.log(`<title>${title}</title>`)
        console.log("</head>")
        console.log("<body>")
        console.log(`<h1>${title}</h1>`)
    }
    public paragraph(msg: string) {
        console.log(`<p>${msg}</p>`)
    }
    public link(href: string, caption: string) {
        console.log(`<a href=${href}>${caption}</a>`)
    }
    public mailto(mailaddr: string, username: string) {
        console.log(`<a href=mailto:${mailaddr}>${username}</a>`)
    }
    public close() {
        console.log("</body>")
        console.log("</html>")
    }
}
```

```TypeScript:Main.ts
// 動作確認用
PageMaker.makeWelcomPage("hyuki@hyuki.com", "Kodak")
```

```shell:動作確認結果
# 動作確認結果
$ ts-node sample.ts 
<html>
<head>
<title>Yahoo!のアドレスです。</title>
</head>
<body>
<h1>Yahoo!のアドレスです。</h1>
<p>こんにちは。Yahoo!のURLを記載します。</p>
<a href=https://www.yahoo.com>Yahoo!</a>
<a href=mailto:hyuki@hyuki.com>Kodak</a>
</body>
</html>
```
  
ポイントは、`Facade`を使用する時はインタフェースを少なくすることです。
クラスやメソッドがたくさん見えていると、どれを使えばよいか迷います。また、呼び出しの順番にも気をつけなくてはなりません。複雑な関係を持つクラス軍の実装はそういった間違ってしまう要素を可能な限り除外して実装するのが良いとされています。  

## おわりに
これは頻繁に出てくるパターンなので、是非覚えておきたい。

## 参考文献
- [Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88-Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9-ebook/dp/B00I8ATHGW/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80&qid=1588525185&sr=8-1)
