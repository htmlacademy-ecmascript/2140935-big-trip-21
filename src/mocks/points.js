import { getRandomArrayElement, getRandomInteger, getRandomTenInteger, generateRandomDate, getRandomBoolean } from '../utils.js';
import { offers } from './offers.js';

const TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const points = [];

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
    'base_price': getRandomTenInteger(100, 3000),
    'date_from': startDate.toISOString(),
    'date_to': endDate.toISOString(),
    'destination': getRandomInteger(1, 5),
    'isFavorite': getRandomBoolean(),
    'offers': getOffersForType(type),
    'type': type
  };
  points.push(point);
}

export {points};
