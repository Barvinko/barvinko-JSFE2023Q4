export class Layout {
  private draw(layout: HTMLElement): void {
    const haveContainer: HTMLDivElement | null = document.querySelector('.article');
    if (haveContainer && haveContainer.parentElement) haveContainer.parentElement.replaceChild(layout, haveContainer);
  }
}
