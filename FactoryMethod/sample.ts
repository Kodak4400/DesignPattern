class factorySampleClass {
    constructor(private msg: string) {}

    public use() {
        console.log(`Message: ${this.msg}`)
    }

    public getMessage() {
        return this.msg
    }
}

abstract class Factory {
    protected abstract createFactorySample(msg: string)
    protected abstract registerFactorySample(factorySampleInstance: factorySampleClass)

    constructor() {}

    public create(msg: string): factorySampleClass {
        const factorySampleInstance = this.createFactorySample(msg)
        this.registerFactorySample(factorySampleInstance)
        return factorySampleInstance
    }
}

class subFactory extends Factory {
    private messages: string[] = []

    constructor() {
        super()
    }

    protected createFactorySample(msg: string) {
        return new factorySampleClass(msg)
    }

    protected registerFactorySample(factorySampleInstance: factorySampleClass) {
        this.messages.push(factorySampleInstance.getMessage())
    }

    public getMessages() {
        console.log(this.messages)
    }
}

const factory = new subFactory
const factorySampleInstance1 = factory.create('hoge')
const factorySampleInstance2 = factory.create('fuga')
const factorySampleInstance3 = factory.create('piyo')
factorySampleInstance1.use()
factorySampleInstance2.use()
factorySampleInstance3.use()
factory.getMessages()