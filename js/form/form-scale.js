import {imageElement, imageScaleValueFieldElement} from './form.js';

// Сначала опишем взаимодействие с масштабом фотографии

let scaleValue = 100;
const changeImageScaleStyle = () => imageElement.style.transform = `scale(${scaleValue / 100})`;

const onReduceControlClick = () => {
  if (scaleValue > 25 && scaleValue <= 100) {
    scaleValue -= 25;
    imageScaleValueFieldElement.value = `${scaleValue}%`;
    changeImageScaleStyle();
  }
};

const onIncreaseControlClick = () => {
  if (scaleValue >= 25 && scaleValue <= 75) {
    scaleValue += 25;
    imageScaleValueFieldElement.value = `${scaleValue}%`;
    changeImageScaleStyle();
  }
};

export {onReduceControlClick, onIncreaseControlClick};
