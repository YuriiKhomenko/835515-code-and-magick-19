'use strict';
(function () {
  var setupWindow = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setupWindow.querySelector('.setup-close');
  var userNameInput = setupWindow.querySelector('.setup-user-name');
  var form = setupWindow.querySelector('.setup-wizard-form');
  var setupWindowStartCoords = {
    top: '80px',
    left: '50%'
  };

  setupWindow.querySelector('.setup-similar').classList.remove('hidden');

  var openSetupWindow = function () {
    setupWindow.classList.remove('hidden');
    document.addEventListener('keydown', onSetupWindowEscPress);
  };

  var closeSetupWindow = function () {
    setupWindow.classList.add('hidden');
    document.removeEventListener('keydown', onSetupWindowEscPress);
    setupWindow.style.top = setupWindowStartCoords.top;
    setupWindow.style.left = setupWindowStartCoords.left;
  };

  var onSetupWindowEscPress = function (evt) {
    if (evt.target.className !== userNameInput.classList[0]) {
      window.util.isEscEvent(evt, closeSetupWindow);
    }
  };

  setupOpen.addEventListener('click', function () {
    openSetupWindow();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openSetupWindow);
  });

  setupClose.addEventListener('click', function () {
    closeSetupWindow();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closeSetupWindow);
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

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(form), function () {
      setupWindow.classList.add('hidden');
    }, window.backend.errorHandler);
  });
})();
