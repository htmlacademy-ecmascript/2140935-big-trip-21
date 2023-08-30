import { createElement } from '../render.js';

function createEditPointFormTemplate() {
  return '<form class="event event--edit" action="#" method="post"></form>';
}

export default class EditPointFormView {
  getTemplate() {
    return createEditPointFormTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
