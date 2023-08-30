import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import EventsPresenter from './presenter/events-presenter.js';
import { render } from './render.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';

const siteTripInfoElement = document.querySelector('.trip-main');
const siteTripControlsElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const eventsPresenter = new EventsPresenter({
  eventsContainer: siteMainElement,
  pointsModel,
  offersModel,
  destinationsModel
});

render(new TripInfoView(), siteTripInfoElement, 'AFTERBEGIN');
render(new FilterView(), siteTripControlsElement);

eventsPresenter.init();
