// --- РЕДАКТОР ФОТО --- //

'use strict';

(function () {
  var pictureOtherUsers = document.querySelector('.pictures');
  var editorImg = pictureOtherUsers.querySelector('.img-upload__overlay');
  var previewPhoto = editorImg.querySelector('.img-upload__preview img');

  // Открытие редактора фото //
  var uploadFile = pictureOtherUsers.querySelector('.img-upload__input');

  var onEditorOpen = function () {
    editorImg.classList.remove('hidden');
    document.addEventListener('keydown', onEditorEscPress);
  };

  uploadFile.addEventListener('change', onEditorOpen);

  // Закрытие редактора фото //
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var closeEditor = pictureOtherUsers.querySelector('.img-upload__cancel');
  var inputComment = editorImg.querySelector('.text__description');

  var onEditorEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && document.activeElement !== inputComment) {
      onEditorClose();
    }
  };

  var onEditorClose = function () {
    editorImg.classList.add('hidden');
    document.removeEventListener('keydown', onEditorEscPress);
    uploadFile.value = '';
  };

  closeEditor.addEventListener('click', onEditorClose);

  closeEditor.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      onEditorClose();
    }
  });

  // Изменение размера фото //
  var valueScalePhoto = editorImg.querySelector('.scale__control--value');
  var smallerScalePhoto = editorImg.querySelector('.scale__control--smaller');
  var biggerScalePhoto = editorImg.querySelector('.scale__control--bigger');
  var scale = parseInt(valueScalePhoto.value, 10);

  var onScaleReduce = function () {
    if (scale > 25) {
      scale = scale - 25;
      valueScalePhoto.value = scale + '%';
      previewPhoto.style.transform = 'scale(' + scale / 100 + ')';
    }
  };

  var onScaleIncrease = function () {
    if (scale < 100) {
      scale = scale + 25;
      valueScalePhoto.value = scale + '%';
      previewPhoto.style.transform = 'scale(' + scale / 100 + ')';
    }
  };

  smallerScalePhoto.addEventListener('click', onScaleReduce);

  biggerScalePhoto.addEventListener('click', onScaleIncrease);

  // Выбор эффекта для фото //
  var effectsList = pictureOtherUsers.querySelector('.effects__list');
  var effects = pictureOtherUsers.querySelectorAll('.effects__radio');
  var effectSlider = pictureOtherUsers.querySelector('.effect-level');
  var effectLevel = pictureOtherUsers.querySelector('.effect-level__value').value;


  var onEffectSelect = function () {
    for (var i = 0; i < effects.length; i++) {

      if (effects[i].checked) {
        var classEffect = 'effects__preview--' + effects[i].value;
        previewPhoto.classList.toggle(classEffect);

        switch (effects[i].value) {
          case 'none':
            previewPhoto.setAttribute('style', 'filter: none');
            break;
          case 'chrome':
            previewPhoto.setAttribute('style', 'filter: grayscale(' + (effectLevel / 100) + ')');
            break;
          case 'sepia':
            previewPhoto.setAttribute('style', 'filter: sepia(' + (effectLevel / 100) + ')');
            break;
          case 'marvin':
            previewPhoto.setAttribute('style', 'filter: invert(' + effectLevel + '%)');
            break;
          case 'phobos':
            previewPhoto.setAttribute('style', 'filter: blur(' + (3 * effectLevel / 100) + 'px)');
            break;
          case 'heat':
            previewPhoto.setAttribute('style', 'filter: heat(' + (3 * effectLevel / 100) + ')');
            break;
        }

        if (effects[i].value === 'none') {
          effectSlider.classList.add('hidden');
        } else {
          effectSlider.classList.remove('hidden');
        }
      }
    }
  };

  effectsList.addEventListener('click', onEffectSelect);

  // Выбор интенсивности эффекта для фото //
  var effectLevelPin = pictureOtherUsers.querySelector('.effect-level__pin');
  var effectLevelDepth = pictureOtherUsers.querySelector('.effect-level__depth'); //

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoord = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoord - moveEvt.clientX;

      startCoord = moveEvt.clientX;

      effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift) + 'px';
      effectLevelDepth.style.left = (effectLevelDepth.offsetLeft - shift) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
/*
  var onLevelPhoto = function (value) {
    effectLevelPin.setAttribute('style', 'left: ' + value + '%');
    effectLevelDepth.setAttribute('style', 'width: ' + value + '%');
    */

/* Валидация поля "Комментарий" //

  inputComment.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length > 140) {
      target.setCustomValidity('Длина комментария не должна составлять больше 140 символов');
    } else {
      target.setCustomValidity('');
    }
  });
  */

})();
