var Connect4 = {
  init: function() {
    Connect4.symbols = ["red", "blue"];
    Connect4.squares = Array.from(document.querySelectorAll(".square"));
    Connect4.turnIndicator = document.querySelector(".turnIndicator");
    Connect4.button = document.querySelector(".newGame");
    Connect4.board = document.querySelector(".board");
    Connect4.winningSets = [
      // all horizontal
      [0, 1, 2, 3],
      [1, 2, 3, 4],
      [2, 3, 4, 5],
      [3, 4, 5, 6],
      [7, 8, 9, 10],
      [8, 9, 10, 11],
      [9, 10, 11, 12],
      [10, 11, 12, 13],
      [14, 15, 16, 17],
      [15, 16, 17, 18],
      [16, 17, 18, 19],
      [17, 18, 19, 20],
      [21, 22, 23, 24],
      [22, 23, 24, 25],
      [23, 24, 25, 26],
      [24, 25, 26, 27],
      [28, 29, 30, 31],
      [29, 30, 31, 32],
      [30, 31, 32, 33],
      [31, 32, 33, 34],
      [35, 36, 37, 38],
      [36, 37, 38, 39],
      [37, 38, 39, 40],
      [38, 39, 40, 41],
      // all vertical
      [0, 7, 14, 21],
      [1, 8, 15, 22],
      [2, 9, 16, 23],
      [3, 10, 17, 24],
      [4, 11, 18, 25],
      [5, 12, 19, 26],
      [6, 13, 20, 27],
      [7, 14, 21, 28],
      [8, 15, 22, 29],
      [9, 16, 23, 30],
      [10, 17, 24, 31],
      [11, 18, 25, 32],
      [12, 19, 26, 33],
      [13, 20, 27, 34],
      [14, 21, 28, 35],
      [15, 22, 29, 36],
      [16, 23, 30, 37],
      [17, 24, 31, 38],
      [18, 25, 32, 39],
      [19, 26, 33, 40],
      [20, 27, 34, 41],
      // top left to bott right
      [0, 8, 16, 24],
      [1, 9, 17, 25],
      [2, 10, 18, 26],
      [3, 11, 19, 27],
      [7, 15, 23, 31],
      [8, 16, 24, 32],
      [9, 17, 25, 33],
      [10, 18, 26, 34],
      [14, 22, 30, 38],
      [15, 23, 31, 39],
      [16, 24, 32, 40],
      [17, 25, 33, 41],
      // top right to bott left
      [3, 9, 15, 21],
      [4, 10, 16, 22],
      [5, 11, 17, 23],
      [6, 12, 18, 28],
      [10, 16, 22, 28],
      [11, 17, 23, 29],
      [12, 18, 24, 30],
      [13, 19, 25, 35],
      [17, 23, 29, 35],
      [18, 24, 30, 36],
      [19, 25, 31, 37],
    ];
    Connect4.addEventListeners();
    Connect4.newGame();
  },

  addEventListeners: function() {
    var ct4 = this;
    this.squares.forEach(function(x) {
      x.addEventListener("click", function() {
        ct4.play(this);
      })
    })
    this.button.addEventListener("click", function() {
      ct4.newGame();
    })
  },

  newGame: function() {
    this.activePlayer = 0;
    this.gameOver = false;
    this.squares.forEach(function (x) {
      x.classList.remove("red");
      x.classList.remove("blue");
    })
    this.board.classList.remove("gameOver");
    this.setTurnIndicator();
  },

  setTurnIndicator: function() {
    this.turnIndicator.innerText = this.symbols[this.activePlayer] + "'s turn.";
  },

  play: function(el) {
    // Return early if the game is over
    if (this.gameOver) return;

    // Determine which column was clicked
    const column = this.getColumn(el);

    // Find the lowest empty square in that column
    const targetSquare = this.getLowestEmptySquare(column);
  
    // If no empty square found, just return
    if (!targetSquare) return;

    // Set the contents to the current player's color
    targetSquare.classList.add(this.symbols[this.activePlayer]);

    // Check if the current player won
    if (this.checkWin()) {
        this.turnIndicator.innerText = this.symbols[this.activePlayer] + " wins!";
        this.endGame();
    } 
    // Check if there's a draw
    else if (this.checkDraw()) {
        this.turnIndicator.innerText = "It's a draw!";
        this.endGame();
    } 
    // Switch to the next player's turn
    else {
        this.activePlayer = 1 - this.activePlayer;
        this.setTurnIndicator();
    }
  },

  getColumn: function(el) {
      const index = this.squares.indexOf(el);
      return index % 7;  // Assuming a 7x6 board
  },

  getLowestEmptySquare: function(column) {
      for (let i = 5; i >= 0; i--) {  // Starting from the bottom row
          const square = this.squares[i * 7 + column];
          if (square.classList.length === 1) { // If the square is empty
              return square;
          }
      }
      return null;  // Column is full
  },

  checkWin: function() {
    var ct4 = this;
    return this.winningSets.some(function(x) {
      return x.every(function(i) {
        return Array.from(ct4.squares[i].classList).indexOf(ct4.symbols[ct4.activePlayer]) > -1;
      })
    })
  },

  checkDraw: function() {
    return this.squares.every(function(x) {
      return x.classList.length > 1;
    })
  },

  endGame: function() {
    this.gameOver = true;
    this.board.classList.add("gameOver");
  }
}

window.onload = Connect4.init