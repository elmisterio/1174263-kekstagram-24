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

  hashtagInput.addEventListener('invalid', () => {
    if (hashtagInput.validity.patternMismatch) {
      hashtagInput.setCustomValidity('Некорректный формат данных');
    } else {
      hashtagInput.setCustomValidity('');
    }
  });

  // Проверка валидности

  // const isValidHashtagLength = () => {
  //   const inputArr = hashtagInput.value.split('');
  //   console.log(inputArr)
  // }
  // // Проверка при отправке

  // uploadForm.addEventListener('submit', (evt) => {
  //   evt.preventDefault()
  //   isValidHashtagLength()
  // })

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
