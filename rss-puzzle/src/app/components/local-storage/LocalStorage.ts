export type FullName = {
  name: string;
  surname: string;
};

export class LocalStorage {
  public setFullName(fullName: FullName): void {
    localStorage.setItem('@Barvinko-PUZZLE__fullName', JSON.stringify(fullName));
  }
}
