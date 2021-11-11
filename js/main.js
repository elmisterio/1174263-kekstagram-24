import {uploadImage} from './form.js';
import {getData} from './fetch.js';
import {showErrorGetDataPopup, insertPhotoThumbnail, openFullPhoto, clearPhotoThumbnails, throttle} from './utils.js';
import {sortByRandom, sortByDiscussed, changeActiveSortButton} from './sort.js';

// Добавляем миниатюры фото на главную страницу

const picturesContainer = document.querySelector('.pictures');
const imageFilters = document.querySelector('.img-filters');
const filterDefaultButton = imageFilters.querySelector('#filter-default');
const filterRandomButton = imageFilters.querySelector('#filter-random');
const filterDiscussedButton = imageFilters.querySelector('#filter-discussed');

getData((dataArr) => {
  dataArr.forEach((photoItem) => {
    insertPhotoThumbnail(photoItem, picturesContainer);
  });

  imageFilters.classList.remove('img-filters--inactive');

  const insertDefaultThumbnails = throttle(() => {
    clearPhotoThumbnails();
    dataArr.forEach((photoItem) => {
      insertPhotoThumbnail(photoItem, picturesContainer);
    });
  }, 500);

  filterDefaultButton.addEventListener('click', (evt) => {
    insertDefaultThumbnails();
    changeActiveSortButton(evt);
  });

  const insertRandomThumbnails = throttle(() => {
    clearPhotoThumbnails();
    const photoArrFull = sortByRandom(dataArr);
    const photoArr = photoArrFull.slice(0, 10);
    photoArr.forEach((photoItem) => {
      insertPhotoThumbnail(photoItem, picturesContainer);
    });
  }, 500);

  filterRandomButton.addEventListener('click', (evt) => {
    insertRandomThumbnails();
    changeActiveSortButton(evt);
  });

  const insertDiscussedThumbnails = throttle(() => {
    clearPhotoThumbnails();
    const photoArr = sortByDiscussed(dataArr);
    photoArr.forEach((photoItem) => {
      insertPhotoThumbnail(photoItem, picturesContainer);
    });
  }, 500);

  filterDiscussedButton.addEventListener('click', (evt) => {
    insertDiscussedThumbnails();
    changeActiveSortButton(evt);
  });

  picturesContainer.addEventListener('click', (evt) => {
    if (evt.target.matches('.picture__img')) {
      evt.preventDefault();
      openFullPhoto(dataArr[evt.target.dataset.id]);
    }
  });
}, showErrorGetDataPopup);

// Вызываем обработчик загрузки изображения

uploadImage();
