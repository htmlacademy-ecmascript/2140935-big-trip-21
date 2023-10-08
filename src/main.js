import MainPresenter from './presenter/main-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import DestinationsModel from './model/destinations-model.js';
import ProjectApiService from './project-api-service.js';

const AUTHORIZATION = 'Basic abcdefghijklmnopqrstuvwxyz';
const END_POINT = 'https://21.objects.pages.academy/big-trip';

const siteMainElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel({
  projectApiService: new ProjectApiService(END_POINT, AUTHORIZATION)
});

const offersModel = new OffersModel({
  projectApiService: new ProjectApiService(END_POINT, AUTHORIZATION)
});

const destinationsModel = new DestinationsModel({
  projectApiService: new ProjectApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FilterModel();

const mainPresenter = new MainPresenter({
  pointsContainer: siteMainElement,
  pointsModel,
  offersModel,
  destinationsModel,
  filterModel,
});

async function init() {
  mainPresenter.init();
  await destinationsModel.init();
  await offersModel.init();
  await pointsModel.init();
}

init();
