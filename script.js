const wordEl = document.querySelector("#word");
const wrongLettersEl = document.querySelector("#wrong-letters");
const playAgainBtn = document.querySelector("#play-button");
const popup = document.querySelector("#popup-container");
const notification = document.querySelector("#notification-container");
const finalMessage = document.querySelector("#final-message")

const figureParts = document.querySelectorAll(".figure-part")


const words = ["application", "programming", "interface", "wizard"]

let selectedWord = words[Math.floor(Math.random() * words.length)]

console.log(selectedWord);

const correctLetters = []
console.log("correctLetters", correctLetters);
const wrongLetters = []
console.log("wrong Letters", wrongLetters);

function displayWord() {
    wordEl.innerHTML = `
        ${selectedWord
            .split("")
            .map(letter => `
                <span class="letter">
                ${correctLetters.includes(letter) ? letter : ""}
                </span> 

            `  )
              .join("")
            }    
    `;

    const innerWord = wordEl.innerText.replace(/\n/g, "");

    if (innerWord === selectedWord) {
      finalMessage.innerText = "Congratulations!! YOU HAVE WON!!!"
      popup.style.display="flex";
    }
}

// update wrong letters

function updateWrongLettersEl() {

  //display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>wrong</p>" : ""}
    ${wrongLetters.map(letter => `<span>${letter}</span`)}
  `
//display parts
  figureParts.forEach((part,index) => {
    const errors = wrongLetters.length

    if (index < errors) {
      part.style.display = "block"
    } else {
      part.style.display = "none"
    }
  })

  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "You Have LOST :( ";
    popup.style.display = "flex"
  }


}


//show Notification

function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show")
  }, 2000)
}


// // add keydown event listener

window.addEventListener("keydown", e => {
  if(e.keyCode >=65 && e.keyCode <=90) {
    const letter = e.key
    // console.log(letter);
    if(selectedWord.includes(letter)) {
      if(!correctLetters.includes(letter)) {
        correctLetters.push(letter)
        displayWord();
      }
      else {
        showNotification();
      }
      
    } else {
      if(!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
    
  }
})


// play again event 
playAgainBtn.addEventListener("click", () => {

  correctLetters.splice(0, correctLetters.length);

  wrongLetters.splice(0, wrongLetters.length);

  
  selectedWord = words[Math.floor(Math.random() * words.length)]
  displayWord()
  
  updateWrongLettersEl()

  popup.style.display = "none"
 

})

displayWord();