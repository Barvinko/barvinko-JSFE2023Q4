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
function create() {
  const numberQustion = Math.floor(Math.random() * 48);

  const hangman = document.querySelector(".hangman__gallows");
  const question = document.querySelector(".question");
  const keyboard = document.querySelector(".keyboard");

  const man = ["head", "body", "hand-one", "hand-two", "leg-one", "leg-two"];

  const elementMan = [];
  for (let i = 0; i < man.length; i++) {
    elementMan[i] = document.createElement("img");
    elementMan[i].className = `hangman__man hangman__${man[i]} hangman__man_active`;
    elementMan[i].src = `./img/man/${man[i]}.svg`;
    elementMan[i].alt = `${man[i]}`;
    hangman.appendChild(elementMan[i]);
  }

  // hangman.innerHTML = `
  //   <img class="hangman__man hangman__head" src="./img/man/head.svg" alt="head">
  //   <img class="hangman__man hangman__body" src="./img/man/body.svg" alt="body">
  //   <img class="hangman__man hangman__hand-one" src="./img/man/hand-one.svg" alt="hand-one">
  //   <img class="hangman__man hangman__hand-two" src="./img/man/hand-two.svg" alt="hand-two">
  //   <img class="hangman__man hangman__leg-one" src="./img/man/leg-one.svg" alt="leg-one">
  //   <img class="hangman__man hangman__leg-two" src="./img/man/leg-two.svg" alt="leg-two">
  // `

  question.innerHTML = `
    <div class="question__hint">Hint:
      <span class="question__question">${dataQuestions[numberQustion].question}</span>
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

  const letters = [];
  for (let i = 0; i < alphabet.length; i++) {
    letters[i] = document.createElement("div");
    letters[i].className = "keyboard__letter";
    letters[i].innerText = `${alphabet[i]}`;
    keyboardContainer.appendChild(letters[i]);
  }

  keyboard.appendChild(keyboardContainer);
}


create();