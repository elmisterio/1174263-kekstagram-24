const sliderElement = document.querySelector('.effect-level__slider');

noUiSlider.create(sliderElement, {
  start: [1],
  step: 0.1,
  range: {
    'min': [0],
    'max': [1],
  },
});

export {sliderElement};
