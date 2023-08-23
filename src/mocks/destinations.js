import { getRandomInteger } from '../utils';

export const destinations = [
  {
    'id': 1,
    'description': 'Amsterdam, is a big and beautiful city in Netherlands.',
    'name': 'Amsterdam',
    'pictures': [
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomInteger(1, 1000)}`,
        'description': 'Amsterdam long streets'
      }]
  },
  {
    'id': 2,
    'description': 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    'name': 'Chamonix',
    'pictures': [
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomInteger(1, 1000)}`,
        'description': 'Chamonix parliament building'
      }]
  },
  {
    'id': 3,
    'description': 'Geneva, is a beautiful city in the centre of Europe.',
    'name': 'Geneva',
    'pictures': [
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomInteger(1, 1000)}`,
        'description': 'Geneva city center'
      }]
  },
  {
    'id': 4,
    'description': 'London, is a beautiful city in South England.',
    'name': 'London',
    'pictures': [
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomInteger(1, 1000)}`,
        'description': 'London City'
      }]
  },
  {
    'id': 5,
    'description': 'Port Isaac, is a beautiful city in west England.',
    'name': 'Port Isaac',
    'pictures': [
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomInteger(1, 1000)}`,
        'description': 'Port Isaac beach'
      }]
  }
];
