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
        ['a4', 'a5', 'a6'],
        ['a7', 'a8', 'a9'],

        // Vertical
        ['a1', 'a4', 'a7'],
        ['a2', 'a5', 'a8'],
        ['a3', 'a6', 'a9'],

        // Diagonal
        ['a1', 'a5', 'a9'],
        ['a3', 'a5', 'a7']
      ]
    }
  },
  methods: {
    personSwal(result) {
      Swal.fire({
        title: result != 'Tie' ? `The player ${result} wins` : "There's no winner",
        icon: result != 'Tie' ? 'success' : 'question',
        iconHtml: result != 'Tie' ? result : '!',
        confirmButtonColor: '#474d52ff',
        confirmButtonText: 'Play again',
        backdrop: result != 'Tie' ? `
            rgba(0,0,123,0.4)
            url("https://sweetalert2.github.io/images/nyan-cat.gif")
            left top
            no-repeat
        ` : ''
      }).then((confirm) => {
        if (confirm) window.location.reload(true)
      })
    },
    checkWinner() {
      // checking if the current player has made any matches
      this.combinations.forEach((item, index) => {
        if ( item.every(combo => this.inGame.positionsX.includes(combo)) ) this.inGame.result = 'X'
        if ( item.every(combo => this.inGame.positionsO.includes(combo)) ) this.inGame.result = 'O'
      })

      // winner X
      if (this.inGame.result == 'X') this.personSwal('X')

      // winner O
      if (this.inGame.result == 'O') this.personSwal('O')

      // tie
      if (
        this.inGame.positionsX.length >= 4 &&
        this.inGame.positionsO.length > 4 &&
        this.inGame.result != 'X' &&
        this.inGame.result != 'O'
      )
        this.personSwal('Tie')
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
