import {render} from '../framework/render.js';
import PointsListView from '../view/points-list-view.js';
import SortView from '../view/sort-view.js';
import FilterView from '../view/filter-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import { FILTER_TYPE } from '../const.js';

export default class MainPresenter {
  #pointsContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterType = FILTER_TYPE.EVERYTHING;
  #siteTripControlsElement = document.querySelector('.trip-controls__filters');

  #pointsListComponent = new PointsListView();

  #points = [];
  #pointPresenters = [];

  constructor({ pointsContainer, pointsModel, offersModel, destinationsModel }) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#points = this.#pointsModel.filteredPoints(this.#filterType);
    this.#renderFilter();
    this.#renderPoints();
  }

  #renderFilter() {
    const filterView = new FilterView({
      onFilterChange: (filterValue) => {
        this.#removePoints();
        this.#filterType = filterValue;
        this.#points = this.#pointsModel.filteredPoints(this.#filterType);
        this.#renderPoints();
      },
    });
    render(filterView, this.#siteTripControlsElement);
  }

  #renderPoints() {
    if (this.#points.length === 0) {
      render(new ListEmptyView({filterType: this.#filterType}), this.#pointsContainer);
    } else {
      render(new SortView(), this.#pointsContainer);
      render(this.#pointsListComponent, this.#pointsContainer);
      for (const point of this.#points) {
        new PointPresenter({
          pointContainer: this.#pointsListComponent,
          point,
          offersModel: this.#offersModel,
          destinationsModel: this.#destinationsModel
        }).init();
      }
    }
  }

  #removePoints() {
    this.#pointPresenters.forEach((presenter) => presenter.removeElement());
    this.#pointPresenters = [];
  }
}
