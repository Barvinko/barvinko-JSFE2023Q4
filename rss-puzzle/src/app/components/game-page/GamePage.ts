import '@components/game-page/game-page';
import { createElement } from '@utils/createElement';
import { LocalStorage } from '@utils/LocalStorage';
import { FieldGame } from '@components/game-page/game-components/FieldGame';

type LevelData = {
  id: string;
  name: string;
  imageSrc: string;
  cutSrc: string;
  author: string;
  year: string;
};

type Word = {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
  id: number;
  word: string;
  wordTranslate: string;
};

type Puzzle = {
  levelData: LevelData;
  words: Word[];
};

type WordCollection = {
  rounds: Puzzle[];
  roundsCount: number;
};

type CurrentDate = {
  id: number;
  text: string[];
};

export class GamePage {
  private _gameContainer: HTMLDivElement;

  private _closeButton!: HTMLButtonElement;

  private _main: HTMLElement;

  private _fieldGame: FieldGame;

  private _randomCards: HTMLDivElement;

  private _containeButtons!: HTMLButtonElement;

  private _checkButton!: HTMLButtonElement;

  private _localStorage: LocalStorage;

  private _round: number;

  private _currentDate!: CurrentDate;

  private _words!: HTMLDivElement[];

  constructor(storage: LocalStorage) {
    this._localStorage = storage;
    this._fieldGame = new FieldGame();
    this._round = 0;

    this._gameContainer = createElement('div', 'container') as HTMLDivElement;
    this.createHead();

    this._main = createElement('main', 'main game', this._gameContainer);

    this._main.appendChild(this._fieldGame.getFieldGame());

    this._randomCards = createElement('div', 'game__random-cards game__container', this._main) as HTMLDivElement;
    this.createButtons(this._main);

    window.addEventListener('resize', () => {
      if (document.querySelector('.game') && window.innerWidth > 768) this.changeWidth();
    });

    this.startGame();
  }

  private createButtons(main: HTMLElement) {
    const buttons = createElement('div', 'game_buttons', main);

    this._containeButtons = createElement('button', 'button game_containe', buttons) as HTMLButtonElement;
    this._containeButtons.innerText = 'Container';
    this._containeButtons.disabled = true;
    this._containeButtons.addEventListener('click', () => this.toRound());

    this._checkButton = createElement('button', 'button game_check', buttons) as HTMLButtonElement;
    this._checkButton.innerText = 'Check';
    this._checkButton.disabled = true;
    this._checkButton.addEventListener('click', () => this.checkRow());
  }

  private checkRow(): void {
    const wordsCurrent = Array.from(this._fieldGame.getCurrentRow().children) as HTMLDivElement[];

    wordsCurrent.forEach((wordCurr, i) => {
      let verificationClass = 'game_card_';
      verificationClass += wordCurr.innerText === this._currentDate.text[i] ? 'right' : 'wrong';
      wordCurr.classList.add(verificationClass);
    });
  }

  private createHead(): void {
    const header = createElement('header', 'header', this._gameContainer);

    this._closeButton = createElement('button', 'button exit') as HTMLButtonElement;

    header.appendChild(this._closeButton);
    this._closeButton.innerText = 'Logout';
    this._closeButton.addEventListener('click', () => this._localStorage.deleteFullName());
  }

  public async startGame(): Promise<void> {
    const wordCollection: WordCollection = (await import(`@assets/data/wordCollectionLevel1.json`)).default;
    if (this._currentDate && this._fieldGame.getNumberCurrent() === 10) {
      this._round += 1;

      const oldFieldGame = this._fieldGame.getFieldGame();
      const oldRandomCards = this._randomCards;
      this._fieldGame = new FieldGame();
      this._randomCards = createElement('div', 'game__random-cards game__container') as HTMLDivElement;

      this._main.replaceChild(this._fieldGame.getFieldGame(), oldFieldGame);
      this._main.replaceChild(this._randomCards, oldRandomCards);
    }

    const roundData: Puzzle = wordCollection.rounds[this._round];
    const row = this._fieldGame.getNumberCurrent();

    if (!roundData) return;

    this._currentDate = {
      id: this._fieldGame.getNumberCurrent(),
      text: roundData.words[row].textExample.split(' '),
    };
    console.log(this._currentDate.text);

    this.randomWords();
  }

