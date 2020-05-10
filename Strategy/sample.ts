interface Strategy {
  nextHand(): Hand;
  study(win: boolean): void;
}

class WinningStrategy implements Strategy {
  private won = false;
  private prevHand: Hand;

  constructor(private seed: number) {}

  public nextHand() {
    if (!this.won) {
      this.prevHand = Hand.getHand(Math.floor(Math.random() * Math.floor(3)));
    } else {
      this.prevHand = Hand.getHand(this.seed);
    }
    return this.prevHand;
  }

  public study(win: boolean) {
    this.won = win;
  }
}

class ProbStrategy implements Strategy {
  private prevHandValue = 0;
  private currentHandValue = 0;
  private history: number[][] = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ];

  constructor(private seed: number) {}

  public nextHand() {
    let bet = Math.floor(
      Math.random() * Math.floor(this.getSum(this.currentHandValue))
    );
    let handvalue = 0;
    if (bet < this.history[this.currentHandValue][0]) {
      handvalue = 0;
    } else if (
      bet <
      this.history[this.currentHandValue][0] +
        this.history[this.currentHandValue][1]
    ) {
      handvalue = 1;
    } else {
      handvalue = 2;
    }
    this.prevHandValue = this.currentHandValue;
    this.currentHandValue = handvalue;
    return Hand.getHand(handvalue);
  }

  private getSum(hv: number) {
    let sum = 0;
    for (let i = 0; i < 3; i++) {
      sum += this.history[hv][i];
    }
    return sum;
  }

  public study(win: boolean) {
    if (win) {
      this.history[this.prevHandValue][this.currentHandValue]++;
    } else {
      this.history[this.prevHandValue][(this.currentHandValue + 1) % 3]++;
      this.history[this.prevHandValue][(this.currentHandValue + 2) % 3]++;
    }
  }
}

class Hand {
  public static HANDVALUE_GUU = 0;
  public static HANDVALUE_CHO = 1;
  public static HANDVALUE_PAA = 2;
  public static hand: Hand[] = [
    new Hand(Hand.HANDVALUE_GUU),
    new Hand(Hand.HANDVALUE_CHO),
    new Hand(Hand.HANDVALUE_PAA),
  ];

  private static names: string[] = ["グー", "チョキ", "パー"];

  private constructor(private handvalue: number) {}

  public static getHand(handvalue: number) {
    return this.hand[handvalue];
  }

  public isStrongerThan(h: Hand) {
    return this.fight(h) === 1;
  }

  public isWeakerThan(h: Hand) {
    return this.fight(h) === -1;
  }

  private fight(h: Hand) {
    if (this === h) {
      return 0;
    } else if ((this.handvalue + 1) % 3 === h.handvalue) {
      return 1;
    } else {
      return -1;
    }
  }

  public toString(): string {
    return Hand.names[this.handvalue];
  }
}

class Player {
  private wincount: number = 0;
  private losecount: number = 0;
  private gamecount: number = 0;

  constructor(public name: string, private strategy: Strategy) {}

  public nextHand() {
    return this.strategy.nextHand();
  }

  public win() {
    this.strategy.study(true);
    this.wincount++;
    this.gamecount++;
  }

  public lose() {
    this.strategy.study(false);
    this.losecount++;
    this.gamecount++;
  }

  public even() {
    this.gamecount++;
  }

  public toString(): string {
    return `${this.name}: ${this.gamecount}games, ${this.wincount}win, ${this.losecount}lose`;
  }
}

const player1: Player = new Player("Taro", new WinningStrategy(1));
const player2: Player = new Player("Hana", new ProbStrategy(1));


for (let i = 0; i < 50; i++) {
  let nextHand1: Hand = player1.nextHand();
  let nextHand2: Hand = player2.nextHand();
  
  console.log(`Taro:${nextHand1.toString()}`);
  console.log(`Hana:${nextHand2.toString()}`);

  console.log("--- Fight Result ----");
  if (nextHand1.isStrongerThan(nextHand2)) {
    console.log(`結果: Winner: ${player1.name}`);
    player1.win();
    player2.lose();
  } else if (nextHand2.isStrongerThan(nextHand1)) {
    console.log(`結果: Winner: ${player2.name}`);
    player2.win();
    player1.lose();
  } else {
    console.log("結果: Even...");
    player1.even();
    player2.even();
  }
}
console.log("--- Total Result ----");
console.log(player1.toString());
console.log(player2.toString());
