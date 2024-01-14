document.body.innerHTML = `
  <main class="container">
  <section class="hangman">
    <div class="hangman__gallows">
      <img src="./img/man/head.svg" alt="head">
      <img src="./img/man/body.svg" alt="body">
      <img src="./img/man/hand-one.svg" alt="hand-one">
      <img src="./img/man/hand-two.svg" alt="hand-two">
      <img src="./img/man/leg-one.svg" alt="leg-one">
      <img src="./img/man/leg-two.svg" alt="leg-two">
    </div>
  </section>
  <article class="question-answer">
    <section class="answer">

    </section>
    <section class="question">
      <span class="question__hint"></span>
      <span class="question__question"></span>
      <span class="question__count"></span>
    </section>
    <section class="keyboard">

    </section>
  </article>
  </main>
`