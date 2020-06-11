
interface Printable {
  setPrinterName(name: string): void;
  getPrinterName(): string;
  print(str: string): void;
}

class Printer implements Printable {
  constructor(private name: string) {
    this.heavyJob(`Printerインスタンス${this.name}を生成`);
  }
  public setPrinterName(name: string) {
    this.name = name;
  }
  public getPrinterName() {
    return this.name;
  }
  public print(str: string) {
    console.log(`=== ${this.name} ===`);
    console.log(str);
  }
  private heavyJob(msg: string) {
    console.log(msg);
  }
}

class PrinterProxy implements Printable {
  constructor(private name: string) {}
  private real: Printer;
  public setPrinterName(name: string) {
    if(this.real) {
      this.real.setPrinterName(name);
    }
    this.name = name;
  }
  public getPrinterName() {
    return this.name;
  }
  public print(str: string) {
    this.realize();
    this.real.print(str);
  }
  private realize() {
    if(!this.real) {
      this.real = new Printer(this.name);
    }
  }
}

const p: Printable = new PrinterProxy("Alice");
console.log(`### ${p.getPrinterName()} ###`);
p.setPrinterName("Bob");
console.log(`### ${p.getPrinterName()} ###`);
p.print("Hello, world.");
