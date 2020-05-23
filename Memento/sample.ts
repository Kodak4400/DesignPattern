class Memento {
  constructor(public money: number, private fruits: string[] = []) {}
  public getMoney() {
    return this.money;
  }
  public addFruits(fruit: string) {
    this.fruits.push(fruit);
  }
  public getFruits() {
    return this.fruits;
  }
}

class Gamer {
  constructor(private money: number) {}
  private fruits: string[] = [];
  private static fruitsname: string = "フルーツ";
  public getMoney() {
    return this.money;
  }
  public bet() {
    let dice = Math.floor(Math.random() * 6) + 1;
    console.log(`ダイス：${dice}`);
    if (dice === 1) {
      this.money += 100;
      console.log("お金＋100を得た");
    } else if (dice === 2) {
      this.money /= 2;
      console.log("お金が半分になった");
    } else if (dice === 6) {
      let f = this.getFruit();
      console.log("フルーツを得た");
      this.fruits.push(f);
    } else {
      console.log("何も得なかった");
    }
  }
  public createMemento() {
    const m = new Memento(this.money);
    this.fruits.forEach((f) => {
      m.addFruits(f);
    });
    return m;
  }
  public restorMemento(memento: Memento) {
    this.money = memento.money;
    this.fruits = memento.getFruits();
  }
  public toString() {
    return `[money = ${this.money}, fruits = ${this.fruits}]`;
  }
  private getFruit() {
    return Gamer.fruitsname;
  }
}

const gamer = new Gamer(100);
let memento = gamer.createMemento();
for (let i = 0; i < 20; i++) {
  gamer.bet();
  console.log(`現在のお金：${gamer.getMoney()}、Mementoにあるお金：${memento.getMoney()}`);

  if (gamer.getMoney() > memento.getMoney()) {
    memento = gamer.createMemento();
  } else if (gamer.getMoney() <= memento.getMoney() / 2) {
    gamer.restorMemento(memento);
  }
}
