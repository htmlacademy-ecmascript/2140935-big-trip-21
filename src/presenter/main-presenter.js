import {render, remove} from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import PointsListView from '../view/points-list-view.js';
import FailedLoadView from '../view/failed-load-view.js';
import NewPointButtonView from '../view/new-point-button-view.js';
import SortView from '../view/sort-view.js';
import TripInfoView from '../view/trip-info-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import FilterPresenter from './filter-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import LoadingView from '../view/loading-view.js';
import { FilterType, SortType, UpdateType, UserAction, TimeLimit } from '../const.js';
import { sortDay, sortTime, sortPrice, calculateOffersCost } from '../utils/utils.js';
import { filter } from '../utils/filter.js';

export default class MainPresenter {
  #pointsContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #filterModel = null;
  #destinationsModel = null;
  #siteTripControlsElement = document.querySelector('.trip-controls__filters');
  #siteTripInfoElement = document.querySelector('.trip-main');
  #sortView = null;
  #newPointButtonComponent = null;
  #listEmptyComponent = null;
  #tripInfoComponent = null;
  #loadingComponent = new LoadingView();
  #failedLoadComponent = null;
  #pointsListComponent = new PointsListView();
  #newPointPresenter = null;
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({ pointsContainer, pointsModel, offersModel, destinationsModel, filterModel }) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;
    this.#newPointPresenter = new NewPointPresenter({
      pointContainer: this.#pointsListComponent,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#handleNewPointFormClose,
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get tripDates() {
    return this.#pointsModel.tripDates;
  }

  get tripRoutes() {
    return this.#pointsModel.tripRoutes;
  }

  get tripCost() {
    const baseCost = this.#pointsModel.tripBaseCost;
    const allActiveOffersId = this.#pointsModel.allActiveOffersId;
    const allOffers = this.#offersModel.offers;
    const offersCost = calculateOffersCost(allActiveOffersId, allOffers);
    return baseCost + offersCost;
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
    this.#renderNewPointButton();
    this.#renderFilter();
    this.#renderPoints();
  }

  #renderNewPointButton() {
    this.#newPointButtonComponent = new NewPointButtonView({
      onClick: this.#handleNewPointButtonClick
    });
    render(this.#newPointButtonComponent, this.#siteTripInfoElement);
  }

  #renderTripInfo() {
    if (this.#tripInfoComponent) {
      remove(this.#tripInfoComponent);
    }
    this.#tripInfoComponent = new TripInfoView({tripDates: this.tripDates, tripRoutes: this.tripRoutes, tripCost: this.tripCost, destinationsModel: this.#destinationsModel});
    render(this.#tripInfoComponent, this.#siteTripInfoElement, 'AFTERBEGIN');
  }

  #createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
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
    if (this.#failedLoadComponent) {
      this.#newPointButtonComponent.element.disabled = true;
    } else if (this.#isLoading) {
      this.#newPointButtonComponent.element.disabled = true;
      this.#renderLoading();
    } else if (this.points.length === 0) {
      this.#listEmptyComponent = new ListEmptyView({filterType: this.#filterModel.filter});
      render(this.#listEmptyComponent, this.#pointsContainer);
    } else {
      this.#renderTripInfo();
      this.#renderSort();
      render(this.#pointsListComponent, this.#pointsContainer);
      for (const point of this.points) {
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

  #handleNewPointButtonClick = () => {
    this.#createPoint();
    this.#newPointButtonComponent.element.disabled = true;
  };

  #handleNewPointFormClose = () => {
    this.#newPointButtonComponent.element.disabled = false;
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        this.#renderTripInfo();
        break;
      case UpdateType.MINOR:
        this.#clearPoints({resetSortType: false});
        this.#renderPoints();
        break;
      case UpdateType.MAJOR:
        this.#clearPoints({resetSortType: true});
        this.#renderPoints();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#newPointButtonComponent.element.disabled = false;
        this.#renderPoints();
        break;
      case UpdateType.ERROR:
        this.#isLoading = false;
        this.#newPointButtonComponent.element.disabled = true;
        this.#failedLoadComponent = new FailedLoadView();
        render(this.#failedLoadComponent, this.#pointsContainer);
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

  #renderLoading() {
    render(this.#loadingComponent, this.#pointsContainer);
  }

  #clearPoints({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();
    if (this.#tripInfoComponent) {
      remove(this.#tripInfoComponent);
    }
    if (this.#listEmptyComponent) {
      remove(this.#listEmptyComponent);
    }
    if (this.#loadingComponent) {
      remove(this.#loadingComponent);
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
