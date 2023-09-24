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
  #sortView = null;
  #listEmptyView = null;
  #pointElement = null;

  #pointsListComponent = new PointsListView();

  #points = [];
  #pointsElements = [];

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
        this.#filterType = filterValue;
        this.#points = this.#pointsModel.filteredPoints(this.#filterType);
        this.#clearPoints();
        this.#renderPoints();
      },
    });
    render(filterView, this.#siteTripControlsElement);
  }

  #renderPoints() {
    if (this.#points.length === 0) {
      this.#listEmptyView = new ListEmptyView({filterType: this.#filterType});
      render(this.#listEmptyView, this.#pointsContainer);
    } else {
      this.#sortView = new SortView();
      render(this.#sortView , this.#pointsContainer);
      render(this.#pointsListComponent, this.#pointsContainer);
      for (const point of this.#points) {
        new PointPresenter({
          pointContainer: this.#pointsListComponent,
          point,
          offersModel: this.#offersModel,
          destinationsModel: this.#destinationsModel,
          returnPointElement: (pointElement) => {
            this.#pointElement = pointElement;
          },
        }).init();
        this.#pointsElements.push(this.#pointElement);
      }
    }
  }

  #clearPoints() {
    if (this.#listEmptyView) {
      this.#listEmptyView.element.remove();
    }
    if (this.#sortView) {
      this.#sortView.element.remove();
    }
    if (this.#pointsElements.length !== 0) {
      for (const pointElement of this.#pointsElements) {
        pointElement.element.remove();
      }
    }
  }

}


