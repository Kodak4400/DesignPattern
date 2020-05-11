// interface IteratorResult<T> {
//   done: boolean;
//   value: T;
// }

// interface Iterator<T> {
//   next(value?: any): IteratorResult<T>;
//   return?(value?: any): IteratorResult<T>;
//   throw?(e?: any): IteratorResult<T>;
// }

interface Aggregate<T> {
  iterator(): Iterator<T>;
}

class AppleProduct implements Aggregate<Product> {
  private product: Product[] = [];

  constructor() {}

  public show(i: number) {
    return this.product[i]
  }

  public add(p: Product) {
    this.product.push(p)
  }

  public getLength() {
    return this.product.length
  }

  public iterator(): Iterator<Product> {
    return new AppleProductIterator(this)
  }
}

class AppleProductIterator implements Iterator<Product>{
  private pointer = 0;

  constructor(private appleproduct : AppleProduct) {}

  public next(): IteratorResult<Product> {
    if (this.pointer < this.appleproduct.getLength()) {
      return {
        done: false,
        value: this.appleproduct.show(this.pointer++),
      };
    } else {
      return {
        done: true,
        value: 'データなし'
      };
    }
  }
}

class Product {
  constructor(public name: string) {}
}

const mac = new AppleProduct()
mac.add(new Product("macbook"))
mac.add(new Product("macbook pro"))
mac.add(new Product("macbook air"))
mac.add(new Product("mac mini"))
const itr = mac.iterator();
console.log(itr.next())
console.log(itr.next())
console.log(itr.next())
console.log(itr.next())
console.log(itr.next())
