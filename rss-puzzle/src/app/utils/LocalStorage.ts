export type FullName = {
  name: string;
  surname: string;
};

export class LocalStorage {
  private _keyFullName: string;

  constructor() {
    this._keyFullName = '@Barvinko-PUZZLE__fullName';
  }

  public setFullName(fullName: FullName): void {
    localStorage.setItem(this._keyFullName, JSON.stringify(fullName));
  }

  public deleteFullName(): void {
    localStorage.removeItem(this._keyFullName);
  }

  public getFullName(): FullName | null {
    return JSON.parse(localStorage.getItem(this._keyFullName) || 'null');
  }
}
