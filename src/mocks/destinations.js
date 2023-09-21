import { getRandomInteger } from '../utils/common.js';

export const IMAGE_URL = 'https://loremflickr.com/248/152?random=';

export const destinations = [
  {
    'id': 1,
    'description': 'Amsterdam, is a big and beautiful city in Netherlands.',
    'name': 'Amsterdam',
    'pictures': [
      {
        'src': `${IMAGE_URL}${getRandomInteger(1, 1000)}`,
        'description': 'Amsterdam long streets 1'
      },
      {
        'src': `${IMAGE_URL}${getRandomInteger(1, 1000)}`,
        'description': 'Amsterdam long streets 2'
      },
      {
        'src': `${IMAGE_URL}${getRandomInteger(1, 1000)}`,
        'description': 'Amsterdam long streets 3'
      }]
  },
  {
    'id': 2,
    'description': 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets. Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it\'s renowned for its skiing.',
    'name': 'Chamonix',
    'pictures': [
      {
        'src': `${IMAGE_URL}${getRandomInteger(1, 1000)}`,
        'description': 'Chamonix image 1'
      },
      {
        'src': `${IMAGE_URL}${getRandomInteger(1, 1000)}`,
        'description': 'Chamonix image 2'
      },
      {
        'src': `${IMAGE_URL}${getRandomInteger(1, 1000)}`,
        'description': 'Chamonix image 3'
      },
      {
        'src': `${IMAGE_URL}${getRandomInteger(1, 1000)}`,
        'description': 'Chamonix image 4'
      }]
  },
  {
    'id': 3,
    'description': 'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.',
    'name': 'Geneva',
    'pictures': [
      {
        'src': `${IMAGE_URL}${getRandomInteger(1, 1000)}`,
        'description': 'Geneva image 1 2here'
      },
      {
        'src': `${IMAGE_URL}${getRandomInteger(1, 1000)}`,
        'description': 'Geneva image 2 here'
      },
      {
        'src': `${IMAGE_URL}${getRandomInteger(1, 1000)}`,
        'description': 'Geneva image 3 here'
      },
      {
        'src': `${IMAGE_URL}${getRandomInteger(1, 1000)}`,
        'description': 'Geneva image 4 here'
      },
      {
        'src': `${IMAGE_URL}${getRandomInteger(1, 1000)}`,
        'description': 'Geneva image 5 here'
      }]
  },
  {
    'id': 4,
    'description': 'London, is a beautiful city in South England.',
    'name': 'London',
    'pictures': []
  },
  {
    'id': 5,
    'description': null,
    'name': 'Port Isaac',
    'pictures': []
  }
];
