import AbstractView from '../framework/view/abstract-view.js';

function createEventsListTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class EventsList extends AbstractView {
  get template() {
    return createEventsListTemplate();
  }
}
