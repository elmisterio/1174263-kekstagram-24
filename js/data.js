/* eslint-disable no-unused-vars */

import {getRandomInt, isStringFit} from './utils.js';

// Создание массива комментариев

const createCommentsArr = () => {
  const commentsArr = [];
  const sentenciesArr = ['Всё отлично!','В целом всё неплохо. Но не всё.','Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.','Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.','Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  const namesArr = ['Иван','Максим','Светлана','Олег','Ольга','Елена','Артем'];

  return Array.from(Array(2)).map((value, index) => ({
    id: index + getRandomInt(1,500),
    avatar: `img/avatar-${getRandomInt(1,6)}.svg`,
    message: `${sentenciesArr[getRandomInt(0,2)]} ${sentenciesArr[getRandomInt(3,5)]}`,
    name: namesArr[getRandomInt(0,5)],
  }));
};

// Создание массива фотографий

const createPhotosArr = (length) => Array.from(Array(length)).map((value, index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: 'Описание фотографии',
  likes: getRandomInt(15,200),
  comments: createCommentsArr(),
}));

//Export

export {createCommentsArr, createPhotosArr};
