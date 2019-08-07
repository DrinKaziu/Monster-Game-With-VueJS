new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false
  },
  methods: {
    startGame() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    calculateBlow(minBlow, maxBlow) {
      return Math.max(Math.floor(Math.random() * maxBlow) + 1, minBlow);
    },
    monsterAttack() {
      this.playerHealth -= this.calculateBlow(5, 12);
    },
    attack() {
      this.monsterHealth -= this.calculateBlow(3, 10);
      if(this.checkWin()) {
        return 
      }
      this.monsterAttack()
      this.checkWin()
    },
    specialAttack() {
      this.monsterHealth -= this.calculateBlow(10, 20);
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
      this.monsterAttack();
    }, 
    giveUp() {

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