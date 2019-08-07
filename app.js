new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    calculateBlow(minBlow, maxBlow) {
      return Math.max(Math.floor(Math.random() * maxBlow) + 1, minBlow);
    },
    monsterAttack() {
      let blow = this.calculateBlow(5, 12)
      this.playerHealth -= blow;
      this.turns.unshift({
        isPlayer: false,
        text: "Monster hits Player for " + blow
      })
    },
    attack() {
      let blow = this.calculateBlow(3, 10);
      this.monsterHealth -= blow;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits Monster for " + blow
      })
      if(this.checkWin()) {
        return 
      }
      this.monsterAttack()
      this.checkWin()
    },
    specialAttack() {
      let blow = this.calculateBlow(10, 20);
      this.monsterHealth -= blow;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits Monster HARD for " + blow
      })
      if(this.checkWin()) {
        return 
      }
      this.monsterAttack()
      this.checkWin()
    }, 
    heal() {
      if(this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: "Player heals for for 10"
      })
      this.monsterAttack();
    }, 
    giveUp() {
      this.gameIsRunning = false; 
    },
    checkWin() {
      if(this.monsterHealth <= 0) {
        if(confirm("You won!! New Game?")) {
          this.startGame()
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if(this.playerHealth <= 0) {
        if(confirm("You Lost!! New Game?")) {
          this.startGame()
        } else {
          this.gameIsRunning = false;
        }
        return true; 
      }
      return false
    }
  }
})