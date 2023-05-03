let deckId = 's4tm16lwq6xd'

document.querySelector('#drawTwo').addEventListener('click', drawTwo)
document.querySelector('#war').addEventListener('click', drawWar)
document.querySelector('#start').addEventListener('click', newGame)

function drawWar(cardOne, cardTwo){
  const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=8`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector('#playerOne').src = data.cards[0].image
        document.querySelector('#playerTwo').src = data.cards[1].image
        document.querySelector('#playerOneWarTwo').src = data.cards[4].image
        document.querySelector('#playerOneWarThree').src = data.cards[2].image
        document.querySelector('#playerOneWarFour').src = data.cards[3].image
        document.querySelector('#playerTwoWarTwo').src = data.cards[5].image
        document.querySelector('#playerTwoWarThree').src = data.cards[6].image
        document.querySelector('#playerTwoWarFour').src = data.cards[7].image

        if (data.cards[0].value > data.cards[1].value){
          fetch(`https://deckofcardsapi.com/api/deck/${deckId}/pile/playerOne/add/?cards=${cardOne},${cardTwo}`)
              .then(res => res.json()) // parse response as JSON
              .then(pileData => {
                console.log(pileData)
            })
            .catch(err => {
              console.log(`error ${err}`)
            }); 
          for (let i = 0; i < 8; i++){
            fetch(`https://deckofcardsapi.com/api/deck/${deckId}/pile/playerOne/add/?cards=${data.cards[i].code}`)
              .then(res => res.json()) // parse response as JSON
              .then(pileData => {
                console.log(pileData)
            })
            .catch(err => {
              console.log(`error ${err}`)
            }); 
          }
        }
        else if (data.cards[0].value < data.cards[1].value){
          fetch(`https://deckofcardsapi.com/api/deck/${deckId}/pile/playerTwo/add/?cards=${cardOne},${cardTwo}`)
              .then(res => res.json()) // parse response as JSON
              .then(pileData => {
                console.log(pileData)
            })
            .catch(err => {
              console.log(`error ${err}`)
            }); 
          for (let i = 0; i < 8; i++){
            fetch(`https://deckofcardsapi.com/api/deck/${deckId}/pile/playerTwo/add/?cards=${data.cards[i].code}`)
              .then(res => res.json()) // parse response as JSON
              .then(pileData => {
                console.log(pileData)
            })
            .catch(err => {
              console.log(`error ${err}`)
            }); 
          }
        }
        else {
          drawWar()
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}
function drawTwo(){
  const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector('#playerOne').src = data.cards[0].image
        document.querySelector('#playerTwo').src = data.cards[1].image
        document.querySelector('#playerOneWarTwo').src = ''
        document.querySelector('#playerOneWarThree').src = ''
        document.querySelector('#playerOneWarFour').src = ''
        document.querySelector('#playerTwoWarTwo').src = ''
        document.querySelector('#playerTwoWarThree').src = ''
        document.querySelector('#playerTwoWarFour').src = ''

        if (+data.cards[0].value > +data.cards[1].value){
          for (let i = 0; i < 2; i++){
            fetch(`https://deckofcardsapi.com/api/deck/${deckId}/pile/playerOne/add/?cards=${data.cards[i].code}`)
              .then(res => res.json()) // parse response as JSON
              .then(pileData => {
                console.log(pileData)
            })
            .catch(err => {
              console.log(`error ${err}`)
            }); 
          }
        }
        else if (+data.cards[0].value < +data.cards[1].value){
          for (let i = 0; i < 2; i++){
            fetch(`https://deckofcardsapi.com/api/deck/${deckId}/pile/playerTwo/add/?cards=${data.cards[i].code}`)
              .then(res => res.json()) // parse response as JSON
              .then(pileData => {
                console.log(pileData)
            })
            .catch(err => {
              console.log(`error ${err}`)
            }); 
          }
        }
        else {
          drawWar(data.cards[0].code, data.cards[1].code)
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}
function newGame(){
  const returnCards = `https://deckofcardsapi.com/api/deck/${deckId}/return/`
  const shuffle = `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`

  fetch(returnCards)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
  fetch(shuffle)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}