import { createElement } from '../render.js';

function createEditPointDetailsTemplate() {
  return '<section class="event__details"></section>';
}

export default class EditPointDetailsView {
  getTemplate() {
    return createEditPointDetailsTemplate();
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
