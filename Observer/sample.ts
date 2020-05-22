interface Observer {
  update(generator: NumberGenerator): void;
}

abstract class NumberGenerator {
  private observers: Observer[] = [];
  public addObserver(observer: Observer) {
    this.observers.push(observer);
  }
  public deleteObserver(observer: Observer) {
    if (this.observers.indexOf(observer) !== -1) {
      this.observers.splice(this.observers.indexOf(observer));
    }
  }
  public notifyObservers() {
    this.observers.forEach((o) => {
      o.update(this);
    });
  }
  public abstract getNumber(): number;
  public abstract execute(): void;
}

class RandomNumberGenerator extends NumberGenerator {
  private num: number;
  constructor() {
    super();
  }
  public getNumber() {
    return this.num;
  }
  public execute() {
    for (let i = 0; i < 10; i++) {
      this.num = Math.floor(Math.random() * 51);
      this.notifyObservers();
    }
  }
}

class DigitObserver implements Observer {
  constructor() {}
  public update(generator: NumberGenerator) {
    console.log(`DigitObserver: ${generator.getNumber()}`);
  }
}

class GraphObserver implements Observer {
  constructor() {}
  public update(generator: NumberGenerator) {
    let str = "GraphObserver: ";
    for (let i = 0; i <= generator.getNumber(); i++) {
      str += "*";
    }
    console.log(str);
  }
}

const generator: NumberGenerator = new RandomNumberGenerator();
const observer1: Observer = new DigitObserver();
const observer2: Observer = new GraphObserver();
generator.addObserver(observer1);
generator.addObserver(observer2);
generator.execute();
