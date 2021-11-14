import {isEscapeKey} from '../utils.js';
import {documentBodyElement} from './form.js';

// Создаем функции, которые рисуют и закрывают попап об успешной отправке формы

const showSuccesPopup = () => {

  // Клонируем шаблон и помещаем в body

  const succesTemplateElement = document.querySelector('#success').content;
  const templateElement = succesTemplateElement.querySelector('.success');

  const fragment = document.createDocumentFragment();

  const newElement = templateElement.cloneNode(true);

  fragment.appendChild(newElement);

  documentBodyElement.appendChild(fragment);

  // Ищем кнопку закрытия в модалке

  const succesPopupCloseButtonElement = document.querySelector('.success__button');

  // Сначала объявим функцию закрытия по Esc

  const closeSuccessPopupOnEsc = (evt) => {
    if (isEscapeKey(evt)) {
      closeSuccesPopup();
    }
  };

  // Далее объявим функцию закрытия по клику за пределами попапа

  const closeSuccesPopupOnClickOutside = (evt) => {
    if (evt.target.matches('.success')) {
      closeSuccesPopup();
    }
  };

  // И саму функцию, которая закрывает окно

  function closeSuccesPopup () {
    const succesPopup = document.querySelector('.success');
    documentBodyElement.removeChild(succesPopup);
    document.removeEventListener('click', closeSuccesPopupOnClickOutside);
    succesPopupCloseButtonElement.removeEventListener('click', closeSuccesPopup);
    document.removeEventListener('keydown', closeSuccessPopupOnEsc);
  }

  // Вешаем обработчики на кнопку закрытия, ESC и область за пределаеми попапа

  document.addEventListener('click', closeSuccesPopupOnClickOutside);
  succesPopupCloseButtonElement.addEventListener('click', closeSuccesPopup);
  document.addEventListener('keydown', closeSuccessPopupOnEsc);
};

// Создаем функцию, которая показывает окно с ошибкой отправки формы

const showErrorPopup = () => {

  // Клонируем шаблон и помещаем в body

  const errorTemplateElement = document.querySelector('#error').content;
  const templateElement = errorTemplateElement.querySelector('.error');

  const fragment = document.createDocumentFragment();

  const newElement = templateElement.cloneNode(true);

  fragment.appendChild(newElement);

  documentBodyElement.appendChild(fragment);

  // Ищем кнопку закрытия в модалке

  const errorPopupCloseButtonElement = document.querySelector('.error__button');

  // Сначала объявим функцию закрытия по Esc

  const closeErrorPopupOnEsc = (evt) => {
    if (isEscapeKey(evt)) {
      closeErrorPopup();
    }
  };

  // Далее объявим функцию закрытия по клику за пределами попапа

  const closeErrorPopupOnClickOutside = (evt) => {
    if (evt.target.matches('.error')) {
      closeErrorPopup();
    }
  };

  // И саму функцию, которая закрывает окно

  function closeErrorPopup () {
    const errorPopup = document.querySelector('.error');
    documentBodyElement.removeChild(errorPopup);
    document.removeEventListener('click', closeErrorPopupOnClickOutside);
    errorPopupCloseButtonElement.removeEventListener('click', closeErrorPopup);
    document.removeEventListener('keydown', closeErrorPopupOnEsc);
  }

  // Вешаем обработчики на кнопку закрытия, ESC и область за пределаеми попапа

  document.addEventListener('click', closeErrorPopupOnClickOutside);
  errorPopupCloseButtonElement.addEventListener('click', closeErrorPopup);
  document.addEventListener('keydown', closeErrorPopupOnEsc);
};

export {showSuccesPopup, showErrorPopup};
