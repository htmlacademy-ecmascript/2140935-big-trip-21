import AbstractView from '../framework/view/abstract-view.js';

function createEditPointTemplate() {
  return '<li class="trip-events__item"></li>';
}

export default class EditPointView extends AbstractView {
  get template() {
    return createEditPointTemplate();
  }
}
