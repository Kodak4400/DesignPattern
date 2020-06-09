
class BigCharFactory {
  private constructor() { }
  private pool = new Map<string, BigChar>();
  private static singleton = new BigCharFactory();
  public static getInstance() {
    return this.singleton;
  }
  public getBigChar(str: string) {
    let bc = this.pool.get(str)
    if (!bc) {
      bc = new BigChar(str);
      this.pool.set(str, bc)
    }
    return bc;
  }
  public getMap() {
    this.pool.forEach( (value, key) => {
      console.log("[" + key + ", " + value + "]" );
    })
  }
}

class BigChar {
  constructor(private charname: string) {}
  public print() {
    console.log(this.charname);
  }
}

class BigString {
  private factory: BigCharFactory;
  private bc: BigChar;
  constructor(str: string) {
    this.factory = BigCharFactory.getInstance();
    this.bc = this.factory.getBigChar(str);
  }
  public print() {
    this.factory.getMap();
    this.bc.print();
  }
}

const bs1 = new BigString("123");
const bs2 = new BigString("123");
const bs3 = new BigString("1");
const bs4 = new BigString("123");
bs4.print();
