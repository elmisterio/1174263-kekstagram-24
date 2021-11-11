// Функция, возвращающая случайное целое число из переданного диапазона включительно

function getRandomInt(min, max) {
  if (min < 0 || max < 0) {
    throw new Error('Значения диапазона чисел могут быть только положительными');
  }

  if (min > max) {
    const swap = min;
    min = max;
    max = swap;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// // Функция для проверки максимальной длины строки

// function isStringFit(string, maxlength) {
//   return +string.length <= maxlength;
// }

// Проверка нажатия клавиши Esc

const isEscapeKey = (evt) => evt.key === 'Escape';

// Случайное уникальное число из диапазона

const getUniqueRandomIntFromRange = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInt(min, max);
    if (previousValues.length >= (max - min + 1)) {
      throw new Error(`Перебраны все числа из диапазона от ${min} до ${max}`);
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInt(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

// Функция-debounce

// const debounce = (callback, timeoutDelay = 500) => {
//   // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
//   // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
//   let timeoutId;

//   return (...rest) => {
//     // Перед каждым новым вызовом удаляем предыдущий таймаут,
//     // чтобы они не накапливались
//     clearTimeout(timeoutId);

//     // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
//     timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

//     // Таким образом цикл "поставить таймаут - удалить таймаут" будет выполняться,
//     // пока действие совершается чаще, чем переданная задержка timeoutDelay
//   };
// };

// Функция-throttle

const throttle = (callback, delayBetweenFrames) => {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
};

// Отрисовка миниатюр пользователей

const documentBody = document.querySelector('body');

const insertPhotoThumbnail = (data, node) => {
  const pictureTemplate = document.querySelector('#picture').content;
  const template = pictureTemplate.querySelector('.picture');

  const fragment = document.createDocumentFragment();

  const element = template.cloneNode(true);

  const elementImg = element.querySelector('.picture__img');
  elementImg.src = data.url;
  elementImg.setAttribute('data-id', data.id);

  const elementLikes = element.querySelector('.picture__likes');
  elementLikes.textContent = data.likes;

  const elementCommentsAmount = element.querySelector('.picture__comments');
  elementCommentsAmount.textContent = data.comments.length;

  fragment.appendChild(element);

  node.appendChild(fragment);

  return element;
};

// Удаляем миниатюры

let pictures;
const picturesContainer = document.querySelector('.pictures');

const clearPhotoThumbnails = () => {
  pictures = picturesContainer.querySelectorAll('.picture');
  pictures.forEach((pictureItem) => {
    pictureItem.remove();
  });
};

// Отрисовка окна с полноразмерным изображением

const openFullPhoto = (thumbnail) => {

  // Записываем в переменные элементы модального окна с полным изображением

  const bigPicture = document.querySelector('.big-picture');
  const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
  const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
  const bigPictureDescription = bigPicture.querySelector('.social__caption');

  const commentList = bigPicture.querySelector('.social__comments');
  const commentItem = bigPicture.querySelector('.social__comment');
  const commentCount = bigPicture.querySelector('.social__comment-count');
  const commentsLoader = bigPicture.querySelector('.comments-loader');


  // Показываем модальное окно

  bigPicture.classList.remove('hidden');

  // Заполняем окно данными из массива

  bigPictureImg.src = thumbnail.url;
  bigPictureDescription.textContent = thumbnail.description;
  bigPictureLikesCount.textContent = thumbnail.likes;

  // Описываем функцию-итератор для рендера комментариев

  const renderComments = (commentsArr) => {
    commentList.innerHTML = '';
    commentsArr.forEach((comment) => {
      const fragment = document.createDocumentFragment();

      const element = commentItem.cloneNode(true);
      const elementImg = element.querySelector('.social__picture');
      elementImg.src = comment.avatar;
      elementImg.alt = comment.name;

      const elementText = element.querySelector('.social__text');
      elementText.textContent = comment.message;

      fragment.appendChild(element);
      commentList.appendChild(fragment);
    });
  };

  // Показываем комментарии

  const thumbnailCommentsInitial = thumbnail.comments;

  let thumbnailComments;
  let currentCommentsAmount = 5;
  const totalCommentsAmount = thumbnailCommentsInitial.length;

  if (thumbnailCommentsInitial.length <= 5) {
    commentsLoader.classList.add('hidden');

    commentCount.textContent = '';
    commentCount.innerHTML = `${totalCommentsAmount} из <span class="comments-count">${totalCommentsAmount}</span> комментариев`;

    thumbnailComments = thumbnailCommentsInitial;
    renderComments(thumbnailComments);
  } else {
    commentsLoader.classList.remove('hidden');
    commentCount.textContent = '';
    commentCount.innerHTML = `${currentCommentsAmount} из <span class="comments-count">${totalCommentsAmount}</span> комментариев`;

    thumbnailComments = thumbnailCommentsInitial.slice(0, currentCommentsAmount);
    renderComments(thumbnailComments);
  }

  const onClickMoreComments = () => {
    let commentsRemainAmount = totalCommentsAmount - currentCommentsAmount;
    if (commentsRemainAmount <= 5) {
      commentsLoader.classList.add('hidden');
      commentCount.textContent = '';
      commentCount.innerHTML = `${totalCommentsAmount} из <span class="comments-count">${totalCommentsAmount}</span> комментариев`;
      thumbnailComments = thumbnailCommentsInitial;
    } else {
      currentCommentsAmount += 5;
      commentsRemainAmount -= 5;

      commentCount.textContent = '';
      commentCount.innerHTML = `${currentCommentsAmount} из <span class="comments-count">${totalCommentsAmount}</span> комментариев`;
      thumbnailComments = thumbnailCommentsInitial.slice(0, currentCommentsAmount);
    }
    renderComments(thumbnailComments);
  };

  commentsLoader.addEventListener('click', onClickMoreComments);

  documentBody.classList.add('modal-open');

  // Объявляем обработчик кнопки закрытия по нажатию Esc

  const onPopupEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closePhotoModal();
    }
  };

  // Объявляем функцию, которая закрывает окно и удаляет обработчики

  function closePhotoModal() {
    bigPicture.classList.add('hidden');
    documentBody.classList.remove('modal-open');
    bigPictureCloseButton.removeEventListener('click', closePhotoModal);
    document.removeEventListener('keydown', onPopupEscKeydown);
    commentsLoader.removeEventListener('click', onClickMoreComments);
  }

  // Вешаем обработчики на кнопку закрыти и на документ

  bigPictureCloseButton.addEventListener('click', closePhotoModal);
  document.addEventListener('keydown', onPopupEscKeydown);

};

// Окно с ошибкой загрузки миниатюр

const showErrorGetDataPopup = () => {

  // Клонируем шаблон и помещаем в body

  const errorTemplate = document.querySelector('#error').content;
  const template = errorTemplate.querySelector('.error');

  const fragment = document.createDocumentFragment();

  const element = template.cloneNode(true);
  const errorTitle = element.querySelector('.error__title');
  errorTitle.textContent = 'Ошибка загрузки фотографий';

  const errorButton = element.querySelector('.error__button');
  errorButton.textContent = 'Ок';

  fragment.appendChild(element);

  documentBody.appendChild(fragment);

  // Ищем кнопку закрытия в модалке

  const errorPopupCloseButton = document.querySelector('.error__button');

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
    const errorPopup = document.querySelector('.error');
    documentBody.removeChild(errorPopup);
    document.removeEventListener('click', closeErrorPopupOnClickOutside);
    errorPopupCloseButton.removeEventListener('click', closeErrorPopupOnClick);
    document.removeEventListener('keydown', closeErrorPopupOnEsc);
  }

  // Вешаем обработчики на кнопку закрытия, ESC и область за пределаеми попапа

  document.addEventListener('click', closeErrorPopupOnClickOutside);
  errorPopupCloseButton.addEventListener('click', closeErrorPopupOnClick);
  document.addEventListener('keydown', closeErrorPopupOnEsc);
};


// Export

export {getRandomInt, insertPhotoThumbnail, openFullPhoto, isEscapeKey, showErrorGetDataPopup, getUniqueRandomIntFromRange, clearPhotoThumbnails, throttle};
