/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import {getRandomInt, isStringFit, insertPhotoThumbnail, openFullPhoto} from './utils.js';
import {createCommentsArr, createPhotosArr} from './data.js';

// Добавляем миниатюры фото на главную страницу и вешаем на каждую обработчик клика,
// который открывает полноразмерное фото

const photosArr = createPhotosArr(25);
const pictures = document.querySelector('.pictures');

const onThumbnailClick = (thumbnailItem, photoData) => {
  thumbnailItem.addEventListener('click', (evt) => {
    evt.preventDefault();

    openFullPhoto(photoData);
  });
};

photosArr.forEach((photoItem) => {
  const thumbnail = insertPhotoThumbnail(photoItem, pictures);
  console.log(thumbnail);
  onThumbnailClick(thumbnail, photoItem);
});

