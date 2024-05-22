const boxes = document.querySelectorAll(".box")
const gameInfo = document.querySelector(".game-info")
const newGameBtn = document.querySelector(".btn")

let currentPlayer
let gameGrid

const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// create a function to initialise the game 

function initGame() {
    currentPlayer = "X"
    gameGrid = ["", "", "", "", "", "", "", "", ""]
    newGameBtn.classList.remove("active")
    gameInfo.innerText = `Current Player - ${currentPlayer}`
    // ui vr empty boxes kara sthi 
    boxes.forEach((box, index) => {
        box.innerText = ""
        boxes[index].style.pointerEvents = "all"
        // to make the box as initial 
        box.classList = `box box${index + 1}`
    })
}

initGame()

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index)
    })
})

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer
        gameGrid[index] = currentPlayer
        boxes[index].style.pointerEvents = "none"
        // swap the player 
        swapTurn()
        // check game over koi jita toh nahi 
        checkGameOver()

    }
}

function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O"
    }
    else {
        currentPlayer = "X"
    }
    // update ui 
    gameInfo.innerText = `Current Player - ${currentPlayer}`

}

function checkGameOver() {
    let answer = ""

    winningPosition.forEach((position) => {
        // all three boxes should non empty and exactly same 
        if ((gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "" && gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {
            // check winnner 
            if (gameGrid[position[0]] === "X") {
                answer = "X"
            }
            else {
                answer = "O"
            }
            // disable pointer event 
            boxes.forEach((box) => {
                box.style.pointerEvents = "none"
            })
            // add color 
            boxes[position[0]].classList.add("win")
            boxes[position[1]].classList.add("win")
            boxes[position[2]].classList.add("win")
        }

    })
    if (answer !== "") {
        gameInfo.innerText = `Winner player - ${answer}`
        newGameBtn.classList.add("active")
    }

    let fillCount = 0
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillCount++
        }
    })

    if (fillCount === 9) {
        gameInfo.innerText = "Game Tied"
        newGameBtn.classList.add("active")
    }

}

newGameBtn.addEventListener("click", initGame)