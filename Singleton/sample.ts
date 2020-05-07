class Singleton {
  private static instance: Singleton;

  private constructor() {
    console.log('インスタンスを生成しました。')
  }

  public static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}


const ins1 = Singleton.getInstance()
const ins2 = Singleton.getInstance()

if (ins1 === ins2) {
  console.log('同じインスタンス')
} else {
  console.log('異なるインスタンス')
}
