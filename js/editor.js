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

  uploadFile.addEventListener('change', function () {
    onEditorOpen();
  });

  // Закрытие редактора фото //
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var closeEditor = pictureOtherUsers.querySelector('.img-upload__cancel');

  var onEditorEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onEditorClose();
    }
  };

  var onEditorClose = function () {
    editorImg.classList.add('hidden');
    document.removeEventListener('keydown', onEditorEscPress);
    uploadFile.value = '';
  };

  closeEditor.addEventListener('click', function () {
    onEditorClose();
  });

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

  smallerScalePhoto.addEventListener('click', function () {
    onScaleReduce();
  });

  biggerScalePhoto.addEventListener('click', function () {
    onScaleIncrease();
  });

  // Выбор эффекта для фото //
  var effectsList = pictureOtherUsers.querySelector('.effects__list');
  var effects = pictureOtherUsers.querySelectorAll('.effects__radio');
  var effectSlider = pictureOtherUsers.querySelector('.effect-level');
  var effectLevel = pictureOtherUsers.querySelector('.effect-level__value');
  var classEffect;

  var onEffectSelect = function () {
    effectLevel.value = 60;
    getLevelEffect();

    for (var i = 0; i < effects.length; i++) {
      classEffect = 'effects__preview--' + effects[i].value;
      effectLevel.value = 60;

      if (effects[i].checked && i === 1) {
        previewPhoto.classList.toggle(classEffect);
        previewPhoto.setAttribute('style', 'filter: grayscale(' + (effectLevel.value / 100) + ')');
        effectSlider.classList.remove('hidden');
      }

      if (effects[i].checked && i === 2) {
        previewPhoto.classList.toggle(classEffect);
        previewPhoto.setAttribute('style', 'filter: sepia(' + (effectLevel.value / 100) + ')');
        effectSlider.classList.remove('hidden');
      }

      if (effects[i].checked && i === 3) {
        previewPhoto.classList.toggle(classEffect);
        previewPhoto.setAttribute('style', 'filter: invert(' + effectLevel.value + '%)');
        effectSlider.classList.remove('hidden');
      }

      if (effects[i].checked && i === 4) {
        previewPhoto.classList.toggle(classEffect);
        previewPhoto.setAttribute('style', 'filter: blur(' + (3 * effectLevel.value / 100) + 'px)');
        effectSlider.classList.remove('hidden');
      }

      if (effects[i].checked && i === 5) {
        previewPhoto.classList.toggle(classEffect);
        previewPhoto.setAttribute('style', 'filter: heat(' + (3 * effectLevel.value / 100) + ')');
        effectSlider.classList.remove('hidden');
      }

      if (effects[i].checked && i === 0) {
        effectSlider.classList.add('hidden');
      }
    }
  };

  effectsList.addEventListener('click', function () {
    onEffectSelect();
  });

  // Выбор интенсивности эффекта для фото //
  var effectLevelPin = pictureOtherUsers.querySelector('.effect-level__pin');
  var effectLevelDepth = pictureOtherUsers.querySelector('.effect-level__depth');

  var getLevelEffect = function () {
    effectLevelPin.setAttribute('style', 'left: ' + effectLevel.value + '%');
    effectLevelDepth.setAttribute('style', 'width: ' + effectLevel.value + '%');
    console.log(effectLevel.value);
  };

})();
