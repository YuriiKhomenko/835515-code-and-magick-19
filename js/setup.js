'use strict';
(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)',
    'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var MAX_WIZARD_AMOUNT = 4;
  var setupWizard = document.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var wizardCoatColor = document.querySelector('input[name=coat-color]');
  var wizardEyesColor = document.querySelector('input[name=eyes-color]');
  var wizardFireballColor = document.querySelector('input[name=fireball-color]');
  var similarListElement = document.querySelector('.setup-similar-list');

  var createWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var renderWizardsOnPage = function (wizardsList) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < MAX_WIZARD_AMOUNT; i++) {
      fragment.appendChild(createWizard(wizardsList[i]));
    }
    similarListElement.appendChild(fragment);
  };

  var successHandler = function (data) {
    renderWizardsOnPage(data);
  };

  window.backend.load(successHandler, window.backend.errorHandler);

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  window.colorize.changeColor(wizardCoat, COAT_COLORS, wizardCoatColor);
  window.colorize.changeColor(wizardEyes, EYES_COLOR, wizardEyesColor);
  window.colorize.changeColor(wizardFireball, FIREBALL_COLORS, wizardFireballColor);
})();
