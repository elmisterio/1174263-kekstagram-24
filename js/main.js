import {uploadImage} from './form.js';
import {getData} from './fetch.js';

// Добавляем миниатюры фото на главную страницу

const pictures = document.querySelector('.pictures');

getData(pictures);

// Вызываем обработчик загрузки изображения

uploadImage();
