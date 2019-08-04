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
  var effectLevel = pictureOtherUsers.querySelector('.effect-level__value');

  effectSlider.classList.add('hidden');

  var onEffectSelect = function () {
    var effectLevelValue = effectLevel.value;

    for (var i = 0; i < effects.length; i++) {

      if (effects[i].checked) {
        var classEffect = 'effects__preview--' + effects[i].value;
        previewPhoto.classList.toggle(classEffect);

        switch (effects[i].value) {
          case 'none':
            previewPhoto.setAttribute('style', 'filter: none');
            break;
          case 'chrome':
            previewPhoto.setAttribute('style', 'filter: grayscale(' + (effectLevelValue / 100) + ')');
            break;
          case 'sepia':
            previewPhoto.setAttribute('style', 'filter: sepia(' + (effectLevelValue / 100) + ')');
            break;
          case 'marvin':
            previewPhoto.setAttribute('style', 'filter: invert(' + effectLevelValue + '%)');
            break;
          case 'phobos':
            previewPhoto.setAttribute('style', 'filter: blur(' + (3 * effectLevelValue / 100) + 'px)');
            break;
          case 'heat':
            previewPhoto.setAttribute('style', 'filter: heat(' + (3 * effectLevelValue / 100) + ')');
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
  var effectLevelLine = pictureOtherUsers.querySelector('.effect-level__line');

  effectLevelLine.addEventListener('mouseup', onMouseUpWithoutMove);
  effectLevelPin.addEventListener('mousedown', onMouseDown);

  function onMouseUpWithoutMove(evt) {
    var effectLevelValue = evt.offsetX / effectLevelLine.offsetWidth * 100;
    setEffectLevel(evt, effectLevelValue);
  }

  function onMouseDown(evt) {
    var initialPosition = evt.clientX;
    function onMouseMove(moveEvt) {
      var shift = initialPosition - moveEvt.clientX;
      var effectLevelValue = (effectLevelPin.offsetLeft - shift) / effectLevelLine.offsetWidth * 100;
      initialPosition = moveEvt.clientX;

      if (effectLevelValue > 0 && effectLevelValue < 100) {
        setEffectLevel(moveEvt, effectLevelValue);
      }
      moveEvt.preventDefault();
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      effectLevelLine.addEventListener('mouseup', onMouseUpWithoutMove);
    }

    evt.preventDefault();
    effectLevelLine.removeEventListener('mouseup', onMouseUpWithoutMove);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function setEffectLevel(evt, effectLevelValue) {
    effectLevelPin.style.left = effectLevelValue + '%';
    effectLevelDepth.style.width = effectLevelValue + '%';
    effectLevel.setAttribute('value', effectLevelValue);

    onEffectSelect();
  }

})();
