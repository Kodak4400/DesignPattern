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
