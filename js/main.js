'use strict';

(function () {
/*
  var NOTES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var numberPhotos = 25;
  var numberLikes = 200;
  var numberComments = 3;

  var getRandom = function (min, max) {
    return Math.floor(Math.random() * ((max + 1) - min)) + min;
  };

  var getUrl = function (number) {
    var urls = [];
    for (var i = 0; i < number; i++) {
      urls[i] = i + 1;
    }
    urls.sort(function () {
      return 0.5 - Math.random();
    });

    return urls;
  };

  var getComments = function (number) {
    var comments = [];
    for (var i = 0; i < number; i++) {
      comments[i] = {
        avatar: 'img/avatar-' + getRandom(1, 6) + '.svg',
        message: NOTES[getRandom(0, NOTES.length - 1)],
        name: NAMES[getRandom(0, NAMES.length - 1)]
      };
    }

    return comments;
  };

  var getPhotos = function (number) {
    var photos = [];
    for (var i = 0; i < number; i++) {
      photos[i] = {
        url: 'photos/' + urls[i] + '.jpg',
        likes: getRandom(15, numberLikes),
        comments: getComments(getRandom(1, numberComments))
      };
    }

    return photos;
  };

  var urls = getUrl(numberPhotos);
  var photos = getPhotos(numberPhotos);
*/
  var pictureOtherUsers = document.querySelector('.pictures');

  var pictureUserTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var renderPicture = function (photo) {
    var pictureElement = pictureUserTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').setAttribute('src', photo.url);
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return pictureElement;
  };

  var successLoad = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPicture(photos[i]));
    }
    pictureOtherUsers.appendChild(fragment);
  };

  window.load(successLoad);
})();
