import AbstractView from '../framework/view/abstract-view.js';

function createEditPointDetailsTemplate() {
  return '<section class="event__details"></section>';
}

export default class EditPointDetailsView extends AbstractView {
  get template() {
    return createEditPointDetailsTemplate();
  }
}
