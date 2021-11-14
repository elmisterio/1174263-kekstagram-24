import {picturesContainerElement} from '../main.js';

let pictures;

const clearPhotoThumbnails = () => {
  pictures = picturesContainerElement.querySelectorAll('.picture');
  pictures.forEach((pictureItem) => {
    pictureItem.remove();
  });
};

export {clearPhotoThumbnails};
