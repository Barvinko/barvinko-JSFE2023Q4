export type ElementParamenter = {
  tag: string;
  className: string;
  parent?: HTMLElement;
};

export function createElement(tag: string, className: string, parent?: HTMLElement): HTMLElement {
  const element: HTMLElement = document.createElement(tag);
  element.className = className;
  if (parent) parent?.appendChild(element);

  return element;
}

export function createLabel(className: string, htmlFor: string, text: string, parent?: HTMLElement) {
  const element = createElement('label', className, parent) as HTMLLabelElement;
  element.htmlFor = htmlFor;
  element.innerText = text;

  return element;
}

export function createInput(className: string, placeholder: string, parent?: HTMLElement): HTMLInputElement {
  const element = createElement('input', className, parent) as HTMLInputElement;
  element.type = 'text';
  element.required = true;
  element.title = 'Name and Surname must be greater than two characters of the English alphabet';
  element.pattern = '[a-zA-Z]+';
  element.innerText = className;
  element.placeholder = placeholder;

  return element;
}
