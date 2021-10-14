/* eslint-disable no-unused-vars */

import {getRandomInt, isStringFit, insertMiniPhotos} from './utils.js';
import {createCommentsArr, createPhotosArr} from './data.js';

const photosArr = createPhotosArr(25);
const pictures = document.querySelector('.pictures');

insertMiniPhotos(photosArr, pictures);
