import {isEscapeKey} from '../utils.js';
import {sendData} from '../fetch.js';
import {hashtagInputElement, commentInputElement} from './form.js';
import {isHashtagsValid} from './form-hashtags.js';
import {isCommentValid} from './form-comments.js';
import {showSuccesPopup, showErrorPopup} from './form-popups.js';
import {closeImageModal} from './form-close.js';

// Создаем функции-обработчики для полей формы

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const hashs = hashtagInputElement.value.split(' ');

  if (!isHashtagsValid(hashs)) {
    hashtagInputElement.classList.add('text__hashtags--error');
  } else {
    hashtagInputElement.classList.remove('text__hashtags--error');

  }

  if (!isCommentValid()) {
    commentInputElement.classList.add('text__description--error');
  } else {
    commentInputElement.classList.remove('text__description--error');
  }

  if (isHashtagsValid(hashs) && isCommentValid()) {
    const formData = new FormData(evt.target);
    closeImageModal();
    sendData(formData, showSuccesPopup, showErrorPopup);
  }
};

const onHashtagInput = () => {
  hashtagInputElement.setCustomValidity('');
  hashtagInputElement.classList.remove('text__hashtags--error');
};

const onCommentInput = () => {
  commentInputElement.setCustomValidity('');
  commentInputElement.classList.remove('text__description--error');
};

const onFieldFocusKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const onFieldFocus = () => {
  hashtagInputElement.addEventListener('keydown', onFieldFocusKeydown);
  commentInputElement.addEventListener('keydown', onFieldFocusKeydown);
};

const onFieldBlur = () => {
  hashtagInputElement.removeEventListener('focus', onFieldFocus);
  commentInputElement.removeEventListener('focus', onFieldFocus);
  hashtagInputElement.removeEventListener('focus', onFieldFocusKeydown);
  commentInputElement.removeEventListener('focus', onFieldFocusKeydown);
};


export {onFormSubmit, onHashtagInput, onCommentInput, onFieldFocus, onFieldBlur};

