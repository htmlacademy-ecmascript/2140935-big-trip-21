import { getRandomArrayElement, getRandomInteger, getRandomTenInteger, generateRandomDate, getRandomBoolean, getRandomArray } from '../utils/common.js';
import { offers } from './offers.js';

const TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const mockPoints = [];

// Получаем офферы по type
function getOffersForType(type) {
  const offer = offers.find((item) => item.type === type);
  return offer ? offer.offers.map((subOffer) => subOffer.id) : [];
}

// Делаем массив точек маршрута
for (let i = 0; i < 20; i++) {
  const type = getRandomArrayElement(TYPES);
  const { startDate, endDate } = generateRandomDate();
  const point = {
    'id': i + 1,
    'basePrice': getRandomTenInteger(100, 3000),
    'dateFrom': startDate.toISOString(),
    'dateTo': endDate.toISOString(),
    'destination': getRandomInteger(1, 5),
    'isFavorite': getRandomBoolean(),
    'offers': getRandomArray(getOffersForType(type)),
    'type': type
  };
  mockPoints.push(point);
}

export function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}
