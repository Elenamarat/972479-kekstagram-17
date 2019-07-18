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
  var effectLevel = pictureOtherUsers.querySelector('.effect-level__value').level;

  var onEffectSelect = function () {
    // onLevelPhoto(effectLevel); //

    for (var i = 0; i < effects.length; i++) {
      var classEffect = 'effects__preview--' + effects[i].value;
      effectLevel = 100;

      if (effects[i].checked && i === 0) {
        previewPhoto.classList.toggle('effects__preview--none');
        previewPhoto.setAttribute('style', 'filter: none');
        effectSlider.classList.add('hidden');
      }
      if (effects[i].checked && i === 1) {
        previewPhoto.classList.toggle(classEffect);
        previewPhoto.setAttribute('style', 'filter: grayscale(' + (effectLevel / 100) + ')');
        effectSlider.classList.remove('hidden');
      }

      if (effects[i].checked && i === 2) {
        previewPhoto.classList.toggle(classEffect);
        previewPhoto.setAttribute('style', 'filter: sepia(' + (effectLevel / 100) + ')');
        effectSlider.classList.remove('hidden');
      }

      if (effects[i].checked && i === 3) {
        previewPhoto.classList.toggle(classEffect);
        previewPhoto.setAttribute('style', 'filter: invert(' + effectLevel + '%)');
        effectSlider.classList.remove('hidden');
      }

      if (effects[i].checked && i === 4) {
        previewPhoto.classList.toggle(classEffect);
        previewPhoto.setAttribute('style', 'filter: blur(' + (3 * effectLevel / 100) + 'px)');
        effectSlider.classList.remove('hidden');
      }

      if (effects[i].checked && i === 5) {
        previewPhoto.classList.toggle(classEffect);
        previewPhoto.setAttribute('style', 'filter: heat(' + (3 * effectLevel / 100) + ')');
        effectSlider.classList.remove('hidden');
      }
    }
  };

  effectsList.addEventListener('click', onEffectSelect);

  // Выбор интенсивности эффекта для фото //
  var effectLevelPin = pictureOtherUsers.querySelector('.effect-level__pin');
  var effectLevelDepth = pictureOtherUsers.querySelector('.effect-level__depth');

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    // Код перемещения//
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      effectLevelPin.style.top = (effectLevelPin.offsetTop - shift.y) + 'px';
      effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          effectLevelPin.removeEventListener('click', onClickPreventDefault);
        };
        effectLevelPin.addEventListener('click', onClickPreventDefault);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };
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
