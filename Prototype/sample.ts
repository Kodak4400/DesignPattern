interface ProtoType {
  use(str: string): void;
  createClone(): ProtoType;
}

class ConcreteProtoType implements ProtoType {
  constructor(private decorate: string) {}
  public use(str: string) {
    console.log(`${this.decorate}- ${str} -${this.decorate}`);
  }
  public createClone(): ProtoType {
    return Object.create(this); // 自分のインスタンスを作成する。シャローコピーです。
  }
}

class Manager {
  constructor() {}
  private incStorage: { [key: string]: ProtoType } = {};
  public register(name: string, p: ProtoType) {
    this.incStorage[name] = p;
  }
  public create(name: string): ProtoType {
    const p: ProtoType = this.incStorage[name];
    return p.createClone();
  }
}

const m = new Manager();
const protoType: ProtoType = new ConcreteProtoType("@");
protoType.use("protoTypeInstancMessage");

m.register("pInstanceCopy", protoType);

const protoTypeClone: ProtoType = m.create("pInstanceCopy");
protoTypeClone.use("protoTypeCloneInstancMessage");
