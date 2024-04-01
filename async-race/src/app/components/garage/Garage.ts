import { Component } from '@components/Component/Component';
import { CarFleet } from '@components/garage/carFleet/CarFleet';

export class Garage extends Component {
  private _carFleet: CarFleet;

  constructor() {
    super('article', 'article garage-page');
    this._carFleet = new CarFleet();
    this._container.appendChild(this._carFleet.getContainer());
  }
}
