import {isEscapeKey} from '../utils.js';
import {documentBody} from './thumbnails-render.js';

// Отрисовка окна с полноразмерным изображением

const openFullPhotoFromThumbnail = (thumbnail) => {

  // Записываем в переменные элементы модального окна с полным изображением

  const bigPictureElement = document.querySelector('.big-picture');
  const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
  const bigPictureCloseButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
  const bigPictureLikesCountElement = bigPictureElement.querySelector('.likes-count');
  const bigPictureDescriptionElement = bigPictureElement.querySelector('.social__caption');

  const commentListElement = bigPictureElement.querySelector('.social__comments');
  const commentItemElement = bigPictureElement.querySelector('.social__comment');
  const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
  const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

  // Показываем модальное окно

  bigPictureElement.classList.remove('hidden');

  // Заполняем окно данными из массива

  bigPictureImgElement.src = thumbnail.url;
  bigPictureDescriptionElement.textContent = thumbnail.description;
  bigPictureLikesCountElement.textContent = thumbnail.likes;

  // Описываем функцию-итератор для рендера комментариев

  const renderComments = (commentsArr) => {
    commentListElement.innerHTML = '';
    commentsArr.forEach((comment) => {
      const fragment = document.createDocumentFragment();

      const newElement = commentItemElement.cloneNode(true);
      const imgElement = newElement.querySelector('.social__picture');
      imgElement.src = comment.avatar;
      imgElement.alt = comment.name;

      const textElement = newElement.querySelector('.social__text');
      textElement.textContent = comment.message;

      fragment.appendChild(newElement);
      commentListElement.appendChild(fragment);
    });
  };

  // Показываем комментарии

  const thumbnailCommentsInitial = thumbnail.comments;

  let thumbnailComments;
  let currentCommentsAmount = 5;
  const totalCommentsAmount = thumbnailCommentsInitial.length;

  const AMOUNT_VISIBLE_COMMENTS = 5;

  if (thumbnailCommentsInitial.length <= AMOUNT_VISIBLE_COMMENTS) {
    commentsLoaderElement.classList.add('hidden');

    commentCountElement.textContent = '';
    commentCountElement.innerHTML = `${totalCommentsAmount} из <span class="comments-count">${totalCommentsAmount}</span> комментариев`;

    thumbnailComments = thumbnailCommentsInitial;
    renderComments(thumbnailComments);
  } else {
    commentsLoaderElement.classList.remove('hidden');
    commentCountElement.textContent = '';
    commentCountElement.innerHTML = `${currentCommentsAmount} из <span class="comments-count">${totalCommentsAmount}</span> комментариев`;

    thumbnailComments = thumbnailCommentsInitial.slice(0, currentCommentsAmount);
    renderComments(thumbnailComments);
  }

  const onClickMoreComments = () => {
    let commentsRemainAmount = totalCommentsAmount - currentCommentsAmount;
    if (commentsRemainAmount <= AMOUNT_VISIBLE_COMMENTS) {
      commentsLoaderElement.classList.add('hidden');
      commentCountElement.textContent = '';
      commentCountElement.innerHTML = `${totalCommentsAmount} из <span class="comments-count">${totalCommentsAmount}</span> комментариев`;
      thumbnailComments = thumbnailCommentsInitial;
    } else {
      currentCommentsAmount += 5;
      commentsRemainAmount -= 5;

      commentCountElement.textContent = '';
      commentCountElement.innerHTML = `${currentCommentsAmount} из <span class="comments-count">${totalCommentsAmount}</span> комментариев`;
      thumbnailComments = thumbnailCommentsInitial.slice(0, currentCommentsAmount);
    }
    renderComments(thumbnailComments);
  };

  commentsLoaderElement.addEventListener('click', onClickMoreComments);

  documentBody.classList.add('modal-open');

  // Объявляем обработчик кнопки закрытия по нажатию Esc

  const onPopupEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closePhotoModal();
    }
  };

  // Объявляем функцию, которая закрывает окно и удаляет обработчики

  function closePhotoModal() {
    bigPictureElement.classList.add('hidden');
    documentBody.classList.remove('modal-open');
    bigPictureCloseButtonElement.removeEventListener('click', closePhotoModal);
    document.removeEventListener('keydown', onPopupEscKeydown);
    commentsLoaderElement.removeEventListener('click', onClickMoreComments);
  }

  // Вешаем обработчики на кнопку закрыти и на документ

  bigPictureCloseButtonElement.addEventListener('click', closePhotoModal);
  document.addEventListener('keydown', onPopupEscKeydown);

};

export {openFullPhotoFromThumbnail};
