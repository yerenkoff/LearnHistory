import { ruswords } from "./rus.js"
import { engwords } from "./eng.js"
let rus = ruswords
let uas = engwords
let leftArray = []
let rightArray = []
let leftButtons = document.getElementsByClassName("left")
let rightButtons = document.getElementsByClassName("right")
let heading = document.getElementsByClassName("heading")[0]
let guessed = 0
let score = 0

let selectedButtons = []
let usedNumbers = []


function startGame() {
    setTimeout(() => {
        // game.style.opacity = 1

    }, 1000)
    leftArray = []
    rightArray = []
    guessed = 0
    for (let i = 0; i < 4; i++) {
        let r = Math.floor(Math.random() * uas.length)
        while (usedNumbers.includes(r)) {
            r = Math.floor(Math.random() * uas.length)
        }
        usedNumbers.push(r)
        leftArray.push(r)
        rightArray.push(r)

    }
    for (let i = 3; i >= 0; i--) {
        let randomNumber = Math.floor(Math.random() * i)
        let current = rightArray[i]
        rightArray[i] = rightArray[randomNumber]
        rightArray[randomNumber] = current
    }

    let mainArray = []

    for (let i = 0; i < 4; i++) {
        mainArray.push(leftArray[i])
        mainArray.push(rightArray[i])
        leftButtons[i].setAttribute("data-n", leftArray[i])
        rightButtons[i].setAttribute("data-n", rightArray[i])
    }



    for (let i = 0; i < 8; i++) {
        let b = document.getElementsByTagName("button")[i]
        if (i % 2 == 0) {
            b.innerHTML = uas[mainArray[i]]
        }
        b.innerHTML = i % 2 == 0 ? uas[mainArray[i]] : rus[mainArray[i]]
        // if (b.classList.length > 1) {
        b.classList.remove("dis")
        b.style.border = "2px solid #ffffff30"
        // }
        b.onclick = () => {

            if (b.className == "left") {
                for (let btn of leftButtons) {
                    btn.style.border = "2px solid #ffffff30"
                }
            } else {
                for (let btn of rightButtons) {
                    btn.style.border = "2px solid #ffffff30"
                }
            }
            b.style.border = "2px solid #fff"
            if (selectedButtons.length > 0) {
                if (b.className != selectedButtons[0].className) {

                    selectedButtons.push(b)
                } else {
                    selectedButtons = []
                    selectedButtons.push(b)
                }
            } else {
                selectedButtons.push(b)

            }
            if (selectedButtons.length == 2) {
                if (selectedButtons[0].getAttribute("data-n") == selectedButtons[1].getAttribute("data-n")) {
                    score++
                    heading.innerHTML = score + " / "+uas.length
                    guessed = guessed + 2
                    // setTimeout(() => {

                    for (let btn of selectedButtons) {
                        btn.style.transform = "scale(1.02)"
                        setTimeout(() => {
                            btn.style.transform = "scale(1)"
                            btn.classList.add("dis")

                            if (guessed == 8) {
                                // game.style.opacity = 0
                                setTimeout(() => {
                                    startGame()
                                }, 0)
                            }
                        }, 300)
                    }
                    // }, 200)
                } else {

                    setTimeout(() => {

                        for (let btn of document.getElementsByTagName("button")) {
                            btn.style.transition = "0s"
                            btn.style.border = "2px solid #ffffff30"
                            btn.style.animation = "0.15s 2 shake"
                            setTimeout(() => {
                                btn.style.animation = "none"
                                btn.style.transition = "0.3s"
                            }, 300)
                        }
                    }, 200)
                }
                selectedButtons = []


            }
        }
    }

}

startGame()