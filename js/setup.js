'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)',
  'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var setupWindow = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setupWindow.querySelector('.setup-close');
var userNameInput = setupWindow.querySelector('.setup-user-name');
var setupWizard = document.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var wizardCoatColor = document.querySelector('input[name=coat-color]');
var wizardEyesColor = document.querySelector('input[name=eyes-color]');
var wizardFireballColor = document.querySelector('input[name=fireball-color]');
var wizardFireball = document.querySelector('.setup-fireball-wrap');

var getRandomElFromArray = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getWizardData = function () {
  var wizard = {
    'name': getRandomElFromArray(NAMES) + ' ' + getRandomElFromArray(SURNAMES),
    'coatColor': getRandomElFromArray(COAT_COLORS),
    'eyesColor': getRandomElFromArray(EYES_COLOR)
  };
  return wizard;
};

var generateWizards = function () {
  var wizards = [];
  for (var i = 0; i < 4; i++) {
    var wizard = getWizardData();
    wizards.push(wizard);
  }
  return wizards;
};

var createWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var renderWizardsOnPage = function (parent, wizardsList) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizardsList.length; i++) {
    fragment.appendChild(createWizard(wizardsList[i]));
  }
  parent.appendChild(fragment);
};

var wizards = generateWizards();
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

renderWizardsOnPage(similarListElement, wizards);

setupWindow.querySelector('.setup-similar').classList.remove('hidden');

var openSetupWindow = function () {
  setupWindow.classList.remove('hidden');
  document.addEventListener('keydown', onSetupWindowEscPress);
};

var closeSetupWindow = function () {
  setupWindow.classList.add('hidden');
  document.removeEventListener('keydown', onSetupWindowEscPress);
};

var onSetupWindowEscPress = function (evt) {
  if (evt.key === ESC_KEY && evt.target.className !== userNameInput.classList[0]) {
    closeSetupWindow();
  }
};

setupOpen.addEventListener('click', function () {
  openSetupWindow();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openSetupWindow();
  }
});

setupClose.addEventListener('click', function () {
  closeSetupWindow();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closeSetupWindow();
  }
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя должно состоять максимум из 25 символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    userNameInput.setCustomValidity('');
  }
});

wizardCoat.addEventListener('click', function () {
  var color = getRandomElFromArray(COAT_COLORS);
  wizardCoat.style.fill = color;
  wizardCoatColor.value = color;
});

wizardEyes.addEventListener('click', function () {
  var color = getRandomElFromArray(EYES_COLOR);
  wizardEyes.style.fill = color;
  wizardEyesColor.value = color;
});

wizardFireball.addEventListener('click', function () {
  var color = getRandomElFromArray(FIREBALL_COLORS);
  wizardFireball.style.background = color;
  wizardFireballColor.value = color;
});
