import {imageElement, sliderContainerElement, effectLevelValueInputElement} from './form.js';
import {sliderElement} from './form-slider.js';


const onEffectChange = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    imageElement.className = '';
    imageElement.classList.add(`effects__preview--${evt.target.value}`);
    sliderContainerElement.style.display = '';
    effectLevelValueInputElement.value = '';

    let effectName;
    let unitMeasure;

    if (imageElement.classList.contains('effects__preview--none')) {
      imageElement.style.filter = '';
      sliderContainerElement.style.display = 'none';
      effectLevelValueInputElement.value = '';
    }

    if (imageElement.classList.contains('effects__preview--chrome')) {
      effectName = 'grayscale';
      effectLevelValueInputElement.value = 1;

      sliderElement.noUiSlider.updateOptions({
        start: [effectLevelValueInputElement.value],
        step: 0.1,
        range: {
          'min': [0],
          'max': [1],
        },
      });

      unitMeasure = '';
      imageElement.style.filter = `${effectName}(${effectLevelValueInputElement.value})`;
    }

    if (imageElement.classList.contains('effects__preview--sepia')) {
      effectName = 'sepia';
      effectLevelValueInputElement.value = 1;

      sliderElement.noUiSlider.updateOptions({
        start: [effectLevelValueInputElement.value],
        step: 0.1,
        range: {
          'min': [0],
          'max': [1],
        },
      });

      unitMeasure = '';
      imageElement.style.filter = `${effectName}(${effectLevelValueInputElement.value})`;
    }

    if (imageElement.classList.contains('effects__preview--marvin')) {
      effectName = 'invert';
      effectLevelValueInputElement.value = 100;

      sliderElement.noUiSlider.updateOptions({
        start: [effectLevelValueInputElement.value],
        step: 1,
        range: {
          'min': [0],
          'max': [100],
        },
      });

      unitMeasure = '%';
      imageElement.style.filter = `${effectName}(${effectLevelValueInputElement.value}${unitMeasure})`;
    }

    if (imageElement.classList.contains('effects__preview--phobos')) {
      effectName = 'blur';
      effectLevelValueInputElement.value = 3;

      sliderElement.noUiSlider.updateOptions({
        start: [effectLevelValueInputElement.value],
        step: 0.1,
        range: {
          'min': [0],
          'max': [3],
        },
      });

      unitMeasure = 'px';
      imageElement.style.filter = `${effectName}(${effectLevelValueInputElement.value}${unitMeasure})`;
    }

    if (imageElement.classList.contains('effects__preview--heat')) {
      effectName = 'brightness';
      effectLevelValueInputElement.value = 3;

      sliderElement.noUiSlider.updateOptions({
        start: [effectLevelValueInputElement.value],
        step: 0.1,
        range: {
          'min': [1],
          'max': [3],
        },
      });

      unitMeasure = '';
      imageElement.style.filter = `${effectName}(${effectLevelValueInputElement.value}${unitMeasure})`;
    }

    sliderElement.noUiSlider.on('slide', () => {
      effectLevelValueInputElement.value = sliderElement.noUiSlider.get();
      imageElement.style.filter = `${effectName}(${effectLevelValueInputElement.value}${unitMeasure})`;
    });
  }
};


export {onEffectChange};

