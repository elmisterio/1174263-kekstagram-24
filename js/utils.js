/* eslint-disable no-trailing-spaces */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

// Функция, возвращающая случайное целое число из переданного диапазона включительно

function getRandomInt(min, max) {
  if (min < 0 || max < 0) {
    throw new Error('Значения диапазона чисел могут быть только положительными');
  }

  if (min > max) {
    const swap = min;
    min = max;
    max = swap;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для проверки максимальной длины строки

function isStringFit(string, maxlength) {
  return +string.length <= maxlength;
}

// Отрисовка миниатюр пользователей

const insertMiniPhotos = (data, node) => {
  const pictureTemplate = document.querySelector('#picture').content;
  const template = pictureTemplate.querySelector('.picture');

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < data.length; i++) {
    const element = template.cloneNode(true);

    const elementImg = element.querySelector('.picture__img');
    elementImg.src = data[i].url;

    const elementLikes = element.querySelector('.picture__likes');
    elementLikes.textContent = data[i].likes;

    const elementCommentsAmount = element.querySelector('.picture__comments');
    elementCommentsAmount.textContent = data[i].comments.length;

    fragment.appendChild(element);
  }
  node.appendChild(fragment);
};

// Отрисовка окна с полноразмерным изображением

const renderFullPhoto = (thumbnails, photosData) => {
  const documentBody = document.querySelector('body');

  const bigPicture = document.querySelector('.big-picture');
  const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
  const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
  const bigPictureDescription = bigPicture.querySelector('.social__caption');

  const commentList = bigPicture.querySelector('.social__comments');
  const commentItem = bigPicture.querySelector('.social__comment');
  const commentCount = bigPicture.querySelector('.social__comment-count');
  const commentsLoader = bigPicture.querySelector('.comments-loader');

  const fragment = document.createDocumentFragment();

  const thumbnailClickHandler = (thumbnail, photoData) => {
    thumbnail.addEventListener('click', (evt) => {
      evt.preventDefault();

      bigPicture.classList.remove('hidden');
      bigPictureImg.src = photoData.url;
      bigPictureDescription.textContent = photoData.description;
      bigPictureLikesCount.textContent = photoData.likes;

      for (let j = 0; j < photoData.comments.length; j++) {
        const element = commentItem.cloneNode(true);

        const elementImg = element.querySelector('.social__picture');
        elementImg.src = photoData.comments[j].avatar;
        elementImg.alt = photoData.comments[j].name;

        const elementText = element.querySelector('.social__text');
        elementText.textContent = photoData.comments[j].message;

        fragment.appendChild(element);
      }

      commentList.innerHTML = '';
      commentList.appendChild(fragment);

      commentCount.classList.add('hidden');
      commentsLoader.classList.add('hidden');

      documentBody.classList.add('modal-open');
    });
  };

  for (let i = 0; i < thumbnails.length; i++) {
    thumbnailClickHandler(thumbnails[i], photosData[i]);
  }

  bigPictureCloseButton.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      bigPicture.classList.add('hidden');
    }
  });

};

// Export

export {getRandomInt, isStringFit, insertMiniPhotos, renderFullPhoto};
