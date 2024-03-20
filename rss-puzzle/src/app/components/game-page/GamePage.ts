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

export class GamePage {
  private _gameContainer: HTMLDivElement;

  private _closeButton: HTMLButtonElement;

  private _localStorage: LocalStorage;

  private _fieldGame: FieldGame;

  private _randomCards: HTMLDivElement;

  private _round!: Puzzle;

  private _words: HTMLDivElement[];

  constructor(storage: LocalStorage) {
    this._localStorage = storage;

    this._gameContainer = createElement('div', 'container') as HTMLDivElement;

    this._closeButton = createElement('button', 'button exit') as HTMLButtonElement;
    this.createHead();

    const main = createElement('main', 'main game', this._gameContainer);

    this._fieldGame = new FieldGame();

    main.appendChild(this._fieldGame.getFieldGame());

    this._randomCards = createElement('div', 'game__random-cards game__container', main) as HTMLDivElement;

    window.addEventListener('resize', () => {
      if (document.querySelector('.game') && window.innerWidth > 768) this.changeWidth();
    });

    this._words = [];

    this.startGame();
  }

  private createHead(): void {
    const header = createElement('header', 'header', this._gameContainer);

    header.appendChild(this._closeButton);
    this._closeButton.innerText = 'Logout';
    this._closeButton.addEventListener('click', () => this._localStorage.deleteFullName());
  }

  public async startGame(): Promise<void> {
    const wordCollection: WordCollection = (await import(`@assets/data/wordCollectionLevel1.json`)).default;
    const round: number = 0;
    this._round = wordCollection.rounds[round];

    if (!this._round) return;

    this.randomWords(0);
  }

  private randomWords(row: number) {
    const words: string[] = this._round.words[row].textExample.split(' ');

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

  private chooseCard(event: Event): void {
    const cards: HTMLDivElement = event.target as HTMLDivElement;

    if (cards.parentElement === this._randomCards) {
      this._fieldGame.getRows().rowCurrent.appendChild(cards);
      return;
    }
    this._randomCards.appendChild(cards);
  }

  public changeWidth(): void {
    const parentComputedStyle = window.getComputedStyle(this._randomCards);

    const exampleWord = window.getComputedStyle(this._words[0]);
    const padding: number = parseFloat(exampleWord.paddingBlockEnd) * 2;
    const gap: number = parseFloat(parentComputedStyle.gap);
    const spase: number = padding * 10 + gap * 7;

    const parentWidth = parseFloat(parentComputedStyle.width);
    const symbols: number = this._round.words[0].textExample.split(' ').join('').length;
    const symbolWidth: number = (parentWidth - spase) / symbols;

    this._words.forEach((word: HTMLDivElement) => {
      const letters: number = word.innerText.length;
      word.style.width = `${symbolWidth * letters + padding}px`;
    });
  }

  public getButton(): HTMLButtonElement {
    return this._closeButton;
  }

  public getGame(): HTMLDivElement {
    return this._gameContainer;
  }
}
