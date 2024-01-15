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

  const dialog = document.createElement("dialog");
  dialog.className = "dialog dialog_hide";

  const dialogContainer = document.createElement("div");
  dialogContainer.className = "dialog__container";

  const dialogResult = document.createElement("div");
  dialogResult.className = "dialog__result";

  const dialogAnswer = document.createElement("div");
  dialogAnswer.className = "dialog__answer";

  const dialogButton = document.createElement("button");
  dialogButton.className = "dialog__button";

  hangman.appendChild(hangmanGallows);

  questionAnswer.appendChild(answer);
  questionAnswer.appendChild(question);
  questionAnswer.appendChild(keyboard);

  dialogContainer.appendChild(dialogResult);
  dialogContainer.appendChild(dialogAnswer);
  dialogContainer.appendChild(dialogButton);

  dialog.appendChild(dialogContainer);
  dialog.addEventListener("click", dialogHide)

  
  main.appendChild(hangman);
  main.appendChild(questionAnswer);
  main.appendChild(dialog);

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
  let fullWord = true;

  for (let i = 0; i < arrElemntAnswer.length; i++) {
    if (letter.innerText == arrDataAnswer[i]) {
      arrElemntAnswer[i].innerText = letter.innerText;
      haveLeter = true;
    }
    if (arrElemntAnswer[i].innerText == "_") {
      fullWord = false;
    }
  }

  const dialogResult = document.querySelector(".dialog__result");    
  const dialogAnswer = document.querySelector(".dialog__answer"); 
  const dialogButton = document.querySelector(".dialog__button");

  if (fullWord) {
    dialogResult.innerText = "YOU WIN!!! Answer:"
    dialogAnswer.innerText = `${dataAnswer}`;
    dialogButton.innerText = "Restart";

    dialogShow();
  }

  if (!haveLeter) {
    const elementsMan = document.querySelectorAll(".hangman__man");
    const count = Number(questionCount.innerText);
    elementsMan[count].classList.add("hangman__man_active")
    if (count == 5) {
      dialogResult.innerText = "Unfortunately you lost. Сorrect answer:"
      dialogAnswer.innerText = `${dataAnswer}`;
      dialogButton.innerText = "Restart";

      dialogShow();
    }
    questionCount.innerText = 1 + count; 
  }
}

function dialogHide() {
 const dialog = document.querySelector(".dialog");
 dialog.classList.add("dialog_hide");
 create();
}

function dialogShow() {
 const dialog = document.querySelector(".dialog");
 dialog.classList.remove("dialog_hide");
}

create() 