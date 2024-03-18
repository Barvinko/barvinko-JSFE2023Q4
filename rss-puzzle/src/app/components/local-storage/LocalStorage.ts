export type FullName = {
  name: string;
  surname: string;
};

export class LocalStorage {
  public setFullName(fullName: FullName): void {
    localStorage.setItem('@Barvinko-PUZZLE__fullName', JSON.stringify(fullName));
  }

  public deleteFullName(): void {
    localStorage.removeItem('@Barvinko-PUZZLE__fullName');
  }

  public getFullName(): FullName | null {
    return JSON.parse(localStorage.getItem('@Barvinko-PUZZLE__fullName') || 'null');
  }
}
