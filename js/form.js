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
      imageScaleValueField.value = scaleValue + '%';
      changeImageScaleStyle();
    }
  };

  const onIncreaseControlClick = () => {
    if (scaleValue >= 25 && scaleValue <= 75) {
      scaleValue += 25;
      imageScaleValueField.value = scaleValue + '%';
      image.style.transform = `scale(${scaleValue / 100})`;
      changeImageScaleStyle();
    }
  };

  reduceScaleControl.addEventListener('click', onReduceControlClick);
  increaseScaleControl.addEventListener('click', onIncreaseControlClick);

  // Слайдер

  const stepSlider = document.querySelector('.effect-level__slider');

  noUiSlider.create(stepSlider, {
    start: [0.5],
    step: 0.1,
    range: {
      'min': [0],
      'max': [1],
    },
  });

  // Эффекты
  const effectsList = uploadForm.querySelector('.effects__list');
  const effectsItem = effectsList.querySelectorAll('input[type="radio"]');
  const effectLevelValueInput = uploadForm.querySelector('.effect-level__value');
  const sliderControl = uploadForm.querySelector('.noUi-origin');
  let getSliderPosition = stepSlider.noUiSlider.get();


  const onSliderChange = () => {
    effectLevelValueInput.value = getSliderPosition;
    image.style.filter = `grayscale(${getSliderPosition})`;
  };

  const onEffectChange = (evt) => {
    image.className = '';
    image.classList.add(`effects__preview--${evt.target.value}`);
    effectLevelValueInput.value = stepSlider.noUiSlider.get();
    sliderControl.addEventListener('change', onSliderChange);
  };

  effectsItem.forEach((effectItem) => {
    effectItem.addEventListener('change', onEffectChange);
  });

};



export {uploadImage, openImageModal};
