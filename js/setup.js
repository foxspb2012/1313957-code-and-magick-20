'use strict';

var QUANTITY_WIZARDS = 4;
var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

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
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupForm = setup.querySelector('.setup-wizard-form');
var userNameInput = document.querySelector('.setup-user-name');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max + 1));
}

function getRandomElement(arr) {
  var randomIndex = getRandomInt(arr.length);
  return arr[randomIndex];
}

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

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' символа(ов)');
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' символа(ов)');
  } else {
    userNameInput.setCustomValidity('');
  }
};

var changeColor = function (colorArray, inputField, windowElement, styleElement) {
  setupForm.elements[inputField].value = getRandomElement(colorArray);
  windowElement.style[styleElement] = setupForm.elements[inputField].value;
};

var onSetupPlayerClick = function (evt) {
  switch (evt.target.classList.value) {
    case 'wizard-coat':
      changeColor(COAT_COLORS, 'coat-color', evt.target, 'fill');
      break;
    case 'wizard-eyes':
      changeColor(EYES_COLORS, 'eyes-color', evt.target, 'fill');
      break;
    case 'setup-fireball':
      changeColor(FIREBALL_COLORS, 'fireball-color', evt.target, 'backgroundColor');
      break;
  }
};

var onPopupEscPress = function (evt) {
  if ((evt.key === 'Escape') && (evt.target.classList.value !== 'setup-user-name')) {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  setupClose.addEventListener('keydown', onPopupEnterPress);
  setupClose.addEventListener('click', onPopupCloseClick);
  setupForm.addEventListener('click', onSetupPlayerClick);
  userNameInput.addEventListener('invalid', onInvalidNameInput);
  userNameInput.addEventListener('input', onNameInput);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  setupClose.removeEventListener('keydown', onPopupEnterPress);
  setupClose.removeEventListener('click', onPopupCloseClick);
  setupForm.removeEventListener('click', onSetupPlayerClick);
  userNameInput.removeEventListener('invalid', onInvalidNameInput);
  userNameInput.removeEventListener('input', onNameInput);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

similarList.appendChild(fragment);
setupSimilar.classList.remove('hidden');
