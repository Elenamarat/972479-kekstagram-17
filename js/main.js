'use strict';

(function () {

  var pictureOtherUsers = document.querySelector('.pictures');
  var filterPicture = document.querySelector('.img-filters');
  var filterPopular = filterPicture.querySelector('.img-filters__button--popular');
  var filterNew = filterPicture.querySelector('.img-filters__button--new');
  var filterDiscussed = filterPicture.querySelector('.img-filters__button--discussed');
  var photos = [];

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

  var renderPhotos = function (pictures) {
    pictureOtherUsers.innerHTML = '';
    for (var i = 0; i < pictures.length; i++) {
      pictureOtherUsers.appendChild(renderPicture(pictures[i]));
    }

    filterPicture.classList.remove('img-filters--inactive');
  };

  filterPopular.addEventListener('click', function () {
    window.debounce(renderPhotos(photos));
  });

  filterNew.addEventListener('click', function () {
    var newPhotos = photos.slice();
    newPhotos.sort(function () {
      return 0.5 - Math.random();
    });

    window.debounce(renderPhotos(newPhotos.slice(0, 10)));
  });

  filterDiscussed.addEventListener('click', function () {
    var photosCopy = photos.slice();
    photosCopy.sort(function (first, second) {
      if (first.comments.length < second.comments.length) {
        return 1;
      } else if (first.comments.length > second.comments.length) {
        return -1;
      } else {
        return 0;
      }
    });

    window.debounce(renderPhotos(photosCopy));
  });

  var successLoad = function (data) {
    photos = data;
    renderPhotos(photos);
  };

  window.load(successLoad);
})();
