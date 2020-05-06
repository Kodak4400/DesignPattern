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

