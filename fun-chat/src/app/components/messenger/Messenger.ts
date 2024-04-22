import { Component } from '@components/Component/Component';
import { Header } from '@components/messenger/header/Header';
import { Footer } from '@components/messenger/footer/Footer';

export class Messenger extends Component {
  private _header: Header;

  private _footer: Footer;

  constructor() {
    super('article', 'article container messenger');
    this._header = new Header();
    this._footer = new Footer();
    this._container.appendChild(this._header.getContainer());
    this._container.appendChild(this._footer.getContainer());
  }

  public setHeaderName() {
    this._header.setName();
  }
}
