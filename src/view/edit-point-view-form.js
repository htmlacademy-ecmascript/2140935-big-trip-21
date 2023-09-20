import AbstractView from '../framework/view/abstract-view.js';

function createEditPointFormTemplate() {
  return '<form class="event event--edit" action="#" method="post"></form>';
}

export default class EditPointFormView extends AbstractView {
  get template() {
    return createEditPointFormTemplate();
  }
}
