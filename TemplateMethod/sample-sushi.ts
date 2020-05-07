abstract class SushiTemplate {
  protected resultProcess: number = 0;

  constructor(
    protected vinegar: string,
    protected sugar: string,
    protected salt: string,
    protected rice: string
  ) {}

  protected sushiVinegar() {
    console.log("#--- 1.寿司酢を作ります ---#");
    console.log(`酢：${this.vinegar}を鍋に入れました。`);
    console.log(`砂糖：${this.sugar}を鍋に入れました。`);
    console.log(`塩：${this.salt}を鍋に入れました。`);
    console.log("弱火で加熱しながら、よく混ぜて完成。");

    return 1;
  }

  protected sushiRice(previous: number) {
    if (previous === 1) {
      console.log("#--- 2.寿司飯を作ります ---#");
      console.log(`ご飯：${this.rice}を寿司桶に入れました。`);
      console.log("寿司酢と混ぜ合わせ完成。");
    } else {
      throw new Error("前の工程が完了していません。");
    }

    return 2;
  }

  protected sushiTopping(previous: number, topping: string[]) {
    if (previous === 2) {
      console.log("#--- 3.ネタを用意します ---#");
      topping.forEach((t) => {
        console.log(`${t}を用意しました。`);
      });
    } else {
      throw new Error("前の工程が完了していません。");
    }

    return 3;
  }

  public abstract create(topping: string[]): void;
}

class Sushi extends SushiTemplate {
  constructor(vinegar: string, sugar: string, salt: string, rice: string) {
    super(vinegar, sugar, salt, rice);
  }

  create(topping: string[]) {
    let result = this.sushiVinegar();
    this.sushiTopping(this.sushiRice(result), topping);
    console.log("#--- 3.握って完成 ---#");
  }
}

const sushi = new Sushi("80cc", "50g", "20g", "3合");
sushi.create(["マグロ"])
