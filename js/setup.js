'use strict';

(function () {
  var QUANTITY_WIZARDS = 4;
  var FIRST_NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];

  var LAST_NAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];

  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var setupSimilar = document.querySelector('.setup-similar');
  var similarList = document.querySelector('.setup-similar-list');
  var wizardTemplate = document.querySelector('#similar-wizard-template');
  var wizardItem = wizardTemplate.content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();

  var getRandomInteger = function (num) {
    return Math.floor(Math.random() * num);
  };

  var getRandomElement = function (arr) {
    var randomIndex = getRandomInteger(arr.length);
    return arr[randomIndex];
  };

  var renderWizard = function (wizard) {
    var wizardElement = wizardItem.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var onLoad = function (wizards) {
    for (var i = 0; i < QUANTITY_WIZARDS; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarList.appendChild(fragment);
    setupSimilar.classList.remove('hidden');
  };

  var onError = function (errorMessage) {
    var node = document.querySelector('.error-message');

    if (!node) {
      node = document.createElement('div');
      var isNew = true;
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';
      node.className = 'error-message';
    }
    node.textContent = errorMessage;

    if (isNew) {
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };

  var showSimilarWizards = function () {
    if (similarList.childNodes.length < QUANTITY_WIZARDS) {
      window.backend.load(onLoad, onError);
    }
  };

  window.setup = {
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS,
    FIREBALL_COLORS: FIREBALL_COLORS,

    getRandomElement: getRandomElement,
    showSimilarWizards: showSimilarWizards,
    onError: onError
  };
})();
