'use strict';
(function () {
  var changeColor = function (element, colorArray, inputElement) {
    element.addEventListener('click', function () {
      var color = window.util.getRandomElFromArray(colorArray);
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
      }
      element.style.fill = color;
      inputElement.value = color;
    });
  };

  window.colorize = {
    changeColor: changeColor
  };
})();
