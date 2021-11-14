import {hashtagInputElement} from './form.js';

// Задаем константы значений

const MAX_HASHTAG_INPUT_LENGTH = 20;
const MAX_HASHTAG_AMOUNT = 5;

// Создаем функцию, проверяющую хештеги на валидность

const isHashtagsValid = (hashs) => {

  const isHashtagStartsWithHash = (hash) => hash.substring(0,1) === '#';

  const isHashtagHasCorrectSymbols = (hash) => {
    const regExpCorrectSymbols = /[A-Za-zА-Яа-яЁё0-9]/;

    let result;

    for (let i = 1; i < hash.length; i++) {
      result = regExpCorrectSymbols.test(hash[i]);
      if (!result) {
        return false;
      }
    }
    return true;
  };

  const isHashtagHasCorrectLength = (hash) => hash.length <= MAX_HASHTAG_INPUT_LENGTH;

  const isHashtagAmountCorrect = () => hashs.length <= MAX_HASHTAG_AMOUNT;

  const isHashtagNoRepeat = () => {
    for (let i = 0; i < hashs.length; i++) {
      for (let j = 0; j < hashs.length; j++) {
        if (i === j) {
          continue;
        }

        if (hashs[i].toLowerCase() === hashs[j].toLowerCase()) {
          return false;
        }
      }
    }
    return true;
  };

  if (hashtagInputElement.value.length === 0) {
    return true;
  }

  const validateHash = (hash) => {
    if (!isHashtagStartsWithHash(hash)) {
      hashtagInputElement.setCustomValidity('Хештег должен начинаться с #');
      hashtagInputElement.reportValidity();
      return false;
    } else if (!isHashtagHasCorrectSymbols(hash)) {
      hashtagInputElement.setCustomValidity('Хештег не может содержать пробелы, спецсимволы, символы пунктуации, эмодзи и т. д.');
      hashtagInputElement.reportValidity();
      return false;
    } else if (!isHashtagHasCorrectLength(hash)) {
      hashtagInputElement.setCustomValidity('Максимальная длина одного хэш-тега 20 символов');
      hashtagInputElement.reportValidity();
      return false;
    } else {
      return true;
    }
  };

  for (let i = 0; i < hashs.length; i++) {
    if (!validateHash(hashs[i])) {
      return false;
    }
  }

  if (!isHashtagAmountCorrect()) {
    hashtagInputElement.setCustomValidity('Можно указать не более 5 хештегов');
    hashtagInputElement.reportValidity();
    return false;
  }

  if (!isHashtagNoRepeat()) {
    hashtagInputElement.setCustomValidity('Хештеги не должны повторяться');
    hashtagInputElement.reportValidity();
    return false;
  }

  return true;
};

export {isHashtagsValid};
