// interface IteratorResult<T> {
//   done: boolean;
//   value: T;
// }

// interface Iterator<T> {
//   next(value?: any): IteratorResult<T>;
//   return?(value?: any): IteratorResult<T>;
//   throw?(e?: any): IteratorResult<T>;
// }

class Component {
  constructor(public name: string) {}
}

class AppleProduct implements Iterator<Component> {
  private pointer = 0;

  constructor(public name: string, public components: Component[]) {}

  public next(): IteratorResult<Component> {
    if (this.pointer < this.components.length) {
      return {
        done: false,
        value: this.components[this.pointer++],
      };
    } else {
      return {
        done: true,
        value: 'データなし'
      };
    }
  }
}

let mac = new AppleProduct("mac", [new Component("macbook"), new Component("macbook pro"), new Component("macbook air"), new Component("mac mini")]);
console.log(mac.next())
console.log(mac.next())
console.log(mac.next())
console.log(mac.next())
console.log(mac.next())


