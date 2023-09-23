import {render} from '../framework/render.js';
import PointsListView from '../view/points-list-view.js';
import SortView from '../view/sort-view.js';
import FilterView from '../view/filter-view.js';
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

  constructor({ pointsContainer, pointsModel, offersModel, destinationsModel }) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#points = this.#pointsModel.filteredPoints(this.#filterType);
    this.#renderPoints();
  }

  #renderPoints() {
    render(new FilterView({
      onFilterChange: (filterValue) => {
        this.#filterType = filterValue;
        this.#points = this.#pointsModel.filteredPoints(this.#filterType);
        this.#renderPoints();
      },
    }), this.#siteTripControlsElement);
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
