abstract class Product {
    constructor() {}
    public abstract use(): void;
}

abstract class Factory {
    constructor() {}
    public create(msg: string): Product {
        const productInstance: Product = this.createProduct(msg)
        this.registerProduct(productInstance)
        return productInstance
    }
    protected abstract createProduct(msg: string): Product
    protected abstract registerProduct(productInstance: Product): void
}

class concreteProduct {
    constructor(private msg: string) {}
    public use() {
        console.log(`Message: ${this.msg}`)
    }
    public getMessage() {
        return this.msg
    }
}

class concreteFactory extends Factory {
    constructor(private messages: string[] = []) {
        super()
    }
    protected createProduct(msg: string) {
        return new concreteProduct(msg)
    }
    protected registerProduct(productInstance: concreteProduct) {
        this.messages.push(productInstance.getMessage())
    }
    public getMessages() {
        console.log(this.messages)
    }
}

const factory = new concreteFactory
const factorySampleInstance1 = factory.create('おはようございます')
const factorySampleInstance2 = factory.create('こんにちは')
const factorySampleInstance3 = factory.create('さようなら')
factorySampleInstance1.use()
factorySampleInstance2.use()
factorySampleInstance3.use()
factory.getMessages()