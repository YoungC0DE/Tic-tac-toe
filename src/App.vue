<style>
@import '@/assets/App.css';
</style>
<template>
  <main>
    <h1>Tic Tac Toe</h1>
    <section>
      <div v-for="(item, index) in 9" :key="index" v-on:click="game(item)" :id="'a' + item"></div>
    </section>
    <h2>
      Player's turn:
      <span :style="'color:' + (inGame.playerTurn == 'X' ? 'blue' : 'red')">
        {{ inGame.playerTurn }}</span
      >
    </h2>
  </main>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      inGame: {
        playerTurn: 'X', // X or O
        result: '', // X, O, Tie
        busyBlocks: [],
        positionsX: [],
        positionsO: []
      },
      combinations: [
        // Horizontal
        ['a1', 'a2', 'a3'],
        ['b1', 'b2', 'b3'],
        ['c1', 'c2', 'c3'],

        // Vertical
        ['a1', 'b1', 'c1'],
        ['a2', 'b2', 'c2'],
        ['a3', 'b3', 'c3'],

        // Diagonal
        ['a1', 'b2', 'c3'],
        ['a3', 'b2', 'c1']
      ]
    }
  },
  methods: {
    personSwal() {
      Swal.fire({
        title:
          this.inGame.result != 'Tie'
            ? `The player ${this.inGame.result} wins`
            : "There's no winner",
        icon: this.inGame.result != 'Tie' ? 'success' : 'question',
        iconHtml: this.inGame.result != 'Tie' ? this.inGame.result : '!',
        confirmButtonColor: '#474d52ff',
        confirmButtonText: 'Play again',
        backdrop: `
            rgba(0,0,123,0.4)
            url("https://sweetalert2.github.io/images/nyan-cat.gif")
            left top
            no-repeat
        `
      }).then((confirm) => {
        if (confirm) window.location.reload(true)
      })
    },
    checkWinner() {
      // checking if the current player has made any matches
      for (let i = 0; i < this.combinations.length; i++) {
        if (this.combinations[i].every((item) => this.inGame.positionsX.includes(item))) {
          this.inGame.result = 'X'
        }
        
        if (this.combinations[i].every((item) => this.inGame.positionsO.includes(item))) {
          this.inGame.result = 'O'
        }
      }

      // winner X
      if (this.inGame.result == 'X') this.personSwal()

      // winner O
      if (this.inGame.result == 'O') this.personSwal()

      // tie
      if (
        this.inGame.positionsX.length >= 4 &&
        this.inGame.positionsO.length > 4 &&
        this.inGame.result != 'X' &&
        this.inGame.result != 'O'
      )
        this.personSwal()
      return
    },
    game(el) {
      // check if the clicked block is busy
      if (this.inGame.busyBlocks.find((e) => e == `a${el}`) != `a${el}`) {
        // add to a busy block
        this.inGame.busyBlocks.push(`a${el}`)
        // change the player after play
        if (this.inGame.playerTurn == 'X') {
          this.inGame.playerTurn = 'O'
          this.inGame.positionsO.push(`a${el}`)
        } else {
          this.inGame.playerTurn = 'X'
          this.inGame.positionsX.push(`a${el}`)
        }

        // blocking the clicked block
        document
          .querySelector(`#a${el}`)
          .classList.add(`show${this.inGame.playerTurn}`, 'disabled-block')
        // set X or O as text in clicked block
        document.getElementById(`a${el}`).innerHTML = this.inGame.playerTurn
      }
      this.checkWinner()
    }
  }
}
</script>
