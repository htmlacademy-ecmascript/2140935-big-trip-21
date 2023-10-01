import { render } from './framework/render.js';
import TripInfoView from './view/trip-info-view.js';
import MainPresenter from './presenter/main-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import DestinationsModel from './model/destinations-model.js';

const siteTripInfoElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();
const mainPresenter = new MainPresenter({
  pointsContainer: siteMainElement,
  pointsModel,
  offersModel,
  filterModel,
  destinationsModel
});

render(new TripInfoView(), siteTripInfoElement, 'AFTERBEGIN');

mainPresenter.init();
