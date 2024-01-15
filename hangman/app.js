import dataQuestions from "./js/questions.js"
import alphabet from "./js/alphabet.js";

console.log(dataQuestions)
document.body.innerHTML = `
  <main class="container">
    <section class="hangman">
      <div class="hangman__gallows">

      </div>
    </section>
    <article class="question-answer">
      <section class="answer">

      </section>
      <section class="question">

      </section>
      <section class="keyboard">

      </section>
    </article>
  </main>
`
let numberQustion;
let dataQuestion;
let dataAnswer;

function create() {
  numberQustion = Math.floor(Math.random() * 48);
  dataQuestion = dataQuestions[numberQustion].question;
  dataAnswer = dataQuestions[numberQustion].answer;
  console.log("answer:", dataAnswer)

  const hangman = document.querySelector(".hangman__gallows");
  const question = document.querySelector(".question");
  const keyboard = document.querySelector(".keyboard");
  const amswer =document.querySelector('.answer')

  const man = ["head", "body", "hand-one", "hand-two", "leg-one", "leg-two"];

  const elementMan = [];
  for (let i = 0; i < man.length; i++) {
    elementMan[i] = document.createElement("img");
    elementMan[i].className = `hangman__man hangman__${man[i]}`;
    elementMan[i].src = `./img/man/${man[i]}.svg`;
    elementMan[i].alt = `${man[i]}`;
    hangman.appendChild(elementMan[i]);
  }

  const letterCell = [];
  for (let i = 0; i < dataAnswer.length; i++) {
    letterCell[i] = document.createElement("div");
    letterCell[i].className = "answer__letter";
    letterCell[i].innerText = "_";
    amswer.appendChild(letterCell[i]);
  }

  question.innerHTML = `
    <div class="question__hint">Hint:
      <span class="question__question">${dataQuestion}</span>
    </div>
    <div class="question__incorrect-guesses">
      Incorrect guesses:
      <span class="question__attempts">
        <span class="question__count">0</span>/6
      </span>
    </div>
  `

  const keyboardContainer = document.createElement("div");
  keyboardContainer.className = "keyboard__container";

  const letterKeyBoard = [];
  for (let i = 0; i < alphabet.length; i++) {
    letterKeyBoard[i] = document.createElement("div");
    letterKeyBoard[i].className = "keyboard__letter";
    letterKeyBoard[i].innerText = `${alphabet[i]}`;
    letterKeyBoard[i].addEventListener("click", enterLetter)
    keyboardContainer.appendChild(letterKeyBoard[i]);
  }

  keyboard.appendChild(keyboardContainer);
}

function enterLetter(event) {
  const answerLetter = document.querySelectorAll(".answer__letter");
  let letter
  if (event.target) {
    letter = event.target;
  }else{
    letter = event;
  }
  console.log(letter)
  letter.classList.add("keyboard__letter_visited");
  letter.removeEventListener('click', enterLetter);
  console.log("work enterLetter");
}


create();