// Функция, возвращающая случайное целое число из переданного диапазона включительно

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInt(0,10);


// Функция для проверки максимальной длины строки

function isStringFit(string, maxlength) {
  string = toString(string);
  return string.length <= maxlength;
}

isStringFit('Привет', 7);
