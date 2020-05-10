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
rootdir.add(bindir);
bindir.add(new Files("vi", 10000));
rootdir.printList();
