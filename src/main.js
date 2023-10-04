import { render } from './framework/render.js';
import TripInfoView from './view/trip-info-view.js';
import NewPointButtonView from './view/new-point-button-view.js';
import MainPresenter from './presenter/main-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import DestinationsModel from './model/destinations-model.js';
import projectApiService from './project-api-service.js';
import { nanoid } from 'nanoid';

const AUTHORIZATION = `Basic ${nanoid()}`;
const END_POINT = 'https://21.objects.pages.academy/big-trip';

const siteTripInfoElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel({
  projectApiService: new projectApiService(END_POINT, AUTHORIZATION)
});
const offersModel = new OffersModel({
  projectApiService: new projectApiService(END_POINT, AUTHORIZATION)
});
const destinationsModel = new DestinationsModel({
  projectApiService: new projectApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();
const mainPresenter = new MainPresenter({
  pointsContainer: siteMainElement,
  pointsModel,
  offersModel,
  destinationsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointButtonClick() {
  mainPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

render(new TripInfoView(), siteTripInfoElement, 'AFTERBEGIN');

async function init() {
  mainPresenter.init();
  await destinationsModel.init();
  await offersModel.init();
  await pointsModel.init();
  render(newPointButtonComponent, siteTripInfoElement);
}

init();
