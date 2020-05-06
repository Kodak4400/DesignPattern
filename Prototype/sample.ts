
interface protoType {
    use(str: string): void
    createClone(): protoType
}

class concretePrototype implements protoType {
    constructor(private char: string) {}

    public use(str: string) {
        console.log(`${this.char}-${str}-${this.char}`)
    }

    public createClone(): protoType {
        return Object.create(this)
    }
}

class manager {
    private showcase: { [key: string]: protoType } = {}

    constructor() {}

    public register(name: string, prototype: protoType) {
        this.showcase[name] = prototype
    }

    public create(name: string): protoType {
        const p: protoType = this.showcase[name]
        return p.createClone()
    }
}

const m = new manager()

const cPrototype: protoType = new concretePrototype('@')
cPrototype.use('aaaaa')
m.register('hoge', cPrototype)

const ccPrototype: protoType = m.create('hoge')
ccPrototype.use('aaaa')
