/* eslint-disable no-console */
/* eslint-disable no-unused-vars */


import {getRandomInt, isStringFit, insertPhotoThumbnail, openFullPhoto} from './utils.js';
import {createCommentsArr, createPhotosArr} from './data.js';
import {uploadImage, openImageModal} from './form.js';

// Добавляем миниатюры фото на главную страницу

const photosArr = createPhotosArr(25);
const pictures = document.querySelector('.pictures');

photosArr.forEach((photoItem) => {
  const thumbnail = insertPhotoThumbnail(photoItem, pictures);
});


// Добавляем обработчик клика на контейнер, в котором находятся превью фото от пользователей

pictures.addEventListener('click', (evt) => {
  if (evt.target.matches('.picture__img')) {
    evt.preventDefault();
    openFullPhoto(photosArr[evt.target.dataset.id - 1]);
  }
});

// Загружаем изображение и добавляем для него окно редактирования
uploadImage();


