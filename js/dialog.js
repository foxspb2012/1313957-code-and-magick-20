'use strict';

(function () {

  var MIN_LENGTH = 2;
  var MAX_LENGTH = 25;

  var setupStartingPosition = {
    left: '50%',
    top: '80px'
  };

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupForm = setup.querySelector('.setup-wizard-form');
  var userNameInput = document.querySelector('.setup-user-name');
  var dialogHandle = setup.querySelector('.upload');


  var onPopupCloseClick = function () {
    closePopup();
  };

  var onPopupEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      closePopup();
    }
  };

  var onInvalidNameInput = function () {
    if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  };

  var onNameInput = function () {
    var valueLength = userNameInput.value.length;

    if (valueLength < MIN_LENGTH) {
      userNameInput.setCustomValidity('Ещё ' + (MIN_LENGTH - valueLength) + ' символа(ов)');
    } else if (valueLength > MAX_LENGTH) {
      userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_LENGTH) + ' символа(ов)');
    } else {
      userNameInput.setCustomValidity('');
    }
  };

  var changeColor = function (colorArray, inputField, windowElement, styleElement) {
    setupForm.elements[inputField].value = window.setup.getRandomElement(colorArray);
    windowElement.style[styleElement] = setupForm.elements[inputField].value;
  };

  var onSetupPlayerClick = function (evt) {
    switch (evt.target.classList.value) {
      case 'wizard-coat':
        changeColor(window.setup.COAT_COLORS, 'coat-color', evt.target, 'fill');
        break;
      case 'wizard-eyes':
        changeColor(window.setup.EYES_COLORS, 'eyes-color', evt.target, 'fill');
        break;
      case 'setup-fireball':
        changeColor(window.setup.FIREBALL_COLORS, 'fireball-color', evt.target, 'backgroundColor');
        break;
    }
  };

  var onPopupEscPress = function (evt) {
    if ((evt.key === 'Escape') && (evt.target.classList.value !== 'setup-user-name')) {
      evt.preventDefault();
      closePopup();
    }
  };

  var setSetupPosition = function () {
    setup.style.left = setupStartingPosition.left;
    setup.style.top = setupStartingPosition.top;
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    setSetupPosition();
    document.addEventListener('keydown', onPopupEscPress);
    setupClose.addEventListener('keydown', onPopupEnterPress);
    setupClose.addEventListener('click', onPopupCloseClick);
    setupForm.addEventListener('click', onSetupPlayerClick);
    userNameInput.addEventListener('invalid', onInvalidNameInput);
    userNameInput.addEventListener('input', onNameInput);
    dialogHandle.addEventListener('mousedown', window.move.onMouseDown);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    setupClose.removeEventListener('keydown', onPopupEnterPress);
    setupClose.removeEventListener('click', onPopupCloseClick);
    setupForm.removeEventListener('click', onSetupPlayerClick);
    userNameInput.removeEventListener('invalid', onInvalidNameInput);
    userNameInput.removeEventListener('input', onNameInput);
    dialogHandle.removeEventListener('mousedown', window.move.onMouseDown);
  };

  var listenerClickDown = function (evt) {
    if (evt.which === 1 || evt.key === 'Enter') {
      openPopup();
    }
  };

  setupOpen.addEventListener('click', listenerClickDown);
  setupOpen.addEventListener('keydown', listenerClickDown);

})();
