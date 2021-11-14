// Отрисовка миниатюр от других пользователей

const documentBody = document.querySelector('body');

const insertPhotoThumbnail = (data, node) => {
  const pictureTemplateElement = document.querySelector('#picture').content;
  const templateElement = pictureTemplateElement.querySelector('.picture');

  const fragment = document.createDocumentFragment();

  const newElement = templateElement.cloneNode(true);

  const imgElement = newElement.querySelector('.picture__img');
  imgElement.src = data.url;
  imgElement.setAttribute('data-id', data.id);

  const likesElement = newElement.querySelector('.picture__likes');
  likesElement.textContent = data.likes;

  const commentsAmountElement = newElement.querySelector('.picture__comments');
  commentsAmountElement.textContent = data.comments.length;

  fragment.appendChild(newElement);

  node.appendChild(fragment);

  return newElement;
};

export {insertPhotoThumbnail, documentBody};
