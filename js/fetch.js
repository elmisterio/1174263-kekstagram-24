import {insertPhotoThumbnail, openFullPhoto, showErrorGetDataPopup} from './utils.js';

const getData = (node) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then((data) => {
      data.forEach((photoItem) => {
        insertPhotoThumbnail(photoItem, node);
      });

      node.addEventListener('click', (evt) => {
        if (evt.target.matches('.picture__img')) {
          evt.preventDefault();
          openFullPhoto(data[evt.target.dataset.id]);
        }
      });
    })
    .catch(() => {
      showErrorGetDataPopup();
    });
};

const sendData = (succes, error, data) => {
  fetch('https://24.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      credentials: 'same-origin',
      body: data,
    })
    .then((response) => {
      if (response.ok) {
        succes();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .catch(() => {
      error();
    });
};

export {sendData, getData};
