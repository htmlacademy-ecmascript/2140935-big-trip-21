export function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomTenInteger(min, max) {
  if (min > max) {
    [min, max] = [max, min]; // Swap min and max if necessary
  }

  const range = Math.floor((max - min) / 10) + 1;
  const randomIndex = Math.floor(Math.random() * range);
  const randomMultipleOf10 = randomIndex * 10;

  return randomMultipleOf10 + min;
}

export function getRandomBoolean() {
  return Math.random() >= 0.5;
}

export function generateRandomDate() {
  const year = 2023;
  const month = 7;
  const day = getRandomInteger(26, 27);
  const hours = getRandomInteger(11, 23);
  const minutes = getRandomInteger(0, 59);

  const startDate = new Date(year, month, day, hours, minutes);

  const timeDiffHours = getRandomInteger(0, 17 - hours);
  const timeDiffMinutes = getRandomInteger(0, 59);

  const endDate = new Date(startDate.getTime() + (timeDiffHours * 60 + timeDiffMinutes) * 60 * 1000);

  return { startDate, endDate };
}
