import AbstractView from '../framework/view/abstract-view.js';
import { FILTER_TYPE } from '../const.js';

function createFilterItemTemplate(filterType) {
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${filterType}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterType}">
      <label class="trip-filters__filter-label" for="filter-${filterType}">${filterType}</label>
    </div>`
  );
}

function createFiltersItemsTemplate() {
  return Object.values(FILTER_TYPE).map((value) => createFilterItemTemplate(value)).join('');
}

function createFilterTemplate() {
  const filtersItemsTemplate = createFiltersItemsTemplate();
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FilterView extends AbstractView {
  #handleFilterChange = null;

  constructor({onFilterChange}) {
    super();
    this.#handleFilterChange = onFilterChange;
    const element = this.element.querySelector('.trip-filters');

    if (element) {
      element.addEventListener('change', this.#filterChangeHandler);
    }
  }

  get template() {
    return createFilterTemplate();
  }

  #filterChangeHandler = (evt) => {
    const filterValue = evt.target.value;
    this.#handleFilterChange(filterValue);
  };
}
