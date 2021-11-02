const openImageModal = () => {
  const uploadForm = document.querySelector('.img-upload__form');
  const reduceScaleControl = uploadForm.querySelector('.scale__control--smaller');
  const increaseScaleControl = uploadForm.querySelector('.scale__control--bigger');
  const imageScaleValueField = uploadForm.querySelector('.scale__control--value');
  const image = uploadForm.querySelector('.img-upload__preview img');

  // Масштаб

  let scaleValue = 100;
  const changeImageScaleStyle = () => image.style.transform = `scale(${scaleValue / 100})`;

  const onReduceControlClick = () => {
    if (scaleValue > 25 && scaleValue <= 100) {
      scaleValue -= 25;
      imageScaleValueField.value = `${scaleValue}%`;
      changeImageScaleStyle();
    }
  };

  const onIncreaseControlClick = () => {
    if (scaleValue >= 25 && scaleValue <= 75) {
      scaleValue += 25;
      imageScaleValueField.value = `${scaleValue}%`;
      image.style.transform = `scale(${scaleValue / 100})`;
      changeImageScaleStyle();
    }
  };

  reduceScaleControl.addEventListener('click', onReduceControlClick);
  increaseScaleControl.addEventListener('click', onIncreaseControlClick);

  // Слайдер

  const slider = document.querySelector('.effect-level__slider');

  noUiSlider.create(slider, {
    start: [1],
    step: 0.1,
    range: {
      'min': [0],
      'max': [1],
    },
  });

  // Эффекты

  const effectsList = uploadForm.querySelector('.effects__list');
  const effectLevelValueInput = uploadForm.querySelector('.effect-level__value');
  const sliderContainer = uploadForm.querySelector('.img-upload__effect-level');

  sliderContainer.style.display = 'none';

  const onEffectChange = (evt) => {
    if (evt.target.matches('input[type="radio"]')) {
      image.className = '';
      image.classList.add(`effects__preview--${evt.target.value}`);
      sliderContainer.style.display = '';
      effectLevelValueInput.value = '';
      let effectName;
      let unitMeasure;

      if (image.classList.contains('effects__preview--none')) {
        image.style.filter = '';
        sliderContainer.style.display = 'none';
        effectLevelValueInput.value = '';
      }

      if (image.classList.contains('effects__preview--chrome')) {
        effectName = 'grayscale';
        effectLevelValueInput.value = 1;

        slider.noUiSlider.updateOptions({
          start: [effectLevelValueInput.value],
          step: 0.1,
          range: {
            'min': [0],
            'max': [1],
          },
        });

        unitMeasure = '';
        image.style.filter = `${effectName}(${ effectLevelValueInput.value})`;
      }

      if (image.classList.contains('effects__preview--sepia')) {
        effectName = 'sepia';
        effectLevelValueInput.value = 1;

        slider.noUiSlider.updateOptions({
          start: [effectLevelValueInput.value],
          step: 0.1,
          range: {
            'min': [0],
            'max': [1],
          },
        });
        unitMeasure = '';
        image.style.filter = `${effectName}(${effectLevelValueInput.value})`;
      }

      if (image.classList.contains('effects__preview--marvin')) {
        effectName = 'invert';
        effectLevelValueInput.value = 100;

        slider.noUiSlider.updateOptions({
          start: [effectLevelValueInput.value],
          step: 1,
          range: {
            'min': [0],
            'max': [100],
          },
        });

        unitMeasure = '%';
        image.style.filter = `${effectName}(${effectLevelValueInput.value}${unitMeasure})`;
      }

      if (image.classList.contains('effects__preview--phobos')) {
        effectName = 'blur';
        effectLevelValueInput.value = 3;

        slider.noUiSlider.updateOptions({
          start: [effectLevelValueInput.value],
          step: 0.1,
          range: {
            'min': [0],
            'max': [3],
          },
        });

        unitMeasure = 'px';
        image.style.filter = `${effectName}(${effectLevelValueInput.value}${unitMeasure})`;
      }

      if (image.classList.contains('effects__preview--heat')) {
        effectName = 'brightness';
        effectLevelValueInput.value = 3;

        slider.noUiSlider.updateOptions({
          start: [effectLevelValueInput.value],
          step: 0.1,
          range: {
            'min': [1],
            'max': [3],
          },
        });

        unitMeasure = '';
        image.style.filter = `${effectName}(${effectLevelValueInput.value}${unitMeasure})`;
      }

      slider.noUiSlider.on('slide', () => {
        effectLevelValueInput.value = slider.noUiSlider.get();
        image.style.filter = `${effectName}(${effectLevelValueInput.value}${unitMeasure})`;
      });
    }
  };

  effectsList.addEventListener('change', onEffectChange);

  // Хэштег

  const hashtagInput = uploadForm.querySelector('.text__hashtags');

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

    const isHashtagHasCorrectLength = (hash) => hash.length <= 20;

    const isHashtagAmountCorrect = () => hashs.length <= 5;

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

    if (hashtagInput.value.length === 0) {
      return true;
    }

    const validateHash = (hash) => {
      if (!isHashtagStartsWithHash(hash)) {
        hashtagInput.setCustomValidity('Хештег должен начинаться с #');
        return false;
      } else if (!isHashtagHasCorrectSymbols(hash)) {
        hashtagInput.setCustomValidity('Хештег не может содержать пробелы, спецсимволы, символы пунктуации, эмодзи и т. д.');
        return false;
      } else if (!isHashtagHasCorrectLength(hash)) {
        hashtagInput.setCustomValidity('Максимальная длина одного хэш-тега 20 символов');
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
      hashtagInput.setCustomValidity('Можно указать не более 5 хештегов');
      return false;
    }

    if (!isHashtagNoRepeat()) {
      hashtagInput.setCustomValidity('Хештеги не должны повторяться');
      return false;
    }
  };

  // Комментарии

  const commentInput = uploadForm.querySelector('.text__description');

  const isCommentValid = () => {

    if (commentInput.value.length > 140) {
      commentInput.setCustomValidity('Длина комментария не может составлять больше 140 символов');
      return false;
    }

    return true;
  };

  // Обработчики отправки формы

  const onFormSubmit = (evt) => {
    const hashs = hashtagInput.value.split(' ');

    if (!isHashtagsValid(hashs) || !isCommentValid()) {
      evt.preventDefault();
    }
  };

  const onHashtagInput = () => {
    hashtagInput.setCustomValidity('');
  };

  const onCommentInput = () => {
    commentInput.setCustomValidity('');
  };

  uploadForm.addEventListener('submit', onFormSubmit);
  hashtagInput.addEventListener('input', onHashtagInput);
  commentInput.addEventListener('input', onCommentInput);

  // Закрытие окна

  const documentBody = document.querySelector('body');
  const editImageForm = uploadForm.querySelector('.img-upload__overlay');
  const imageModalCloseButton = uploadForm.querySelector('.img-upload__cancel');

  const closeImageModalOnClick = () => {
    editImageForm.classList.add('hidden');
    documentBody.classList.remove('modal--open');
  };

  const closeImageModalOnEsc = (evt) => {
    if (evt.key === 'Escape') {
      closeImageModalOnClick();
    }
  };

  imageModalCloseButton.addEventListener('click', closeImageModalOnClick);
  document.addEventListener('keydown', closeImageModalOnEsc);

};

const uploadImage = () => {
  const documentBody = document.querySelector('body');
  const uploadForm = document.querySelector('.img-upload__form');
  const uploadButton = uploadForm.querySelector('.img-upload__input');
  const editImageForm = uploadForm.querySelector('.img-upload__overlay');

  uploadButton.addEventListener('change', () => {
    editImageForm.classList.remove('hidden');
    documentBody.classList.add('modal--open');
    openImageModal();
  });
};


export {uploadImage, openImageModal};
