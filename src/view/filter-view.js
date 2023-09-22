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
  let filtersItemsTemplate = '';
  for (const key in FILTER_TYPE) {
    if (FILTER_TYPE.hasOwnProperty.call(FILTER_TYPE, key)) {
      filtersItemsTemplate += createFilterItemTemplate(FILTER_TYPE[key]);
    }
  }
  return filtersItemsTemplate;
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
  get template() {
    return createFilterTemplate();
  }
}
