import {uploadImage} from './form.js';
import {getData} from './fetch.js';
import {showErrorGetDataPopup, insertPhotoThumbnail, openFullPhoto, clearPhotoThumbnails, debounce} from './utils.js';
import {sortByDefault, sortByRandom, sortByDiscussed, changeActiveSortButton} from './sort.js';

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

  filterDefaultButton.addEventListener('click', (evt) => {
    const sortByDefaultWithDebounce = debounce(() => {
      clearPhotoThumbnails();
      sortByDefault(dataArr);
    }, 500);
    sortByDefaultWithDebounce();

    changeActiveSortButton(evt);
  });

  filterRandomButton.addEventListener('click', (evt) => {
    const sortByRandomWithDebounce = debounce(() => {
      clearPhotoThumbnails();
      sortByRandom(dataArr);
    }, 500);
    sortByRandomWithDebounce();

    changeActiveSortButton(evt);
  });

  filterDiscussedButton.addEventListener('click', (evt) => {
    const sortByDiscussedWithDebounce = debounce(() => {
      clearPhotoThumbnails();
      sortByDiscussed(dataArr);
    }, 500);
    sortByDiscussedWithDebounce();

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
