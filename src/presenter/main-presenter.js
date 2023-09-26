import {render, remove} from '../framework/render.js';
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

  #pointsListComponent = new PointsListView();

  #points = [];
  #pointPresenters = new Map();

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
        this.#clear();
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
        const pointPresenter = new PointPresenter({
          pointContainer: this.#pointsListComponent,
          offersModel: this.#offersModel,
          destinationsModel: this.#destinationsModel,
          onDataChange: this.#handlePointChange,
          onModeChange: this.#handleModeChange,
        });
        pointPresenter.init(point);
        this.#pointPresenters.set(point.id, pointPresenter);
      }
    }
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointsModel.updatePoints(updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #clear() {
    if (this.#listEmptyView) {
      remove(this.#listEmptyView);
    }
    if (this.#sortView) {
      remove(this.#sortView);
    }
    if (this.#pointPresenters.size !== 0) {
      for (const pointPresenter of this.#pointPresenters.values()) {
        pointPresenter.destroy();
      }
    }
  }

}


