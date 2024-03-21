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

  private _checkContaine!: HTMLButtonElement;

  private _autoComplete!: HTMLButtonElement;

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

    this._checkContaine = createElement('button', 'button game_continue-check', buttons) as HTMLButtonElement;
    this._checkContaine.innerText = 'Check';
    this._checkContaine.disabled = true;
    this._checkContaine.addEventListener('click', () => this.checkContinue(this._checkContaine));

    this._autoComplete = createElement('button', 'button game_auto-complete', buttons) as HTMLButtonElement;
    this._autoComplete.innerText = 'Auto-Complete';
    this._autoComplete.addEventListener('click', () => this.runAutoComplete());
  }

  private runAutoComplete() {
    this._words.forEach((word) => {
      this._fieldGame.getCurrentRow().appendChild(word);
      word.classList.add('game__card_move');
      setTimeout(() => {
        word.classList.remove('game__card_move');
      }, 300);
    });

    if (this._fieldGame.getNumberCurrent() !== 9) {
      this.toRound();
      return;
    }

    this._checkContaine.disabled = false;
    this._autoComplete.disabled = true;
    this._checkContaine.innerText = 'Continue';

    this.deleteVerifClass(this._words);
    this._words.forEach((word) => {
      word.style.pointerEvents = 'none';
    });
  }

  private checkContinue(button: HTMLButtonElement) {
    switch (button.innerText) {
      case 'Check':
        this.checkRow();
        break;
      case 'Continue':
        this.toRound();
        break;

      default:
        console.error('checkContinue does not have correct name');
        break;
    }
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

    this.randomWords();
  }

  private randomWords(): void {
    const wordsString: string[] = [...this._currentDate.text];
    const words: HTMLDivElement[] = [];
    this._words = [];

    wordsString.forEach((word, index) => {
      const element = createElement('div', 'game_card') as HTMLDivElement;
      element.innerText = word;
      words[index] = element;
      this._words[index] = element;
      element.addEventListener('click', (event: Event) => this.chooseCard(event));
    });

    for (let i = 0; i < words.length; i += 1) {
      const j = Math.floor(Math.random() * words.length);
      [words[i], words[j]] = [words[j], words[i]];
    }

    words.forEach((word) => {
      this._randomCards.appendChild(word);
    });
  }

  private async toRound() {
    this.deleteVerifClass(this._words);
    this._words.forEach((word) => {
      word.style.pointerEvents = 'none';
    });

    this._checkContaine.disabled = true;
    this._checkContaine.innerHTML = 'Check';
    this._autoComplete.disabled = false;

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
      this._checkContaine.disabled = true;
      this._checkContaine.innerText = 'Check';

      this._autoComplete.disabled = false;

      this.deleteVerifClass([card]);
      return;
    }

    this._fieldGame.getCurrentRow().appendChild(card);
    const curentRow = this._fieldGame.getCurrentRow();
    const curentListWords = Array.from(curentRow.children) as HTMLDivElement[];

    if (curentListWords.length === this._words.length) {
      this._checkContaine.disabled = false;

      const rightText: string = this._currentDate.text.join(' ');
      const curentText = curentListWords.reduce((text, word: HTMLDivElement) => {
        if (text === '') return word.innerText;
        return `${text} ${word.innerText}`;
      }, '');

      if (curentText !== rightText) return;

      this._autoComplete.disabled = true;
      this._checkContaine.innerText = 'Continue';
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
