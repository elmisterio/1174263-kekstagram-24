import {throttle} from './utils.js';
import {getData} from './fetch.js';
import {openImageModal} from './form/form.js';
import {insertPhotoThumbnail} from './thumbnails/thumbnails-render.js';
import {openFullPhotoFromThumbnail} from './thumbnails/thumbnails-modal.js';
import {clearPhotoThumbnails} from './thumbnails/thumbnails-clear.js';
import {showErrorGetDataPopup} from './thumbnails/thumbnails-error.js';
import {sortByRandom, sortByDiscussed, changeActiveSortButton} from './sort.js';

// Добавляем миниатюры фото на главную страницу

const picturesContainerElement = document.querySelector('.pictures');
const imageFiltersElement = document.querySelector('.img-filters');
const filterDefaultButtonElement = imageFiltersElement.querySelector('#filter-default');
const filterRandomButtonElement = imageFiltersElement.querySelector('#filter-random');
const filterDiscussedButtonElement = imageFiltersElement.querySelector('#filter-discussed');

const THROTTLE_DELAY = 500;

getData((dataArr) => {
  dataArr.forEach((photoItem) => {
    insertPhotoThumbnail(photoItem, picturesContainerElement);
  });

  imageFiltersElement.classList.remove('img-filters--inactive');

  const insertDefaultThumbnails = throttle(() => {
    clearPhotoThumbnails();
    dataArr.forEach((photoItem) => {
      insertPhotoThumbnail(photoItem, picturesContainerElement);
    });
  }, THROTTLE_DELAY);

  filterDefaultButtonElement.addEventListener('click', (evt) => {
    insertDefaultThumbnails();
    changeActiveSortButton(evt);
  });

  const insertRandomThumbnails = throttle(() => {
    clearPhotoThumbnails();
    const photoArrFull = sortByRandom(dataArr);
    const photoArr = photoArrFull.slice(0, 10);
    photoArr.forEach((photoItem) => {
      insertPhotoThumbnail(photoItem, picturesContainerElement);
    });
  }, THROTTLE_DELAY);

  filterRandomButtonElement.addEventListener('click', (evt) => {
    insertRandomThumbnails();
    changeActiveSortButton(evt);
  });

  const insertDiscussedThumbnails = throttle(() => {
    clearPhotoThumbnails();
    const photoArr = sortByDiscussed(dataArr);
    photoArr.forEach((photoItem) => {
      insertPhotoThumbnail(photoItem, picturesContainerElement);
    });
  }, THROTTLE_DELAY);

  filterDiscussedButtonElement.addEventListener('click', (evt) => {
    insertDiscussedThumbnails();
    changeActiveSortButton(evt);
  });

  picturesContainerElement.addEventListener('click', (evt) => {
    if (evt.target.matches('.picture__img')) {
      evt.preventDefault();
      openFullPhotoFromThumbnail(dataArr[evt.target.dataset.id]);
    }
  });
}, showErrorGetDataPopup);


// Вешаем обработчик загрузки изображения

const uploadForm = document.querySelector('.img-upload__form');
const uploadButton = uploadForm.querySelector('.img-upload__input');

uploadButton.addEventListener('change', () => {
  openImageModal();
});

export {picturesContainerElement, imageFiltersElement, filterDefaultButtonElement, filterRandomButtonElement, filterDiscussedButtonElement};
