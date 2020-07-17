'use strict';

(function () {

  var setup = document.querySelector('.setup');
  var setupClose = setup.querySelector('.setup-close');
  var setupOpen = document.querySelector('.setup-open');

  var onPopupEscPress = function (evt) {
    window.common.runEventEsc(evt, closePopup);
  };

  var openPopup = function () {
    setup.classList.remove(window.const.HIDDEN_CLASS);
    document.addEventListener('keydown', onPopupEscPress);

    var setupWizardForm = setup.querySelector('.setup-wizard-form');
    var setupUserName = setupWizardForm.querySelector('.setup-user-name');

    setupUserName.addEventListener('keydown', function (evt) {
      evt.stopPropagation();
    });

    setupUserName.addEventListener('invalid', function () {
      if (setupUserName.validity.valueMissing) {
        setupUserName.setCustomValidity('Обязательное поле');
        return;
      }
      if (setupUserName.validity.tooShort) {
        setupUserName.setCustomValidity('Имя должно состоять минимум из 2-х символов');
        return;
      }
      if (setupUserName.validity.tooLong) {
        setupUserName.setCustomValidity('Имя не должно превышать 25-ти символов');
        return;
      }
      setupUserName.setCustomValidity('');
    });

    setupUserName.addEventListener('input', function () {
      var valueLength = setupUserName.value.length;

      if (valueLength < window.const.nameLength.MIN) {
        setupUserName.setCustomValidity('Ещё ' + (window.const.nameLength.MIN - valueLength) + ' символ(а)');
        return;
      }
      if (valueLength > window.const.nameLength.MAX) {
        setupUserName.setCustomValidity('Удалите лишние ' + (valueLength - window.const.nameLength.MIN) + ' символ(а)');
        return;
      }
      setupUserName.setCustomValidity('');
    });

    var hiddenCoatColor = setupWizardForm.querySelector('input[name=coat-color]');
    var hiddenEyesColor = setupWizardForm.querySelector('input[name=eyes-color]');
    var hiddenFireballColor = setupWizardForm.querySelector('input[name=fireball-color]');

    var wizardCoat = setupWizardForm.querySelector('.wizard-coat');
    wizardCoat.addEventListener('click', function () {
      var elementColor = window.const.COAT_COLORS[window.common.getRandomInteger(0, window.const.COAT_COLORS.length - 1)];
      wizardCoat.style.fill = elementColor;
      hiddenCoatColor.value = elementColor;
      window.dialog.coatColor = elementColor;

      window.debounce(window.setup.updateWizards);
    });

    var wizardEyes = setupWizardForm.querySelector('.wizard-eyes');
    wizardEyes.addEventListener('click', function () {
      var elementColor = window.common.getRandomElement(window.common.getRandomInteger(0, window.const.EYES_COLORS.length - 1), window.const.EYES_COLORS);
      wizardEyes.style.fill = elementColor;
      hiddenEyesColor.value = elementColor;
      window.dialog.eyesColor = elementColor;

      window.debounce(window.setup.updateWizards);
    });

    var wizardFireball = setupWizardForm.querySelector('.setup-fireball-wrap');
    wizardFireball.addEventListener('click', function () {
      var elementColor = window.common.getRandomElement(window.common.getRandomInteger(0, window.const.FIREBALL_COLORS.length - 1), window.const.FIREBALL_COLORS);
      wizardFireball.style.backgroundColor = elementColor;
      hiddenFireballColor.value = elementColor;
    });

  };

  var closePopup = function () {
    setup.classList.add(window.const.HIDDEN_CLASS);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', openPopup);
  setupOpen.addEventListener('keydown', function (evt) {
    window.common.runEventEnter(evt, openPopup);
  });

  setupClose.addEventListener('click', closePopup);
  setupClose.addEventListener('keydown', function (evt) {
    window.common.runEventEsc(evt, closePopup);
  });

  window.dialog = {
    setup: setup,
    setupOpen: setupOpen,
    setupClose: setupClose,
  };

})();
