import {commentInputElement} from './form.js';

// Создаем функцию, проверяющую комментарий на валидность

const MAX_COMMENT_INPUT_LENGTH = 140;

const isCommentValid = () => {
  if (commentInputElement.value.length > MAX_COMMENT_INPUT_LENGTH) {
    commentInputElement.setCustomValidity('Длина комментария не может составлять больше 140 символов');
    commentInputElement.reportValidity();
    return false;
  }

  return true;
};

export {isCommentValid};
