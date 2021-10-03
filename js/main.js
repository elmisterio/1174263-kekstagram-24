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

getRandomInt(0,10);


// Функция для проверки максимальной длины строки

function isStringFit(string, maxlength) {
  return +string.length <= maxlength;
}

isStringFit('Привет', 7);


// Больше деталей

const getPhotosArr = () => {
  const photoArr = [];
  const commentsArr = ['Всё отлично!','В целом всё неплохо. Но не всё.','Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.','Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.','Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  const namesArr = ['Иван','Максим','Светлана','Олег','Ольга','Елена','Артем'];

  // eslint-disable-next-line id-length
  for (let i = 0; i < 25; i++ ) {
    photoArr.push({
      id: i + 1,
      url: `photos/${i + 1}.jpg`,
      description: 'Описание фотографии',
      likes: getRandomInt(15,200),
      comments: [
        {
          id: i + 5,
          avatar: `img/avatar-${getRandomInt(1,6)}.svg`,
          message: `${commentsArr[getRandomInt(0,2)]} ${commentsArr[getRandomInt(3,5)]}`,
          name: namesArr[getRandomInt(0,5)],
        },
      ],
    });
  }

  return photoArr;
};

getPhotosArr();
