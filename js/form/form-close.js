import {isEscapeKey} from '../utils.js';
import {documentBodyElement, uploadFormElement, uploadButtonElement, editingImageFormElement, imageElement, reduceScaleControlElement, increaseScaleControlElement, imageScaleValueFieldElement, effectsListElement, hashtagInputElement, commentInputElement, imageModalCloseButtonElement} from './form.js';
import {onReduceControlClick, onIncreaseControlClick} from './form-scale.js';
import {onEffectChange} from './form-effects.js';
import {sliderElement} from './form-slider.js';
import {onFormSubmit, onHashtagInput, onCommentInput, onFieldBlur} from './form-submit.js';

const clearModalValues = () => {
  uploadButtonElement.value = '';
  hashtagInputElement.value = '';
  commentInputElement.value = '';
  imageScaleValueFieldElement.value = '100%';
  sliderElement.noUiSlider.destroy();
  imageElement.className = '';
  imageElement.classList.add('effects__preview--none');
  imageElement.style.filter = '';
  imageElement.style.transform = 'scale(1)';
};

const closeImageModalOnEsc = (evt) => {
  if (isEscapeKey(evt)) {
    closeImageModal();
  }
};

const removeImageModalEventListeners = () => {
  imageModalCloseButtonElement.removeEventListener('click', closeImageModal);
  document.removeEventListener('keydown', closeImageModalOnEsc);
  reduceScaleControlElement.removeEventListener('click', onReduceControlClick);
  increaseScaleControlElement.removeEventListener('click', onIncreaseControlClick);
  effectsListElement.removeEventListener('change', onEffectChange);
  uploadFormElement.removeEventListener('submit', onFormSubmit);
  hashtagInputElement.removeEventListener('input', onHashtagInput);
  commentInputElement.removeEventListener('input', onCommentInput);
  hashtagInputElement.removeEventListener('blur', onFieldBlur);
  commentInputElement.removeEventListener('blur', onFieldBlur);
};

function closeImageModal () {
  editingImageFormElement.classList.add('hidden');
  documentBodyElement.classList.remove('modal-open');
  removeImageModalEventListeners();
  clearModalValues();
}

export {closeImageModal, closeImageModalOnEsc};
