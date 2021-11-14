import {getUniqueRandomIntFromRange} from './utils.js';
import {filterDefaultButtonElement, filterRandomButtonElement, filterDiscussedButtonElement} from './main.js';

// Описываем функцию-компаратор сортировки по убыванию кол-ва комментариев

const compareCommentsAmount = (a, b) => b.comments.length - a.comments.length;

// Описываем функцию сортировки, которая показывает 10 случайных фото

const MAX_COMMENTS_AMOUNT = 24;

const sortByRandom = (dataArr) => {
  const photoArrFull = [];
  const generateUniqueInt = getUniqueRandomIntFromRange(0, MAX_COMMENTS_AMOUNT);

  while (photoArrFull.length <= MAX_COMMENTS_AMOUNT) {
    photoArrFull.push(dataArr[generateUniqueInt()]);
  }

  return photoArrFull;
};

// Описываем функцию сортировки по комментариям к фото

const sortByDiscussed = (dataArr) => {
  const photoArr = dataArr.slice();

  photoArr.sort(compareCommentsAmount);

  return photoArr;
};

// Описываем функцию переключения активной кнопки сортировки

const changeActiveSortButton = (evt) => {
  filterDefaultButtonElement.classList.remove('img-filters__button--active');
  filterRandomButtonElement.classList.remove('img-filters__button--active');
  filterDiscussedButtonElement.classList.remove('img-filters__button--active');

  evt.target.classList.add('img-filters__button--active');
};


export {sortByRandom, sortByDiscussed, changeActiveSortButton};
