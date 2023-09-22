import { getRandomTenInteger } from '../utils/common.js';

export const offers = [
  {
    type: 'Taxi',
    offers: [
      {
        id: crypto.randomUUID(),
        title: 'Order Uber',
        price: getRandomTenInteger(10, 400)
      }
    ]
  },
  {
    type: 'Bus',
    offers: [
      {
        id: crypto.randomUUID(),
        title: 'Book tickets',
        price: getRandomTenInteger(10, 400)
      },
      {
        id: crypto.randomUUID(),
        title: 'Choose seats',
        price: getRandomTenInteger(10, 400)
      },
    ]
  },
  {
    type: 'Train',
    offers: [
      {
        id: crypto.randomUUID(),
        title: 'Travel by train',
        price: getRandomTenInteger(10, 400)
      },
      {
        id: crypto.randomUUID(),
        title: 'Choose seats',
        price: getRandomTenInteger(10, 400)
      },
    ]
  },
  {
    type: 'Flight',
    offers: [
      {
        id: crypto.randomUUID(),
        title: 'Book tickets',
        price: getRandomTenInteger(10, 400)
      },
      {
        id: crypto.randomUUID(),
        title: 'Switch to comfort class',
        price: getRandomTenInteger(10, 400)
      },
      {
        id: crypto.randomUUID(),
        title: 'Add meal',
        price: getRandomTenInteger(10, 400)
      },
      {
        id: crypto.randomUUID(),
        title: 'Choose seats',
        price: getRandomTenInteger(10, 400)
      },
    ]
  },
  {
    type: 'Restaurant',
    offers: [
      {
        id: crypto.randomUUID(),
        title: 'Add meal',
        price: getRandomTenInteger(10, 400)
      },
      {
        id: crypto.randomUUID(),
        title: 'Add breakfast',
        price: getRandomTenInteger(10, 400)
      }
    ]
  },
  {
    type: 'Drive',
    offers: [
      {
        id: crypto.randomUUID(),
        title: 'Rent a car',
        price: getRandomTenInteger(10, 400)
      },
    ]
  },
  {
    type: 'Sightseeing',
    offers: [
    ]
  },
  {
    type: 'Check-in',
    offers: [
      {
        id: crypto.randomUUID(),
        title: 'Switch to comfort class',
        price: getRandomTenInteger(10, 400)
      },
      {
        id: crypto.randomUUID(),
        title: 'Add luggage',
        price: getRandomTenInteger(10, 400)
      },
      {
        id: crypto.randomUUID(),
        title: 'Choose seats',
        price: getRandomTenInteger(10, 400)
      },
      {
        id: crypto.randomUUID(),
        title: 'Travel by train',
        price: getRandomTenInteger(10, 400)
      },
      {
        id: crypto.randomUUID(),
        title: 'Add meal',
        price: getRandomTenInteger(10, 400)
      },
    ]
  },
  {
    type: 'Ship',
    offers: [
      {
        id: crypto.randomUUID(),
        title: 'Choose seats',
        price: getRandomTenInteger(10, 400)
      },
      {
        id: crypto.randomUUID(),
        title: 'Add luggage',
        price: getRandomTenInteger(10, 400)
      },
      {
        id: crypto.randomUUID(),
        title: 'Switch to comfort class',
        price: getRandomTenInteger(10, 400)
      },
    ]
  }
];
