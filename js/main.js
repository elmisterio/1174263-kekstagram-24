import {uploadImage} from './form.js';
import {getData} from './fetch.js';
import {showErrorGetDataPopup, insertPhotoThumbnail, openFullPhoto} from './utils.js';

// Добавляем миниатюры фото на главную страницу

const pictures = document.querySelector('.pictures');

getData((dataArr) => {
  dataArr.forEach((photoItem) => {
    insertPhotoThumbnail(photoItem, pictures);
  });
  pictures.addEventListener('click', (evt) => {
    if (evt.target.matches('.picture__img')) {
      evt.preventDefault();
      openFullPhoto(dataArr[evt.target.dataset.id]);
    }
  });
}, showErrorGetDataPopup);

// Вызываем обработчик загрузки изображения

uploadImage();
