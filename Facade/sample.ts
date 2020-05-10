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


PageMaker.makeWelcomPage("hyuki@hyuki.com", "Kodak")