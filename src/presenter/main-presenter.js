import {render, remove} from '../framework/render.js';
import PointsListView from '../view/points-list-view.js';
import SortView from '../view/sort-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import FilterPresenter from './filter-presenter.js';
import { SortType, UpdateType, UserAction} from '../const.js';
import { sortDay, sortTime, sortPrice } from '../utils/point.js';
import { filter } from '../utils/filter.js';

export default class MainPresenter {
  #pointsContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #filterModel = null;
  #destinationsModel = null;
  #siteTripControlsElement = document.querySelector('.trip-controls__filters');
  #sortView = null;
  #listEmptyComponent = null;
  #pointsListComponent = new PointsListView();
  #points = [];
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor({ pointsContainer, pointsModel, offersModel, destinationsModel, filterModel }) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[filterType](points);
    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortDay);
      case SortType.TIME:
        return filteredPoints.sort(sortTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPrice);
    }
    return filteredPoints.sort(sortDay);
  }

  init() {
    this.#renderFilter();
    this.#renderPoints();
  }

  #renderFilter() {
    const filterPresenter = new FilterPresenter({
      filterContainer: this.#siteTripControlsElement,
      filterModel: this.#filterModel,
      pointsModel: this.#pointsModel,
    });
    filterPresenter.init();
  }

  #renderPoints() {
    if (this.#points.length === 0) {
      this.#listEmptyComponent = new ListEmptyView({filterType: this.#filterModel.filter});
      render(this.#listEmptyComponent, this.#pointsContainer);
    } else {
      this.#renderSort();
      render(this.#pointsListComponent, this.#pointsContainer);
      for (const point of this.#points) {
        const pointPresenter = new PointPresenter({
          pointContainer: this.#pointsListComponent,
          offersModel: this.#offersModel,
          destinationsModel: this.#destinationsModel,
          onDataChange: this.#handleViewAction,
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

  /*#handlePointChange = (updatedPoint) => {
    this.#pointsModel.updatePoints(updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };*/

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#pointsModel.updateTask(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this.#pointsModel.addTask(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this.#pointsModel.deleteTask(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPoints({resetSortType: false});
        this.#renderPoints();
        break;
      case UpdateType.MAJOR:
        this.#clearPoints({resetSortType: true});
        this.#renderPoints();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearPoints({resetSortType: false});
    this.#renderPoints();
  };

  #renderSort() {
    this.#sortView = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortView, this.#pointsContainer);
  }

  #clearPoints({resetSortType = false} = {}) {
    if (this.#listEmptyComponent) {
      remove(this.#listEmptyComponent);
    }
    if (this.#sortView) {
      remove(this.#sortView);
    }
    if (this.#pointPresenters.size !== 0) {
      for (const pointPresenter of this.#pointPresenters.values()) {
        pointPresenter.destroy();
      }
    }
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

}
