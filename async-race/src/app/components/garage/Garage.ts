import { createElement } from '@app/utils/createElement';
import { Page } from '@app/components/page/Page';

export class Garage extends Page {
  constructor() {
    const garage = createElement('sector', 'garage');
    super('article', 'article garage-page', garage);
    this._container.appendChild(garage);
  }
}
