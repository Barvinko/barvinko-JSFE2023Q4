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
  const hangman = document.querySelector(".hangman__gallows");
  const question = document.querySelector(".question");

  hangman.innerHTML = `
    <img class="hangman__man hangman__head" src="./img/man/head.svg" alt="head">
    <img class="hangman__man hangman__body" src="./img/man/body.svg" alt="body">
    <img class="hangman__man hangman__hand-one" src="./img/man/hand-one.svg" alt="hand-one">
    <img class="hangman__man hangman__hand-two" src="./img/man/hand-two.svg" alt="hand-two">
    <img class="hangman__man hangman__leg-one" src="./img/man/leg-one.svg" alt="leg-one">
    <img class="hangman__man hangman__leg-two" src="./img/man/leg-two.svg" alt="leg-two">
  `

  question.innerHTML = `
    <span class="question__hint"></span>
    <span class="question__question"></span>
    <span class="question__count"></span>
  `
}


create();