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