  private randomWords(): void {
    const words: string[] = [...this._currentDate.text];
    this._words = [];

    for (let i = 0; i < words.length; i += 1) {
      const j = Math.floor(Math.random() * words.length);
      [words[i], words[j]] = [words[j], words[i]];
    }

    words.forEach((word, index) => {
      const element = createElement('div', 'game_card', this._randomCards) as HTMLDivElement;
      element.innerText = word;
      this._words[index] = element;
      element.addEventListener('click', (event: Event) => this.chooseCard(event));
    });
  }

  private async toRound() {
    this.deleteVerifClass(this._words);
    this._words.forEach((word) => {
      word.style.pointerEvents = 'none';
    });
    this._containeButtons.disabled = true;
    this._fieldGame.incrementCurrent();
    await this.startGame();
    this.changeWidth();
  }

  private deleteVerifClass(cardsArr: HTMLDivElement[]): void {
    cardsArr.forEach((card) => {
      let verificationClass = 'game_card_';
      verificationClass += card.classList.contains('game_card_right') ? 'right' : '';
      verificationClass += card.classList.contains('game_card_wrong') ? 'wrong' : '';

      if (verificationClass !== 'game_card_') card.classList.remove(verificationClass);
    });
  }

  private chooseCard(event: Event): void {
    const card: HTMLDivElement = event.target as HTMLDivElement;

    if (card.parentElement !== this._randomCards) {
      this._randomCards.appendChild(card);
      this._containeButtons.disabled = true;
      this._checkButton.disabled = true;

      this.deleteVerifClass([card]);
      return;
    }

    this._fieldGame.getCurrentRow().appendChild(card);
    const curentRow = this._fieldGame.getCurrentRow();
    const curentListWords = Array.from(curentRow.children) as HTMLDivElement[];

    if (curentListWords.length === this._words.length) {
      this._checkButton.disabled = false;

      const rightText: string = this._currentDate.text.join(' ');
      const curentText = curentListWords.reduce((text, word: HTMLDivElement) => {
        if (text === '') return word.innerText;
        return `${text} ${word.innerText}`;
      }, '');

      if (curentText !== rightText) return;

      this._checkButton.disabled = true;
      this._containeButtons.disabled = false;
    }
  }

  public changeWidth(words = this._words, text = this._currentDate.text): void {
    const parentComputedStyle = window.getComputedStyle(this._randomCards);

    const exampleWord = window.getComputedStyle(this._words[0]);
    const padding: number = parseFloat(exampleWord.paddingBlockEnd) * 2;
    const gap: number = parseFloat(parentComputedStyle.gap);

    const spase: number = padding * text.length + gap * text.length;
    const parentWidth = parseFloat(parentComputedStyle.width);
    const symbols: number = text.join('').length;
    const symbolWidth: number = (parentWidth - spase) / symbols;

    words.forEach((word: HTMLDivElement) => {
      const letters: number = word.innerText.length;
      word.style.width = `${symbolWidth * letters + padding}px`;
    });

    if (words === this._words) {
      for (let i = 0; i < this._currentDate.id; i += 1) {
        const rowBefore = document.getElementById(`game__row-${i}`) as HTMLDivElement;
        const wordsRowBefore = Array.from(rowBefore.children) as HTMLDivElement[];

        const wordsBeforeText = wordsRowBefore.map((word) => word.innerText);

        this.changeWidth(wordsRowBefore, wordsBeforeText);
      }
    }
  }

  public getButton(): HTMLButtonElement {
    return this._closeButton;
  }

  public getGame(): HTMLDivElement {
    return this._gameContainer;
  }
}
