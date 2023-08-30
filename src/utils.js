import dayjs from 'dayjs';

export function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export function getRandomArray(items) {
  const newArray = [...items];
  const countToRemove = Math.floor(Math.random() * (newArray.length + 1));

  for (let i = 0; i < countToRemove; i++) {
    if (newArray.length === 0) {
      break;
    }
    const randomIndex = Math.floor(Math.random() * newArray.length);
    newArray.splice(randomIndex, 1);
  }

  return newArray;
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
  const hours = getRandomInteger(11, 17);
  const minutes = getRandomInteger(0, 59);

  const startDate = new Date(year, month, day, hours, minutes);

  const timeDiffHours = getRandomInteger(0, 48);
  const timeDiffMinutes = getRandomInteger(0, 59);

  const endDate = new Date(startDate.getTime() + (timeDiffHours * 60 + timeDiffMinutes) * 60 * 1000);

  return { startDate, endDate };
}

export function getTimeInterval(start, finish) {
  const startDate = new Date(start);
  const finishDate = new Date(finish);
  const interval = (finishDate - startDate) / (1000 * 60);
  return interval;
}

export function formatTimeInterval(intervalMinutes) {
  const days = Math.floor(intervalMinutes / (60 * 24));
  const hours = Math.floor((intervalMinutes % (60 * 24)) / 60);
  const minutes = intervalMinutes % 60;

  if (days > 0) {
    return `${days.toString()}D ${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  } else if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  } else {
    return `${minutes.toString()}M`;
  }
}

export function formattedDate(inputDate, format) {
  return dayjs(inputDate).format(format);
}
