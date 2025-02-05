// Deal 26 Cards to each Player from a Deck of 52 cards.
// Iterate through the turns where each Player plays a Card.
// The Player who played the higher card is awarded a point.
// -Ties result in zero points for both Players.
// After all cards have been played, display the score and declare the winner.

// The following is extra credit (10pts)
// Write a Unit Test using Mocha and Chai for at least one of the functions you write.

// grab two player button

let id = 0;
window.addEventListener("load", () => {
  document.getElementById('btn-1').addEventListener("click", () => {
  let game = new warGame();
  game.twoPlayerGame();
  })

  document.getElementById('btn-2').addEventListener("click", () => {
    let game = new warGame();
    game.fourPlayerGame();
  })

  // variable for table




  // Deck Class
  // ---------------
  // 52 cards
  class Deck {
    // each deck of cards has 52 cards
    constructor() {
      this.deck = [];
      this.rank = [
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "Jack",
        "Queen",
        "King",
        "Ace",
      ];
      this.suit = ["Spades ♠️", "Hearts ♥️", "Diamonds ♦️", "Clubs ♣️"];
    }

    // Building the deck
    createDeck() {
      // deck array
      // need each rank to have one of each suit
      // could use a for loop nested in a for loop
      for (let i = 0; i < this.suit.length; i++) {
        for (let j = 0; j < this.rank.length; j++) {
          let card = {
            name: `${this.rank[j]} of ${this.suit[i]}`,
            value: j + 1,
          };
          // add cards to the deck
          this.deck.push(card);
        }
      }
      return this.deck;
    }

    // Shuffle the deck
    shuffle() {
      //iterate through the deck of cards
      for (let i = this.deck.length - 1; i > 0; i--) {
        // using Fisher-Yates shuffle algorithm to shuffle the deck of cards
        const j = Math.floor(Math.random() * (i + 1));

        // Swap the elements of the array
        [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
      }
    }

    // deal cards to each player
    dealToPlayers(numPlayers, cardsPerPlayer) {
      // determine there are enough cards for each player
      if (this.deck.length < numPlayers * cardsPerPlayer) {
        document.getElementById('alert').innerHTML = "Not enough cards in the deck";
        return;
      }

      this.playerHands = Array(numPlayers);

      for (let i = 0; i < numPlayers; i++) {
        this.playerHands[i] = this.deck.slice(
          cardsPerPlayer * i,
          cardsPerPlayer * (i + 1)
        );
      }
      return this.playerHands;
    }
  }

  // class to actually play the game.

  class warGame {
    constructor() {
      // create players
      this.player1 = {
        name: "Player 1",
        score: 0,
        hand: [],
      };
      this.player2 = {
        name: "Player 2",
        score: 0,
        hand: [],
      };
      this.player3 = {
        name: "Player 3",
        score: 0,
        hand: [],
      };
      this.player4 = {
        name: "Player 4",
        score: 0,
        hand: [],
      };

      // make a players array
      this.players = [this.player1, this.player2, this.player3, this.player4]
    }

    twoPlayerGame() {
      // instantiate new deck, create deck, then shuffle
      let deck = new Deck();
      deck.createDeck();
      deck.shuffle();
      let hands = deck.dealToPlayers(2, 26);

      // actually dealing to players
      this.player1.hand = hands[0];
      this.player2.hand = hands[1];

      // playing the game
      for (let i = 0; i < this.player1.hand.length; i++) {
        // conditional for awarding points based on compared card value.
        let table = document.getElementById("card-table")
        let row = table.insertRow(1);
        row.setAttribute("id", `item-${id}`);
        // variable for finding largest card
        let maxValue = Math.max(this.player1.hand[i].value, this.player2.hand[i].value);
        // tie
        if (this.player1.hand[i].value === this.player2.hand[i].value) {
          row.insertCell(0).innerHTML = `Tie: No points awarded.`

          // player 1 wins
        } else if (maxValue === this.player1.hand[i].value) {
          this.player1.score++

          row.insertCell(0).innerHTML = `${this.player1.name} card: ${this.player1.hand[i].name}
                    ${this.player2.name} card: ${this.player2.hand[i].name}
                    ${this.player1.name} wins a point
                    Current Score: ${this.player1.name}: ${this.player1.score}, ${this.player2.name}: ${this.player2.score}
                    `
          // player 2 wins
        } else if (maxValue === this.player2.hand[i].value) {
          this.player2.score++
          row.insertCell(0).textContent = `${this.player1.name} card: ${this.player1.hand[i].name}
                    ${this.player2.name} card: ${this.player2.hand[i].name}
                    ${this.player2.name} wins a point
                    Current Score: ${this.player1.name}: ${this.player1.score}, ${this.player2.name}: ${this.player2.score}
                    `;
        }
      }
      let table = document.getElementById("card-table")
      let row = table.insertRow(1);
      row.setAttribute("id", `item-${id}`);
      // calculate score and alert
      if (this.player1.score > this.player2.score) {
        row.insertCell(0).innerHTML = (`Player 1 wins!
              Final Score: Player 1: ${this.player1.score} 
                          Player 2: ${this.player2.score}
              `);
      } else if (this.player2.score > this.player1.score) {
        row.insertCell(0).innerHTML =(`Player 2 wins!
              Final Score: Player 1: ${this.player1.score} 
                          Player 2: ${this.player2.score}
              `);
      } else {
        row.insertCell(0).innerHTML = (`Tie`);
      }
    }

    fourPlayerGame() {
      let deck = new Deck();
      deck.createDeck();
      deck.shuffle();
      let hands = deck.dealToPlayers(4, 13);
      console.log(hands);
      // actually dealing to players
      this.player1.hand = hands[0];
      this.player2.hand = hands[1];
      this.player3.hand = hands[2];
      this.player4.hand = hands[3];

      // playing the game
      for (let i = 0; i < this.player1.hand.length; i++) {
        // conditional for awarding points based on compared card value.
        let table = document.getElementById("card-table")
        let row = table.insertRow(1);
        row.setAttribute("id", `item-${id}`);
        // hold all values of all player's cards
        let values = [
          this.player1.hand[i].value,
          this.player2.hand[i].value,
          this.player3.hand[i].value,
          this.player4.hand[i].value
        ];
        // variable for finding largest card
        let maxValue = Math.max(this.player1.hand[i].value, this.player2.hand[i].value, this.player3.hand[i].value, this.player4.hand[i].value);
          // Check how many players have the max value
        let countMaxValue = values.filter(value => value === maxValue).length;

        // If more than one player has the max value, it's a tie (no points).
        if (countMaxValue > 1) {
          row.insertCell(0).innerHTML = `${this.player1.name} card: ${this.player1.hand[i].name}
                      ${this.player2.name} card: ${this.player2.hand[i].name}
                      ${this.player3.name} card: ${this.player3.hand[i].name}
                      ${this.player4.name} card: ${this.player4.hand[i].name}
                      Tie: No points awarded.
                      Current Score: ${this.player1.name}: ${this.player1.score}, ${this.player2.name}: ${this.player2.score}, ${this.player3.name}: ${this.player3.score}, ${this.player4.name}: ${this.player4.score}`;
        } else {
          // If there's no tie, the player with the highest card wins a point.
          if (this.player1.hand[i].value === maxValue) {
            this.player1.score++;
            row.insertCell(0).innerHTML = `${this.player1.name} card: ${this.player1.hand[i].name}
                        ${this.player2.name} card: ${this.player2.hand[i].name}
                        ${this.player3.name} card: ${this.player3.hand[i].name}
                        ${this.player4.name} card: ${this.player4.hand[i].name}
                        ${this.player1.name} wins a point
                        Current Score: ${this.player1.name}: ${this.player1.score}, ${this.player2.name}: ${this.player2.score}, ${this.player3.name}: ${this.player3.score}, ${this.player4.name}: ${this.player4.score}`;
          } else if (this.player2.hand[i].value === maxValue) {
            this.player2.score++;
            row.insertCell(0).innerHTML = `${this.player1.name} card: ${this.player1.hand[i].name}
                        ${this.player2.name} card: ${this.player2.hand[i].name}
                        ${this.player3.name} card: ${this.player3.hand[i].name}
                        ${this.player4.name} card: ${this.player4.hand[i].name}
                        ${this.player2.name} wins a point
                        Current Score: ${this.player1.name}: ${this.player1.score}, ${this.player2.name}: ${this.player2.score}, ${this.player3.name}: ${this.player3.score}, ${this.player4.name}: ${this.player4.score}`;
          } else if (this.player3.hand[i].value === maxValue) {
            this.player3.score++;
            row.insertCell(0).innerHTML = `${this.player1.name} card: ${this.player1.hand[i].name}
                        ${this.player2.name} card: ${this.player2.hand[i].name}
                        ${this.player3.name} card: ${this.player3.hand[i].name}
                        ${this.player4.name} card: ${this.player4.hand[i].name}
                        ${this.player3.name} wins a point
                        Current Score: ${this.player1.name}: ${this.player1.score}, ${this.player2.name}: ${this.player2.score}, ${this.player3.name}: ${this.player3.score}, ${this.player4.name}: ${this.player4.score}`;
          } else if (this.player4.hand[i].value === maxValue) {
            this.player4.score++;
            row.insertCell(0).innerHTML =`${this.player1.name} card: ${this.player1.hand[i].name}
                        ${this.player2.name} card: ${this.player2.hand[i].name}
                        ${this.player3.name} card: ${this.player3.hand[i].name}
                        ${this.player4.name} card: ${this.player4.hand[i].name}
                        ${this.player4.name} wins a point
                        Current Score: ${this.player1.name}: ${this.player1.score}, ${this.player2.name}: ${this.player2.score}, ${this.player3.name}: ${this.player3.score}, ${this.player4.name}: ${this.player4.score}`;
          }
    }
  }
      let table = document.getElementById("card-table")
      let row = table.insertRow(1);
      row.setAttribute("id", `item-${id}`);

      let maxScore = Math.max(this.player1.score, this.player2.score, this.player3.score, this.player4.score);

      // find top players
      let topPlayers = this.players.filter(player => player.score === maxScore);

      if (topPlayers.length > 1) {
        // tie if more than one plaer has the top card.
        row.insertCell(0).innerHTML = (`Tie!`)
      } else {

        // highest card wins
        let winner = topPlayers[0];

        row.insertCell(0).innerHTML = `${winner.name} wins!
                  Final Scores:
                  ${this.players.map(player => `${player.name}: ${player.score}`).join('\n')}
              `;
      }

      
    }
  }
})
// Menu Class

