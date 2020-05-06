abstract class DisplayImpl {
  public abstract rawOpen(): void;
  public abstract rawPrint(): void;
  public abstract rawClose(): void;
}

class StringDisplayImpl extends DisplayImpl {
  constructor(private str: string) {
    super();
  }

  public rawOpen() {
    this.printLine();
  }

  public rawPrint() {
    console.log(`| ${this.str} |`);
  }

  public rawClose() {
    this.printLine();
  }

  private printLine() {
    let line = '+ ';
    for (let i = 0; i < this.str.length; i++) {
      line += '-';
    }
    line += ' +';
    console.log(line)
  }
}

class Display {
  constructor(protected impl: DisplayImpl) {}

  public open() {
    this.impl.rawOpen();
  }

  public print() {
    this.impl.rawPrint();
  }

  public close() {
    this.impl.rawClose();
  }

  public display() {
    this.open();
    this.print();
    this.close();
  }
}

class CountDisplay extends Display {
  constructor(protected impl: DisplayImpl) {
    super(impl);
  }

  public multiDisplay(times: number) {
    this.open();
    for (let i = 0; i < times; i++) {
      this.print();
    }
    this.close();
  }
}


const d1: Display = new Display(new StringDisplayImpl("Hello, Japan."))
const d2: Display = new CountDisplay(new StringDisplayImpl("Hello, World."))
const d3: CountDisplay = new CountDisplay(new StringDisplayImpl("Hello, Universe."))
d1.display();
d2.display();
d3.display();
d3.multiDisplay(5);
