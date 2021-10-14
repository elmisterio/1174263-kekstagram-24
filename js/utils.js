/* eslint-disable no-unused-vars */

// Функция, возвращающая случайное целое число из переданного диапазона включительно

function getRandomInt(min, max) {
  if (min < 0 || max < 0) {
    throw new Error('Значения диапазона чисел могут быть только положительными');
  }

  if (min > max) {
    const swap = min;
    min = max;
    max = swap;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для проверки максимальной длины строки

function isStringFit(string, maxlength) {
  return +string.length <= maxlength;
}

// Отрисовка миниатюр пользователей

const insertMiniPhotos = (data, node) => {
  const pictureTemplate = document.querySelector('#picture').content;
  const template = pictureTemplate.querySelector('.picture');

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < data.length; i++) {
    const element = template.cloneNode(true);

    const elementImg = element.querySelector('.picture__img');
    elementImg.src = data[i].url;

    const elementLikes = element.querySelector('.picture__likes');
    elementLikes.textContent = data[i].likes;

    const elementCommentsAmount = element.querySelector('.picture__comments');
    elementCommentsAmount.textContent = data[i].comments.length;

    fragment.appendChild(element);
  }
  node.appendChild(fragment);
};

// Export

export {getRandomInt, isStringFit, insertMiniPhotos};
