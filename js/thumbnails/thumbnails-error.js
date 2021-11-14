import {isEscapeKey} from '../utils.js';
import {documentBody} from './thumbnails-render.js';

// Окно с ошибкой загрузки миниатюр

const showErrorGetDataPopup = () => {

  // Клонируем шаблон и помещаем в body

  const errorTemplateElement = document.querySelector('#error').content;
  const templateElement = errorTemplateElement.querySelector('.error');

  const fragment = document.createDocumentFragment();

  const newElement = templateElement.cloneNode(true);
  const errorTitleElement = newElement.querySelector('.error__title');
  errorTitleElement.textContent = 'Ошибка загрузки фотографий';

  const errorButtonElement = newElement.querySelector('.error__button');
  errorButtonElement.textContent = 'Ок';

  fragment.appendChild(newElement);

  documentBody.appendChild(fragment);

  // Ищем кнопку закрытия в модалке

  const errorPopupCloseButtonElement = document.querySelector('.error__button');

  // Сначала объявим функцию закрытия по Esc

  const closeErrorPopupOnEsc = (evt) => {
    if (isEscapeKey(evt)) {
      closeErrorPopupOnClick();
    }
  };

  // Далее объявим функцию закрытия по клику за пределами попапа

  const closeErrorPopupOnClickOutside = (evt) => {
    if (evt.target.matches('.error')) {
      closeErrorPopupOnClick();
    }
  };

  // И саму функцию, которая закрывает окно

  function closeErrorPopupOnClick () {
    const errorPopupElement = document.querySelector('.error');
    documentBody.removeChild(errorPopupElement);
    document.removeEventListener('click', closeErrorPopupOnClickOutside);
    errorPopupCloseButtonElement.removeEventListener('click', closeErrorPopupOnClick);
    document.removeEventListener('keydown', closeErrorPopupOnEsc);
  }

  // Вешаем обработчики на кнопку закрытия, ESC и область за пределаеми попапа

  document.addEventListener('click', closeErrorPopupOnClickOutside);
  errorPopupCloseButtonElement.addEventListener('click', closeErrorPopupOnClick);
  document.addEventListener('keydown', closeErrorPopupOnEsc);
};

export {showErrorGetDataPopup};
