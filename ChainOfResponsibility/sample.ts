class Trouble {
  constructor(private num: number) {}
  public getNumber() {
    return this.num;
  }
  public toString() {
    return `[Trouble ${this.num}]`;
  }
}

abstract class Support {
  private next: Support;
  constructor(private name: string) {}

  public setNext(next: Support) {
    this.next = next;
    return this.next;
  }
  public support(trouble: Trouble) {
    if (this.resolve(trouble)) {
      this.done(trouble);
    } else if (this.next != null) {
      this.next.support(trouble);
    } else {
      this.fail(trouble);
    }
  }
  public toString() {
    return `[${this.name}]`;
  }
  protected abstract resolve(trouble: Trouble);
  protected done(trouble: Trouble) {
    console.log(`${trouble} is resolved by ${this}.`);
  }
  protected fail(trouble: Trouble) {
    console.log(`${trouble} cannot be resolved.`);
  }
}

class NoSupport extends Support {
  constructor(name: string) {
    super(name);
  }
  protected resolve(trouble: Trouble) {
    return false;
  }
}

class LimitSupport extends Support {
  constructor(name: string, private limit: number) {
    super(name);
  }
  protected resolve(trouble: Trouble) {
    return trouble.getNumber() < this.limit ? true : false;
  }
}

class SpecialSupport extends Support {
  constructor(name: string, private num: number) {
    super(name);
  }
  protected resolve(trouble: Trouble) {
    return trouble.getNumber() === this.num ? true : false;
  }
}

class OddSupport extends Support {
  constructor(name: string) {
    super(name);
  }
  protected resolve(trouble: Trouble) {
    return trouble.getNumber() % 2 === 1 ? true : false;
  }
}

const alice: Support = new NoSupport("Alice");
const bob: Support = new LimitSupport("Bob", 100);
const charlie: Support = new SpecialSupport("Charlie", 429);
const diana: Support = new LimitSupport("Diana", 200);
const elmo: Support = new OddSupport("Elmo");
const fred: Support = new LimitSupport("Fred", 300);

alice.setNext(bob).setNext(charlie).setNext(diana).setNext(elmo).setNext(fred)
for(let i = 0; i < 500; i += 33) {
    alice.support(new Trouble(i))
}
