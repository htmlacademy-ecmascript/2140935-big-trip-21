import {render, remove} from '../framework/render.js';
import PointsListView from '../view/points-list-view.js';
import SortView from '../view/sort-view.js';
import FilterView from '../view/filter-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import { FilterType, SortType } from '../const.js';
import { sortDay, sortTime, sortPrice } from '../utils/point.js';

export default class MainPresenter {
  #pointsContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterType = FilterType.EVERYTHING;
  #siteTripControlsElement = document.querySelector('.trip-controls__filters');
  #sortView = null;
  #listEmptyView = null;
  #pointsListComponent = new PointsListView();
  #points = [];
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor({ pointsContainer, pointsModel, offersModel, destinationsModel }) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#points = this.#pointsModel.filteredPoints(this.#filterType);
    this.#renderFilter();
    this.#sortPoints(this.#currentSortType);
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

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#points.sort(sortDay);
        break;
      case SortType.TIME:
        this.#points.sort(sortTime);
        break;
      case SortType.PRICE:
        this.#points.sort(sortPrice);
        break;
      default:
        this.#points.sort(sortDay);
    }

    this.#currentSortType = sortType;
  }

  #renderPoints() {
    if (this.#points.length === 0) {
      this.#listEmptyView = new ListEmptyView({filterType: this.#filterType});
      render(this.#listEmptyView, this.#pointsContainer);
    } else {
      this.#renderSort();
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

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clear();
    this.#renderPoints();
  };

  #renderSort() {
    this.#sortView = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortView, this.#pointsContainer);
  }

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


