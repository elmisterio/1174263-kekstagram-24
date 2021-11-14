import {onEffectChange} from './form-effects.js';
import {onReduceControlClick, onIncreaseControlClick} from './form-scale.js';
import {onFormSubmit, onHashtagInput, onCommentInput, onFieldFocus, onFieldBlur} from './form-submit.js';
import {closeImageModal, closeImageModalOnEsc} from './form-close.js';


// Записываем элементы формы в переменные

const documentBodyElement = document.querySelector('body');
const uploadFormElement = document.querySelector('.img-upload__form');
const uploadButtonElement = uploadFormElement.querySelector('.img-upload__input');

const editingImageFormElement = uploadFormElement.querySelector('.img-upload__overlay');
const imageElement = uploadFormElement.querySelector('.img-upload__preview img');
const reduceScaleControlElement = uploadFormElement.querySelector('.scale__control--smaller');
const increaseScaleControlElement = uploadFormElement.querySelector('.scale__control--bigger');
const imageScaleValueFieldElement = uploadFormElement.querySelector('.scale__control--value');

const effectsListElement = uploadFormElement.querySelector('.effects__list');
const effectRadioInputNoneElement = uploadFormElement.querySelector('#effect-none');
const effectLevelValueInputElement = uploadFormElement.querySelector('.effect-level__value');

const sliderContainerElement = uploadFormElement.querySelector('.img-upload__effect-level');

const hashtagInputElement = uploadFormElement.querySelector('.text__hashtags');
const commentInputElement = uploadFormElement.querySelector('.text__description');

const imageModalCloseButtonElement = uploadFormElement.querySelector('.img-upload__cancel');


// Далее описываем функцию открытия модального окна

const openImageModal = () => {
  editingImageFormElement.classList.remove('hidden');
  documentBodyElement.classList.add('modal-open');

  // Прячем слайдер-контейнер и задаем эффект по-умолчанию

  sliderContainerElement.style.display = 'none';
  effectRadioInputNoneElement.checked = true;

  // Подставляем выбранное фото в форму

  const file = uploadButtonElement.files[0];
  imageElement.src = URL.createObjectURL(file);

  // Добавляем обработчики на элементы

  reduceScaleControlElement.addEventListener('click', onReduceControlClick);
  increaseScaleControlElement.addEventListener('click', onIncreaseControlClick);

  effectsListElement.addEventListener('change', onEffectChange);

  uploadFormElement.addEventListener('submit', onFormSubmit);
  hashtagInputElement.addEventListener('input', onHashtagInput);
  commentInputElement.addEventListener('input', onCommentInput);

  hashtagInputElement.addEventListener('focus', onFieldFocus);
  commentInputElement.addEventListener('focus', onFieldFocus);

  hashtagInputElement.addEventListener('blur', onFieldBlur);
  commentInputElement.addEventListener('blur', onFieldBlur);

  imageModalCloseButtonElement.addEventListener('click', closeImageModal);
  document.addEventListener('keydown', closeImageModalOnEsc);
};


export {documentBodyElement, uploadFormElement, uploadButtonElement, editingImageFormElement, imageElement, reduceScaleControlElement, increaseScaleControlElement, imageScaleValueFieldElement, effectsListElement, effectRadioInputNoneElement, effectLevelValueInputElement, sliderContainerElement, hashtagInputElement, commentInputElement, imageModalCloseButtonElement, openImageModal};
