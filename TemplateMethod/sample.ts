abstract class AbstractDisplay {
  constructor() {}
  public abstract open(): void;
  public abstract print(): void;
  public abstract close(): void;
  public display() {
    this.open();
    for (let i = 0; i < 2; i++) {
      this.print();
    }
    this.close();
  }
}

class CharDisplay extends AbstractDisplay {
  constructor(private ch: string) {
    super();
  }

  public open() {
    console.log("<<");
  }

  public print() {
    console.log(this.ch);
  }

  public close() {
    console.log(">>");
  }
}

class StringDisplay extends AbstractDisplay {
  private width: number;
  constructor(private str: string) {
    super();
    this.width = str.length;
  }

  public open() {
    this.printLine();
  }

  public print() {
    console.log(`|${this.str}|`);
  }

  public close() {
    this.printLine();
  }

  private printLine() {
    let frame = "+";
    for (let i = 0; i < this.width; i++) {
      frame += "-";
    }
    frame += "+";
    console.log(frame);
  }
}

const d1: AbstractDisplay = new CharDisplay("H");
const d2: AbstractDisplay = new StringDisplay("Hello, world.");
const d3: AbstractDisplay = new StringDisplay("hogefuga");

d1.display();
d2.display();
d3.display();
