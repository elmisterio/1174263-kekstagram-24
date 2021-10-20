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

const insertPhotoThumbnail = (data, node) => {
  const pictureTemplate = document.querySelector('#picture').content;
  const template = pictureTemplate.querySelector('.picture');

  const fragment = document.createDocumentFragment();

  const element = template.cloneNode(true);

  const elementImg = element.querySelector('.picture__img');
  elementImg.src = data.url;

  const elementLikes = element.querySelector('.picture__likes');
  elementLikes.textContent = data.likes;

  const elementCommentsAmount = element.querySelector('.picture__comments');
  elementCommentsAmount.textContent = data.comments.length;

  fragment.appendChild(element);

  node.appendChild(fragment);

  return element;
};

// Отрисовка окна с полноразмерным изображением

const openFullPhoto = (thumbnail) => {
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

  bigPicture.classList.remove('hidden');
  bigPictureImg.src = thumbnail.url;
  bigPictureDescription.textContent = thumbnail.description;
  bigPictureLikesCount.textContent = thumbnail.likes;

  const thumbnailComments = thumbnail.comments;

  thumbnailComments.forEach((comment) => {
    const element = commentItem.cloneNode(true);
    const elementImg = element.querySelector('.social__picture');
    elementImg.src = comment.avatar;
    elementImg.alt = comment.name;

    const elementText = element.querySelector('.social__text');
    elementText.textContent = comment.message;

    fragment.appendChild(element);
  });

  commentList.innerHTML = '';
  commentList.appendChild(fragment);

  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  documentBody.classList.add('modal-open');

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

export {getRandomInt, isStringFit, insertPhotoThumbnail, openFullPhoto};
