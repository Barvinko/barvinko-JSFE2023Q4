import { createElement, createDiv, createButton, createSpans } from '@app/utils/createElement';
import { ComponentMain } from '@components/ComponentMain/ComponentMain';
import { Car } from '@components/garage/carFleet/car/Car';
import { ApiUrls, Spans } from '@type/enums';
import { deleteData } from '@utils/api-functions';
import { Winners } from '@components/winners/Winners';
import { ChangeButtons } from '@type/type';

export class CarFleet extends ComponentMain {
  private _changeButtons!: ChangeButtons;

  public _carsPage!: Car[];

  public _dialog!: HTMLDialogElement;

  private _winners: Winners;

  constructor(winners: Winners) {
    super('section', 'garage');
    this._winners = winners;

    this.createTitle().then(() => {
      this.createNumberPage();
      this.createContainerCars();
      this._changeButtons = this.createChangeButton();
      this.blockChangePage();
      this.createDialog();
      winners.createTableRow();
      winners.createChangeButton();
    });
  }

  public async updateCarage(): Promise<void> {
    await this.createTitle();
    this.createContainerCars();
    if (this._changeButtons) this.blockChangePage();
  }

  private createContainerCars(): void {
    const container = createDiv('garage__cars');
    this._carsPage = [];

    let i: number = (this.getNumberPage() - 1) * 7;
    let endIndex: number = i + 7;
    if (endIndex > ComponentMain._carsData.length) endIndex += ComponentMain._carsData.length - endIndex;

    for (i; i < endIndex; i += 1) {
      const car = new Car(ComponentMain._carsData[i]);
      this._carsPage.push(car);

      container.appendChild(car.getContainer());
      const { id } = ComponentMain._carsData[i];

      car.getSelect().addEventListener('click', async () => {
        car.selectUpdate();
      });
      car.getRemove().addEventListener('click', async () => {
        const url = await deleteData(`${ApiUrls.GARAGE}/${id}`);
        if (url) this.updateCarage();
        await deleteData(`${ApiUrls.WINNERS}/${id}`);
        await this._winners.createTitle();
        this._winners.createTableRow();
      });
    }

    this.replaceElement(container);
  }

  private createChangeButton(): ChangeButtons {
    const buttonsPage = createDiv('garage__click-page', this._container);
    const pageBack = createButton('button garage__page-back', 'Back', buttonsPage);
    pageBack.addEventListener('click', () => this.changePage('back'));

    const pageNext = createButton('button garage__page-next', 'Next', buttonsPage);
    pageNext.addEventListener('click', () => this.changePage('next'));

    return {
      back: pageBack,
      next: pageNext,
    };
  }

  private createDialog(): void {
    this._dialog = createElement('dialog', 'dialog', this._container) as HTMLDialogElement;
    const containerWin = createDiv('dialog__container', this._dialog);
    createSpans('dialog__win', 'WIN!!!', containerWin, Spans.H2);
    createSpans('dialog__winner', '', containerWin, Spans.H3);
  }

  private blockChangePage(): void {
    const page: number = this.getNumberPage();
    const numberCars: number = ComponentMain._carsData.length;

    if (page === 1) {
      this._changeButtons.back.disabled = true;
    } else {
      this._changeButtons.back.disabled = false;
    }

    if (numberCars <= 7 * page) {
      this._changeButtons.next.disabled = true;
    } else {
      this._changeButtons.next.disabled = false;
    }
  }

  private changePage(click: 'back' | 'next'): void {
    let change: number;
    switch (click) {
      case 'back':
        change = -1;
        break;
      case 'next':
        change = 1;
        break;

      default:
        return;
    }
    this.setNumberPage(this.getNumberPage() + change);
    this.createContainerCars();
    this.blockChangePage();
  }
}
