class sampleClass {
  private static instance: sampleClass;

  constructor() {}

  static getInstance() {
    if (!sampleClass.instance) {
      sampleClass.instance = new sampleClass();
    }
    return sampleClass.instance;
  }
}

const ins1 = sampleClass.getInstance()
const ins2 = sampleClass.getInstance()
if (ins1 === ins2) {
  console.log('同じインスタンス')
} else {
  console.log('異なるインスタンス')
}
