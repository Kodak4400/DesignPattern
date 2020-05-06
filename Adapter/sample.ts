class AdapterSampleClass {
    constructor(public msg: string) {}

    public getMessage() {
        return this.msg
    }

    public getAdapterSampleClassMessage() {
        return 'I am AdapterSampleClass Message.'
    }
}

interface Target {
    targetFunction1(): void;
    targetFunction2(): void;
}

class Adapter implements Target {
    private createAdapterSampleInstance: AdapterSampleClass

    constructor() {}

    public createAdapterSample(msg: string) {
        this.createAdapterSampleInstance = new AdapterSampleClass(msg)
    }

    targetFunction1() {
        console.log(this.createAdapterSampleInstance.getMessage())
    }

    targetFunction2() {
        console.log(this.createAdapterSampleInstance.getAdapterSampleClassMessage())
    }
}


const adapter = new Adapter()
adapter.createAdapterSample('hoge')
adapter.targetFunction1()
adapter.targetFunction2()
