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

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max + 1));
  }

  window.setup = {
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS,
    FIREBALL_COLORS: FIREBALL_COLORS,

    getRandomElement: function (arr) {
      var randomIndex = getRandomInt(arr.length);
      return arr[randomIndex];
    }
  };

  var getMassiveData = function () {
    var massiveDatabase = [];
    for (var i = 0; i < QUANTITY_WIZARDS; i++) {
      var wizard = {
        name: FIRST_NAMES[getRandomInt(FIRST_NAMES.length - 1)] + ' ' + LAST_NAMES[getRandomInt(LAST_NAMES.length - 1)],
        coatColor: COAT_COLORS[getRandomInt(COAT_COLORS.length - 1)],
        eyesColor: EYES_COLORS[getRandomInt(EYES_COLORS.length - 1)]
      };
      massiveDatabase.push(wizard);
    }
    return massiveDatabase;
  };

  var createWizard = function (data) {
    var wizard = wizardItem.cloneNode(true);
    var wizardName = wizard.querySelector('.setup-similar-label');
    var wizardCoat = wizard.querySelector('.wizard-coat');
    var wizardEyes = wizard.querySelector('.wizard-eyes');
    wizardName.textContent = data.name;
    wizardCoat.style.fill = data.coatColor;
    wizardEyes.style.fill = data.eyesColor;
    return wizard;
  };

  var database = getMassiveData();

  var addWizard = function (newWizard, sameFragment) {
    sameFragment.appendChild(newWizard);
  };

  for (var i = 0; i < database.length; i++) {
    var sameWizard = createWizard(database[i]);
    addWizard(sameWizard, fragment);
  }

  similarList.appendChild(fragment);
  setupSimilar.classList.remove('hidden');
})();
