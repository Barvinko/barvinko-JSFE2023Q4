import { Header } from '@components/header/Header';
import { Garage } from '@components/garage/Garage';
import { Winners } from '@components/winners/Winners';
import { createElement } from '@utils/createElement';

export class Layout {
  private readonly _header: Header;

  private readonly _garage: Garage;

  private readonly _winners: Winners;

  constructor() {
    this._winners = new Winners();
    this._garage = new Garage(this._winners);
    this._header = new Header(
      () => this.draw(this._garage.getContainer()),
      () => this.draw(this._winners.getContainer()),
    );
  }

  private draw(layout: HTMLElement): void {
    const haveContainer: HTMLDivElement | null = document.querySelector('.article');
    if (haveContainer && haveContainer.parentElement) haveContainer.parentElement.replaceChild(layout, haveContainer);
  }

  public firstDraw(): void {
    const main = createElement('main', 'main');
    main.appendChild(this._garage.getContainer());
    document.body.appendChild(main);
  }
}
