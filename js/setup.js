'use strict';

(function () {
  var wizardForm = window.dialog.setup.querySelector('.setup-wizard-form');
  var onFormSubmit = function (evt) {
    window.backend.save(new FormData(wizardForm), function () {
      window.dialog.setup.classList.add(window.const.HIDDEN_CLASS);
    }, onError);
    evt.preventDefault();
  };
  wizardForm.addEventListener('submit', onFormSubmit);

  var coatColor = window.const.COAT_COLORS[0];
  var eyesColor = window.const.EYES_COLORS[0];

  var wizards = [];

  var getImportance = function (wizard) {
    var importance = 0;
    if (wizard.colorCoat === window.dialog.coatColor || wizard.colorCoat === coatColor) {
      importance += 2;
    }
    if (wizard.colorEyes === window.dialog.eyesColor || wizard.colorEyes === eyesColor) {
      importance += 1;
    }
    return importance;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render.renderWizard(wizards.sort(function (left, right) {
      var importanceDiff = getImportance(right) - getImportance(left);
      if (importanceDiff === 0) {
        importanceDiff = namesComparator(left.name, right.name);
      }
      return importanceDiff;
    }));
  };

  var onLoad = function (data) {
    wizards = data;
    updateWizards();
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-message');
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onLoad, onError);

  window.setup = {
    updateWizards: updateWizards,
  };

})();
