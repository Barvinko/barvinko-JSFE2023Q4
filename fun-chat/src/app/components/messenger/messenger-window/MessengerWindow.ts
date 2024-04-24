import { Component } from '@components/Component/Component';
import { createElement, createInput, createDiv, createSpans } from '@utils/createElement';
import { Socket } from '@utils/Socket';
import { TypeSocket } from '@type/enums';
import { SocketData, PayloadUsers, UserLogin } from '@type/type';
import { generateId } from '@utils/generateId';
import { UserStorage } from '@app/utils/LocalStorage';

type UserList = {
  input: HTMLInputElement;
  list: HTMLDivElement;
};

export class MessengerWindow extends Component {
  private _userList: UserList;

  private _users: UserLogin[];

  constructor() {
    super('main', 'messenger-window');
    this._users = [];
    this._userList = this.createList();
    this.createDialog();
  }

  private createList(): UserList {
    const containerList = createElement('section', 'user-list', this._container);
    const input = createInput('user-list__search', 'text', containerList);
    const list = createDiv('user-list__list', containerList);

    input.addEventListener('input', () => {
      const filteredItems = this._users.filter((user) => {
        const name = user.login;
        const needName = this._userList.input.value.toLowerCase();
        return name.toLowerCase().includes(needName);
      });
      filteredItems.sort((a, b) => {
        if (a.isLogined === b.isLogined) return 0;
        return a.isLogined ? -1 : 1;
      });
      this.createUsers(filteredItems);
    });

    return { input, list };
  }

  public async drawList() {
    const requestActive: SocketData<null> = {
      id: generateId(),
      type: TypeSocket.USER_ACTIVE,
      payload: null,
    };
    const requestInactive: SocketData<null> = {
      id: generateId(),
      type: TypeSocket.USER_INACTIVE,
      payload: null,
    };

    const responseActive = await Socket.sendRequest<PayloadUsers>(requestActive);
    const responseInactive = await Socket.sendRequest<PayloadUsers>(requestInactive);
    if (responseActive.type === TypeSocket.ERROR || responseInactive.type === TypeSocket.ERROR) {
      console.error('data no come');
      return;
    }
    const userActive = responseActive.payload as PayloadUsers;
    const userInactive = responseInactive.payload as PayloadUsers;
    this._users = [...userActive.users, ...userInactive.users];
    this.createUsers(this._users);
  }

  public createUsers(users: UserLogin[]) {
    function createUser(user: UserLogin): HTMLDivElement {
      const container = createDiv('user-list__user');
      const userActiveClass = user.isLogined ? 'user-list__name-active' : '';
      createSpans(`user-list__name ${userActiveClass}`, user.login, container);
      return container;
    }

    this._userList.list.innerHTML = '';

    users.forEach((user) => {
      if (user.login === UserStorage.getData()?.login) return;
      this._userList.list.appendChild(createUser(user));
    });
  }

  private createUser(user: UserLogin): HTMLDivElement {
    const container = createDiv('user-list__user');
    const userActiveClass = user.isLogined ? 'user-list__name-active' : '';
    createSpans(`user-list__name ${userActiveClass}`, user.login, container);
    return container;
  }

  private createDialog() {
    createElement('section', 'gialog', this._container);
  }

  public loginOtherUser(user: UserLogin) {
    const userHave = this._users.some((userEl) => {
      const answer = userEl.login === user.login;
      if (answer) {
        userEl.isLogined = !userEl.isLogined;
      }
      return answer;
    });

    if (!userHave) {
      this._users.unshift(user);
    }

    const event = new Event('input', {
      bubbles: true,
      cancelable: true,
    });

    this._userList.input.dispatchEvent(event);
  }
}
