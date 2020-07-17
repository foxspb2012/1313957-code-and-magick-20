'use strict';
(function () {
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplateContent = document.querySelector('#similar-wizard-template').content;
  var similarWizardItem = similarWizardTemplateContent.querySelector('.setup-similar-item');

  var createWizard = function (wizard) {
    var wizardElement = similarWizardItem.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var renderWizard = function (wizards) {
    var fragment = document.createDocumentFragment();
    wizards.slice(0, window.const.QUANTITY_WIZARDS).forEach(function (itemWizard) {
      fragment.appendChild(createWizard(itemWizard));
    });
    similarListElement.textContent = '';
    similarListElement.appendChild(fragment);
  };

  var similarDialog = window.dialog.setup.querySelector('.setup-similar');
  similarDialog.classList.remove(window.const.HIDDEN_CLASS);

  window.render = {
    renderWizard: renderWizard,
  };

})();
