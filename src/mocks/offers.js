import { getRandomTenInteger } from '../utils';

export const offers = [
  {
    'type': 'Taxi',
    'offers': [
      {
        'id': 1,
        'title': 'Order Uber',
        'price': getRandomTenInteger(10, 400)
      }
    ]
  },
  {
    'type': 'Bus',
    'offers': [
      {
        'id': 2,
        'title': 'Book tickets',
        'price': getRandomTenInteger(10, 400)
      },
      {
        'id': 10,
        'title': 'Choose seats',
        'price': getRandomTenInteger(10, 400)
      },
    ]
  },
  {
    'type': 'Train',
    'offers': [
      {
        'id': 3,
        'title': 'Travel by train',
        'price': getRandomTenInteger(10, 400)
      },
      {
        'id': 10,
        'title': 'Choose seats',
        'price': getRandomTenInteger(10, 400)
      },
    ]
  },
  {
    'type': 'Flight',
    'offers': [
      {
        'id': 4,
        'title': 'Switch to comfort class',
        'price': getRandomTenInteger(10, 400)
      },
      {
        'id': 5,
        'title': 'Add meal',
        'price': getRandomTenInteger(10, 400)
      },
      {
        'id': 10,
        'title': 'Choose seats',
        'price': getRandomTenInteger(10, 400)
      },
    ]
  },
  {
    'type': 'Restaurant',
    'offers': [
      {
        'id': 5,
        'title': 'Add meal',
        'price': getRandomTenInteger(10, 400)
      },
      {
        'id': 6,
        'title': 'Add breakfast',
        'price': getRandomTenInteger(10, 400)
      }
    ]
  },
  {
    'type': 'Drive',
    'offers': [
      {
        'id': 7,
        'title': 'Rent a car',
        'price': getRandomTenInteger(10, 400)
      },
    ]
  },
  {
    'type': 'Sightseeing',
    'offers': [
      {
        'id': 3,
        'title': 'Travel by train',
        'price': getRandomTenInteger(10, 400)
      },
      {
        'id': 8,
        'title': 'Lunch in city',
        'price': getRandomTenInteger(10, 400)
      },
    ]
  },
  {
    'type': 'Check-in',
    'offers': [
      {
        'id': 4,
        'title': 'Switch to comfort class',
        'price': getRandomTenInteger(10, 400)
      },
      {
        'id': 9,
        'title': 'Add luggage',
        'price': getRandomTenInteger(10, 400)
      },
      {
        'id': 10,
        'title': 'Choose seats',
        'price': getRandomTenInteger(10, 400)
      },
    ]
  },
  {
    'type': 'Ship',
    'offers': [
      {
        'id': 10,
        'title': 'Choose seats',
        'price': getRandomTenInteger(10, 400)
      },
    ]
  }
];
