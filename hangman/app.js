import dataQuestions from "./js/questions.js"
import alphabet from "./js/alphabet.js";

let numberQustion;
let dataQuestion;
let dataAnswer;

function create() {
  const getStorage = sessionStorage.getItem("question");

  do {
    numberQustion = Math.floor(Math.random() * 48);
    dataQuestion = dataQuestions[numberQustion].question;
  } while (getStorage == dataQuestion);

  console.log(getStorage," != ",dataQuestion)

  dataAnswer = dataQuestions[numberQustion].answer;
  sessionStorage.setItem('question', `${dataQuestion}`);

  console.log("answer:", dataAnswer);


  const elementMan = document.querySelectorAll(".hangman__man");
  const letterBoardVisited = document.querySelectorAll(".keyboard__letter_visited");
  const questionAnswer = document.querySelector('.question-answer');
  const oldAnswer = document.querySelector('.answer');

  // UPDATE ELEMENT OF "GALLOWS"
  for (let i = 0; i < elementMan.length; i++) {
    elementMan[i].classList.remove("hangman__man_active");
  }

  // UPDATE LAYOUT "ANSWER"
  const answer = oldAnswer.cloneNode(false);
  questionAnswer.replaceChild(answer, oldAnswer);

  const letterCell = [];
  for (let i = 0; i < dataAnswer.length; i++) {
    letterCell[i] = document.createElement("div");
    letterCell[i].className = "answer__letter";
    letterCell[i].innerText = "_";
    answer.appendChild(letterCell[i]);
  }

  // UPDATE LAYOUT "QUESTION"
  const questionQuestion = document.querySelector(".question__question");
  questionQuestion.innerText = dataQuestion;

  const questionCount = document.querySelector(".question__count");
  questionCount.innerText = 0;
  
  // UPDATE LAYOUT "KEY-BOARD"
  for (let i = 0; i < letterBoardVisited.length; i++) {
    letterBoardVisited[i].classList.remove("keyboard__letter_visited");
    letterBoardVisited[i].addEventListener("click", enterLetter);
  }
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
  // console.log(letter)

  if (letter.classList.contains("keyboard__letter_visited")) {
    return;
  }

  letter.classList.add("keyboard__letter_visited");
  letter.removeEventListener('click', enterLetter);

  // GAME
  let arrDataAnswer = dataAnswer.split('');
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

  // CREATE ELEMENT OF "GALLOWS"
  const man = ["head", "body", "hand-one", "hand-two", "leg-one", "leg-two"];

  const elementMan = [];
  for (let i = 0; i < man.length; i++) {
    elementMan[i] = document.createElement("img");
    elementMan[i].className = `hangman__man hangman__${man[i]}`;
    elementMan[i].src = `./img/man/${man[i]}.svg`;
    elementMan[i].alt = `${man[i]}`;
    hangmanGallows.appendChild(elementMan[i]);
  }

  hangman.appendChild(hangmanGallows);

  questionAnswer.appendChild(answer);

  // CREATE ELEMENT OF "QUESTION"
  const questionHint = document.createElement("div");
  questionHint.className = "question__hint";
  questionHint.innerText = "Hint: "

  const questionQuestion = document.createElement("span");
  questionQuestion.className = "question__question";

  questionHint.appendChild(questionQuestion);

  const questionIncorrectGuesse = document.createElement("div");
  questionIncorrectGuesse.className = "question__incorrect-guesse";
  questionIncorrectGuesse.innerText = "Incorrect guesses: "

  const questionAttempts = document.createElement("span");
  questionAttempts.className = "question__attempts";

  const questionCount = document.createElement("span");
  questionCount.className = "question__count";
  questionCount.innerText = 0;

  questionAttempts.appendChild(questionCount);
  const textNode = document.createTextNode("/6")
  questionAttempts.appendChild(textNode)
  questionIncorrectGuesse.appendChild(questionAttempts);

  question.appendChild(questionHint);
  question.appendChild(questionIncorrectGuesse);

  questionAnswer.appendChild(question);

  // CREATE ELEMENT OF "KEY-BOARD"
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

  create() 
})();