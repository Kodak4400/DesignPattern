interface State {
  doClock(context: Context, hour: number): void;
  doUse(context: Context): void;
  doAlarm(context: Context): void;
  doPhone(contet: Context): void;
}

interface Context {
  setClock(hour: number): void;
  changeState(state: State): void;
  callSecurityCenter(msg: string): void;
  recordLog(msg: string): void;
}

class DayState implements State {
  private constructor() {}
  private static singleton = new DayState();
  public static getInstance() {
    return this.singleton;
  }
  public doClock(context: Context, hour: number) {
    if ( 5 > hour || hour >= 17 ) {
      context.changeState(NightState.getInstance());
    }
  }
  public doUse(context: Context) {
    context.recordLog("昼の警備です。");
  }
  public doAlarm(context: Context) {
    context.callSecurityCenter("昼のアラームです。");
  }
  public doPhone(context: Context) {
    context.callSecurityCenter("昼の電話です。");
  }
}

class NightState implements State {
  private constructor() {}
  private static singleton = new NightState();
  public static getInstance() {
    return this.singleton;
  }
  public doClock(context: Context, hour: number) {
    if ( 5 < hour && hour <= 17 ) {
      context.changeState(DayState.getInstance());
    }
  }
  public doUse(context: Context) {
    context.recordLog("夜の警備です。");
  }
  public doAlarm(context: Context) {
    context.callSecurityCenter("夜のアラームです。");
  }
  public doPhone(context: Context) {
    context.callSecurityCenter("夜の電話です。");
  }
}

class SafeFrame implements Context {
  constructor() {}
  private state: State = DayState.getInstance();
  public actionPerformed() {
    this.state.doUse(this);
    this.state.doAlarm(this);
    this.state.doPhone(this);
  }
  public setClock(hour: number) {
    this.state.doClock(this, hour);
  }
  public changeState(state: State) {
    this.state = state;
  }
  public callSecurityCenter(msg: string) {
    console.log(msg);
  }
  public recordLog(msg: string) {
    console.log(msg);
  }
}

const frame = new SafeFrame();
frame.setClock(10);
frame.actionPerformed();
frame.setClock(18);
frame.actionPerformed();

