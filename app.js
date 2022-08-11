// current state of JS
console.log('js:loaded')


// setting up global variables
 document.addEventListener('DOMContentLoaded', () => {
   const boardGame = document.querySelector('.board') 
   const scorePoints = document.getElementById('score')
   const gameResult = document.getElementById('result')
   const newGame = document.getElementById('new-game')
   const size = 4
   let cells = []
   let score = 0

//creating a new game button
   newGame.addEventListener('click', function(evt) {
    cells.forEach(function(e) {
      e.innerHTML = 0
    })
   location.reload()
})

// Creating the board div in js with 16 cells 4x4 
function createBoard() {
    for (let i = 0; i < 16; i++) {
        cell = document.createElement('div')
        cell.innerHTML = 0
        boardGame.appendChild(cell)
        cells.push(cell)
        }
//invoking the spawnTwo function twice to spawn 2 twice instead of once
spawnTwo()
spawnTwo()
}
createBoard()
 

// Spawn twos in a random position in the board each time by using Math.floor

function spawnTwo() {
    let randomNumber = Math.floor(Math.random() * cells.length)
    if (cells[randomNumber].innerHTML == 0) {
        cells[randomNumber].innerHTML = 2
    } 
    else spawnTwo()
}

// setting arrowKeys 
function arrowKeys(e) {
    if (e.keyCode === 37) {
      leftArrow()
    } else if (e.keyCode === 38) {
      upArrow()
    } else if (e.keyCode === 39) {
      rightArrow()
    } else if (e.keyCode === 40) {
      downArrow()
    }
  }
  document.addEventListener('keyup', arrowKeys)

  function leftArrow() {
    moveLeft()
    combineRow()
    moveLeft()
    spawnTwo()
    changeColor()
  }

  function upArrow() {
    moveUp()
    combineColumn()
    moveUp()
    spawnTwo()
    changeColor()
  }

  function rightArrow() {
    moveRight()
    combineRow()
    moveRight()
    spawnTwo()
    changeColor()
  }

  function downArrow() {
    moveDown()
    combineColumn()
    moveDown()
    spawnTwo()
    changeColor()
  }


// move cells to the right
function moveRight() {
    for (let i = 0; i < 16; i++) {
        if (i % 4 === 0) {
            let sumOne = cells [i].innerHTML
            let sumTwo = cells [i+1].innerHTML
            let sumThree = cells [i+2].innerHTML
            let sumFour = cells [i+3].innerHTML
         let row = [parseInt(sumOne), 
                    parseInt(sumTwo),
                    parseInt(sumThree),
                    parseInt(sumFour)]   

        let filterRow = row.filter(num => num)
        let missing = 4 - filterRow.length
        let zeros = Array(missing).fill(0)
        let newRow = zeros.concat(filterRow)
       cells[i].innerHTML = newRow[0]
       cells[i +1].innerHTML = newRow[1]
       cells[i +2].innerHTML = newRow[2]
       cells[i +3].innerHTML = newRow[3]

         }
    }
}

// move cells down
function moveDown() {
    for (let i = 0; i < 4; i++) {
    let sumOne = cells[i].innerHTML
    let sumTwo = cells[i+ size].innerHTML
    let sumThree = cells[i+ (size*2)].innerHTML
    let sumFour = cells[i+ (size*3)].innerHTML
    let column = [parseInt(sumOne), 
                  parseInt(sumTwo),
                  parseInt(sumThree),
                  parseInt(sumFour)]
        let filterColumn = column.filter(num => num)
         let missing = 4 - filterColumn.length
        let zeros = Array(missing).fill(0)
        let newColumn = zeros.concat(filterColumn)
     cells[i].innerHTML = newColumn[0]
     cells[i+ size].innerHTML = newColumn[1]
     cells[i+ (size*2)].innerHTML = newColumn[2]
     cells[i+ (size*3)].innerHTML = newColumn[3]      
  }
}

// move cells left
function moveLeft() {
    for (let i = 0; i < 16; i++) {
        if (i % 4 === 0) {
            let sumOne = cells [i].innerHTML
            let sumTwo = cells [i+1].innerHTML
            let sumThree = cells [i+2].innerHTML
            let sumFour = cells [i+3].innerHTML
         let row = [parseInt(sumOne), 
                    parseInt(sumTwo),
                    parseInt(sumThree),
                    parseInt(sumFour)]   

        let filterRow = row.filter(num => num)
        let missing = 4 - filterRow.length
        let zeros = Array(missing).fill(0)
        let newRow = filterRow.concat(zeros)
       cells[i].innerHTML = newRow[0]
       cells[i +1].innerHTML = newRow[1]
       cells[i +2].innerHTML = newRow[2]
       cells[i +3].innerHTML = newRow[3]

        }
    }
}

//move cells up
function moveUp() {
    for (let i=0; i < 4; i++) {
      let sumOne = cells[i].innerHTML
      let sumTwo = cells[i+ size].innerHTML
      let sumThree = cells[i+ (size*2)].innerHTML
      let sumFour = cells[i+ (size*3)].innerHTML
      let column = [parseInt(sumOne), 
                    parseInt(sumTwo),
                    parseInt(sumThree),
                    parseInt(sumFour)]
      let filterColumn = column.filter(num => num)
      let missing = 4 - filterColumn.length
      let zeros = Array(missing).fill(0)
      let newColumn = filterColumn.concat(zeros)

      cells[i].innerHTML = newColumn[0]
      cells[i+ size].innerHTML = newColumn[1]
      cells[i+ (size*2)].innerHTML = newColumn[2]
      cells[i+ (size*3)].innerHTML = newColumn[3]
    }
  }

// telling the keys what to move in their respective direction
  function combineRow() {
    for (let i =0; i < 15; i++) {
      if (cells[i].innerHTML === cells[i +1].innerHTML) {
        let combinedTotal = parseInt(cells[i].innerHTML) + parseInt(cells[i +1].innerHTML)
        cells[i].innerHTML = combinedTotal
        cells[i +1].innerHTML = 0
        score += combinedTotal
        scorePoints.innerHTML = score
      }
    }
    checkWin()
    checkGameOver()
  }

  function combineColumn() {
    for (let i =0; i < 12; i++) {
      if (cells[i].innerHTML === cells[i +size].innerHTML) {
        let combinedTotal = parseInt(cells[i].innerHTML) + parseInt(cells[i +size].innerHTML)
        cells[i].innerHTML = combinedTotal
        cells[i +size].innerHTML = 0
        score += combinedTotal
        scorePoints.innerHTML = score
      }
    }
    checkWin()
    checkGameOver()
  }

// Establish MVP Goals
function checkWin() {
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].innerHTML == 2048) {
        gameResult.innerHTML = ('You Win!!!')
    }
    }
  }

//if there are no more zeros on the board and there is no more room for numbers of equal value to keep combining is game over
  function checkGameOver() {
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].innerHTML == 0) {
            gameResult.innerHTML = ('You lose!!')
        }
    }
  }

//make zeros blank
function changeColor() {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].innerHTML == 0) {
        cells[i].style.color = 'beige'

    }
       else {
        cells[i].style.color = 'brown'
       }
  }
}
changeColor()


})
