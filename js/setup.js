'use strict';
(function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)',
    'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var setupWizard = document.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var wizardCoatColor = document.querySelector('input[name=coat-color]');
  var wizardEyesColor = document.querySelector('input[name=eyes-color]');
  var wizardFireballColor = document.querySelector('input[name=fireball-color]');

  var getWizardData = function () {
    var wizard = {
      'name': window.util.getRandomElFromArray(NAMES) + ' ' + window.util.getRandomElFromArray(SURNAMES),
      'coatColor': window.util.getRandomElFromArray(COAT_COLORS),
      'eyesColor': window.util.getRandomElFromArray(EYES_COLOR)
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

  window.colorize.changeColor(wizardCoat, COAT_COLORS, wizardCoatColor);
  window.colorize.changeColor(wizardEyes, EYES_COLOR, wizardEyesColor);
  window.colorize.changeColor(wizardFireball, FIREBALL_COLORS, wizardFireballColor);
})();
