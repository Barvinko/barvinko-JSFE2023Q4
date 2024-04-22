import { Component } from '@components/Component/Component';
import { createElement, createSpans, createButton } from '@utils/createElement';
import { Spans, TypeSocket } from '@type/enums';
import { UserStorage } from '@utils/LocalStorage';
import { SocketData } from '@type/type';
import { webSocket } from '@utils/webSocket';
import { generateId } from '@utils/generateId';
import { AboutEl } from '@components/about/About';

export class Header extends Component {
  private _userName!: HTMLSpanElement;

  constructor() {
    super('header', 'header');
    this.createheader();
  }

  private createheader() {
    const containerNames = createElement('div', 'header__names');
    this._userName = createSpans('header__userName', `User: `, containerNames, Spans.H3);
    createSpans('header__userApp', `Fun Chat`, containerNames, Spans.H2);

    const oldContainerNames = this._container.querySelector('header__names');

    const headerButtons = this.createButtons();
    containerNames.appendChild(headerButtons);

    if (oldContainerNames) {
      this._container.replaceChild(containerNames, oldContainerNames);
      return;
    }
    this._container.appendChild(containerNames);
  }

  public setName() {
    const name: string | undefined = UserStorage.getData()?.login;
    if (!name) console.error('Does not have the data of an authorised user in the local storege');
    this._userName.innerText = `User: ${name}`;
  }

  private createButtons(): HTMLDivElement {
    const headerButtons = createElement('div', 'header_buttons') as HTMLDivElement;

    const aboutButton = createButton('button header__auto', 'Auto', headerButtons);
    aboutButton.addEventListener('click', () => {
      AboutEl.getContainer().show();
    });

    const exitButton = createButton('button header__exit', 'Exit', headerButtons);
    exitButton.addEventListener('click', () => this.exit());

    return headerButtons;
  }

  private async exit() {
    const userLocal = UserStorage.getData();
    if (!userLocal) return;

    const userExit: SocketData = {
      id: generateId(),
      type: TypeSocket.USER_LOGOUT,
      payload: {
        user: {
          login: userLocal.login,
          password: userLocal.password,
        },
      },
    };
    console.log(await webSocket(userExit));

    UserStorage.deleteData();
  }
}
