interface Mediator {
  createColleagues(): void;
  colleagueChanged(str: string): void;
  colleaguLogin(): void;
}

interface Colleague {
  setMediator(mediator: Mediator): void;
  setColleagueEnabled(enabled: string): void;
}

class ColleagueButton implements Colleague {
  private meadiator: Mediator;
  constructor() {}
  public setMediator(meadiator: Mediator) {
    this.meadiator = meadiator;
  }
  public setColleagueEnabled(enabled: string) {
    console.log(`ColleagueButton: ${enabled}`);
  }
}

class ColleagueCheckbox implements Colleague {
  private meadiator: Mediator;
  private enabled: string;
  constructor() {}
  public setMediator(meadiator: Mediator) {
    this.meadiator = meadiator;
  }
  public setColleagueEnabled(enabled: string) {
    this.enabled = enabled;
    console.log(`ColleagueCheckbox: ${enabled}`);
  }
  public getColleagueEnabled() {
    return this.enabled;
  }
}

class ColleagueTextField implements Colleague {
  private meadiator: Mediator;
  private enabled: string;
  constructor() {}
  public setMediator(meadiator: Mediator) {
    this.meadiator = meadiator;
  }
  public setColleagueEnabled(enabled: string) {
    this.enabled = enabled;
    this.meadiator.colleaguLogin();
  }
  public getColleagueEnabled() {
    return this.enabled;
  }
}

class LoginFrame implements Mediator {
  private checkGuest: ColleagueCheckbox;
  private checkLogin: ColleagueCheckbox;
  private textUser: ColleagueTextField;
  private btnOK: ColleagueButton;
  private btnNG: ColleagueButton;
  constructor(str: string) {
    this.createColleagues();
    this.colleagueChanged(str);
  }
  public createColleagues() {
    this.checkGuest = new ColleagueCheckbox();
    this.checkLogin = new ColleagueCheckbox();
    this.textUser = new ColleagueTextField();
    this.btnOK = new ColleagueButton();
    this.btnNG = new ColleagueButton();
    this.checkGuest.setMediator(this);
    this.checkLogin.setMediator(this);
    this.textUser.setMediator(this);
    this.btnOK.setMediator(this);
    this.btnNG.setMediator(this);
  }
  public colleagueChanged(str: string) {
    if (str) {
      this.checkGuest.setColleagueEnabled("Gest check OK");
      this.checkLogin.setColleagueEnabled("Login check OK");
      this.textUser.setColleagueEnabled(str);
    } else {
      this.checkGuest.setColleagueEnabled("Gest check NG");
      this.checkLogin.setColleagueEnabled("Login check NG");
    }
  }
  public colleaguLogin() {
    if (this.textUser.getColleagueEnabled() === "Gest") {
      this.btnOK.setColleagueEnabled("Gest Button OK");
    } else {
      this.btnNG.setColleagueEnabled("Gest Button NG");
    }
  }
}

new LoginFrame("Gest");
console.log("------------------------");
new LoginFrame("");
console.log("------------------------");
new LoginFrame("Hoge");
