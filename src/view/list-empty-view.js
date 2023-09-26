import AbstractView from '../framework/view/abstract-view';
import { FilterType } from '../const';

function createListEmptyTemplate(filterType) {
  let emptyText = '';
  switch (filterType) {
    case 'past':
      emptyText = 'No past events are available at the moment';
      break;
    case 'present':
      emptyText = 'No present events are available at the moment';
      break;
    case 'future':
      emptyText = 'No future events are available at the moment';
      break;
    default:
      emptyText = 'Click "New Event" to create your first event';
      break;
  }

  return (
    `<!--<h2 class="visually-hidden">Trip events</h2>-->

    <p class="trip-events__msg">${emptyText}</p>`
  );
}

export default class ListEmptyView extends AbstractView {
  #filterType = FilterType.EVERYTHING;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createListEmptyTemplate(this.#filterType);
  }
}
