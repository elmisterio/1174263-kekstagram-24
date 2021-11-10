import {insertPhotoThumbnail, getUniqueRandomIntFromRange} from './utils.js';

// Находим элементы фильтра

const picturesContainer = document.querySelector('.pictures');
const imageFilters = document.querySelector('.img-filters');
const filterDefaultButton = imageFilters.querySelector('#filter-default');
const filterRandomButton = imageFilters.querySelector('#filter-random');
const filterDiscussedButton = imageFilters.querySelector('#filter-discussed');

// Описываем функцию-компаратор сортировки по убыванию кол-ва комментариев

const compareCommentsAmount = (a, b) => b.comments.length - a.comments.length;

// Описываем функцию сортировки по умолчанию

const sortByDefault = (dataArr) => {
  dataArr.forEach((photoItem) => {
    insertPhotoThumbnail(photoItem, picturesContainer);
  });
};

// Описываем функцию сортировки, которая показывает 10 случайных фото

const sortByRandom = (dataArr) => {
  const photoArrFull = [];
  const generateUniqueInt = getUniqueRandomIntFromRange(0, 24);


  while (photoArrFull.length <= 24) {
    photoArrFull.push(dataArr[generateUniqueInt()]);
  }

  const photoArr = photoArrFull.slice(0, 10);

  photoArr.forEach((photoItem) => {
    insertPhotoThumbnail(photoItem, picturesContainer);
  });
};

// Описываем функцию сортировки по комментариям к фото

const sortByDiscussed = (dataArr) => {
  const photoArr = dataArr.slice();

  photoArr.sort(compareCommentsAmount);

  photoArr.forEach((photoItem) => {
    insertPhotoThumbnail(photoItem, picturesContainer);
  });
};

// Описываем функцию переключения активной кнопки сортировки

const changeActiveSortButton = (evt) => {
  filterDefaultButton.classList.remove('img-filters__button--active');
  filterRandomButton.classList.remove('img-filters__button--active');
  filterDiscussedButton.classList.remove('img-filters__button--active');

  evt.target.classList.add('img-filters__button--active');
};


export {sortByDefault, sortByRandom, sortByDiscussed, changeActiveSortButton};
