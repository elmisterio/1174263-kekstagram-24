/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import {getRandomInt, isStringFit, insertMiniPhotos, renderFullPhoto} from './utils.js';
import {createCommentsArr, createPhotosArr} from './data.js';

// Добавляем миниатюры фото на главную страницу

const photosArr = createPhotosArr(25);
const pictures = document.querySelector('.pictures');

insertMiniPhotos(photosArr, pictures);

// Открываем окно с полноразмерным изображением по клику на миниатюру

const thumbnails = document.querySelectorAll('.picture__img');

renderFullPhoto(thumbnails, photosArr);

