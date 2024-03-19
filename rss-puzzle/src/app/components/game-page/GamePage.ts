import '@components/game-page/game-page';
import { createElement } from '@utils/createElement';
import { LocalStorage } from '@utils/LocalStorage';

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

  private _result: HTMLDivElement;

  private _randomCards: HTMLDivElement;

  private _round!: Puzzle;

  constructor(storage: LocalStorage) {
    this._localStorage = storage;

    this._gameContainer = createElement('div', 'container') as HTMLDivElement;

    this._closeButton = createElement('button', 'button exit') as HTMLButtonElement;
    this.createHead();

    const main = createElement('main', 'main game', this._gameContainer);
    this._result = createElement('div', 'game__result game__container', main) as HTMLDivElement;
    this._randomCards = createElement('div', 'game__random-cards game__container', main) as HTMLDivElement;
  }

  private createHead(): void {
    const header = createElement('header', 'header', this._gameContainer);

    header.appendChild(this._closeButton);
    this._closeButton.innerText = 'Logout';
    this._closeButton.addEventListener('click', () => this._localStorage.deleteFullName());
  }

  public async startGame() {
    const wordCollection: WordCollection = (await import(`@assets/data/wordCollectionLevel1.json`)).default;
    const round: number = 0;
    this._round = wordCollection.rounds[round];

    if (!this._round) return;

    this._round.words.forEach((row): void => {
      const words: string[] = row.textExample.split(' ');

      for (let i = 0; i < words.length; i + 1) {
        const j = Math.floor(Math.random() * words.length);
        [words[i], words[j]] = [words[j], words[i]];
      }

      words.forEach((word) => {
        const element = createElement('div', 'game_card', this._randomCards);
        element.innerText = word;
        element.addEventListener('click', (event: Event) => this.choseCard(event));
      });
    });
  }

  private choseCard(event: Event): void {
    const cards: HTMLDivElement = event.target as HTMLDivElement;

    if (cards.parentElement === this._randomCards) {
      this._result.appendChild(cards);
      return;
    }
    this._randomCards.appendChild(cards);

    console.log(cards);
  }

  public getButton(): HTMLButtonElement {
    return this._closeButton;
  }

  public getGame(): HTMLDivElement {
    this.startGame();
    return this._gameContainer;
  }
}
