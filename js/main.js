/* eslint-disable no-console */
/* eslint-disable no-unused-vars */


import {getRandomInt, isStringFit, insertPhotoThumbnail, openFullPhoto} from './utils.js';
import {createCommentsArr, createPhotosArr} from './data.js';
import {uploadImage, openImageModal} from './form.js';

// Добавляем миниатюры фото на главную страницу и вешаем на каждую обработчик клика,
// который открывает полноразмерное фото

const photosArr = createPhotosArr(25);
const pictures = document.querySelector('.pictures');

photosArr.forEach((photoItem) => {
  const thumbnail = insertPhotoThumbnail(photoItem, pictures);
  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();

    openFullPhoto(photoItem);
  });
});

// Загружаем изображение и добавляем для него окно редактирования
uploadImage();


