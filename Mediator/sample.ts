interface Mediator {
  createColleagues(): void;
  colleagueChanged(): void;
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
  constructor() {}
  public setMediator(meadiator: Mediator) {
    this.meadiator = meadiator;
  }
  public setColleagueEnabled(enabled: string) {
    console.log(`ColleagueCheckbox: ${enabled}`);
  }
}

class ColleagueTextField implements Colleague {
  private meadiator: Mediator;
  constructor() {}
  public setMediator(meadiator: Mediator) {
    this.meadiator = meadiator;
  }
  public setColleagueEnabled(enabled: string) {
    console.log(`ColleagueTextField: ${enabled}`);
  }
}

class LoginFrame implements Mediator {
  private checkGuest: ColleagueCheckbox
  private checkLogin: ColleagueCheckbox
  private textUser: ColleagueTextField
  private textPass: ColleagueTextField
  private btnOK: ColleagueButton
  private btnNG: ColleagueButton
  constructor() {
    this.createColleagues()
    this.colleagueChanged()
  }
  public createColleagues() {
      this.checkGuest = new ColleagueCheckbox()
      this.checkLogin = new ColleagueCheckbox()
      this.textUser = new ColleagueTextField()
      this.textPass = new ColleagueTextField()
      this.btnOK = new ColleagueButton()
      this.btnNG = new ColleagueButton()
      this.checkGuest.setMediator(this)
      this.checkLogin.setMediator(this)
      this.textUser.setMediator(this)
      this.textPass.setMediator(this)
      this.btnOK.setMediator(this)
      this.btnNG.setMediator(this)
  }
  public colleagueChanged() {
      this.checkGuest.setColleagueEnabled("checkGuest")
      this.checkLogin.setColleagueEnabled("checkLogin")
      this.textUser.setColleagueEnabled("textUser")
      this.textPass.setColleagueEnabled("textPass")
      this.btnOK.setColleagueEnabled("btnOK")
      this.btnNG.setColleagueEnabled("btnNG")
  }
}

new LoginFrame()
