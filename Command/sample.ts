class Receiver {
  constructor() {}
  public action(msg: string) {
    console.log(msg);
  }
}

interface Command {
  setReceiver(receriver: Receiver): void;
  execute(): void;
}

class ConcreteCommand implements Command {
  constructor(private msg: string) {}
  receiver: Receiver;
  public setReceiver(receriver: Receiver) {
    this.receiver = receriver;
  }
  public execute() {
    this.receiver.action(this.msg);
  }
}

class Invoker {
  private commands: Command[] = [];
  public addCommand(command: Command) {
    this.commands.push(command);
  }
  public execute() {
    this.commands.forEach( e => {
      e.execute();
    })
  }
}

const receiver = new Receiver;
const invoker = new Invoker;

const c1: Command = new ConcreteCommand("Input Command c1");
c1.setReceiver(receiver);
const c2: Command = new ConcreteCommand("Input Command c2");
c2.setReceiver(receiver);

invoker.addCommand(c1);
invoker.addCommand(c2);

invoker.execute();
