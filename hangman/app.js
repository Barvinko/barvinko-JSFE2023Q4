import dataQuestions from "./js/questions.js"
import alphabet from "./js/alphabet.js";

(() => {
  const main = document.createElement("main");
  main.className = "container";

  const hangman = document.createElement("section");
  hangman.className = "hangman";

  const hangmanGallows = document.createElement("div");
  hangmanGallows.className = "hangman__gallows";

  const questionAnswer = document.createElement("article");
  questionAnswer.className = "question-answer";

  const answer = document.createElement("section");
  answer.className = "answer";

  const question = document.createElement("section");
  question.className = "question";

  const keyboard = document.createElement("section");
  keyboard.className = "keyboard";

  main.appendChild(hangman);
  main.appendChild(questionAnswer);

  hangman.appendChild(hangmanGallows);

  questionAnswer.appendChild(answer);
  questionAnswer.appendChild(question);
  questionAnswer.appendChild(keyboard);

  document.body.appendChild(main);
})();

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
  const answer = document.querySelector('.answer');

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
    answer.appendChild(letterCell[i]);
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
  const arrElemntAnswer = document.querySelectorAll(".answer__letter");
  const questionCount = document.querySelector(".question__count");

  // BUTTON
  let letter
  if (event.target) {
    letter = event.target;
  }else{
    letter = event;
  }
  console.log(letter)

  if (letter.classList.contains("keyboard__letter_visited")) {
    return;
  }

  letter.classList.add("keyboard__letter_visited");
  letter.removeEventListener('click', enterLetter);
  console.log("work enterLetter");

  // GAME

  let arrDataAnswer = dataAnswer.split('');
  console.log(arrDataAnswer);

  let haveLeter = false;

  for (let i = 0; i < arrElemntAnswer.length; i++) {
    if (letter.innerText == arrDataAnswer[i]) {
      arrElemntAnswer[i].innerText = letter.innerText;
      haveLeter = true;
    }
  }

  if (!haveLeter) {
    const elementsMan = document.querySelectorAll(".hangman__man");
    const count = Number(questionCount.innerText);
    elementsMan[count].classList.add("hangman__man_active")
    if (count == 5) {
      console.log("END");
    }
    questionCount.innerText = 1 + count; 
  }
}

create() 