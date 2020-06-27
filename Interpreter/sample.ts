class Context {
  constructor(private text: string[]) {}
  private pointer = 0;
  public next() {
    if (this.pointer < this.text.length) {
      this.pointer++;
    } else {
      console.log("Error: No Text Data.");
    }
  }
  public skip(msg: string) {
    if (msg === this.text[this.pointer]) {
      this.next();
    } else {
      console.log("Warning: No matches found");
    }
  }
  public current() {
    return this.text[this.pointer];
  }
  public show() {
    console.log(this.text[this.pointer]);
  }
}

abstract class AbstractEcptrddion {
  constructor() {}
  abstract interpret(context: Context): void;
}

class NoterminalExpression extends AbstractEcptrddion {
  constructor() {
    super();
  }
  public interpret(context: Context) {
    context.skip("Start");
    const commandParse = new CommandParse();
    commandParse.interpret(context);
  }
}

class CommandParse extends AbstractEcptrddion {
  constructor() {
    super();
  }
  public interpret(context: Context) {
    while (context.current()) {
      if (context.current() === "End") {
        const terminal = new TerminalExpression();
        terminal.interpret(context);
      } else {
        context.show();
        context.next();
      }
    }
  }
}

class TerminalExpression extends AbstractEcptrddion {
  constructor() {
    super();
  }
  public interpret(context: Context) {
    context.skip("End");
    console.log("=== 終了 ===")
  }
}

let text1 = ["Start", "End"];
const node1: AbstractEcptrddion = new NoterminalExpression();
node1.interpret(new Context(text1));

let text2 = ["Start", "1", "2", "End"];
const node2: AbstractEcptrddion = new NoterminalExpression();
node2.interpret(new Context(text2));
