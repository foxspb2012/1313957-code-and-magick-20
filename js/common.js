'use strict';

(function () {

  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomElement = function (randomIndex, items) {
    return items[randomIndex];
  };

  var runEventEnter = function (evt, action) {
    if (evt.key === window.const.Key.ENTER) {
      action();
    }
  };

  var runEventEsc = function (evt, action) {
    if (evt.key === window.const.Key.ESCAPE) {
      action();
    }
  };

  window.common = {
    getRandomInteger: getRandomInteger,
    getRandomElement: getRandomElement,
    runEventEnter: runEventEnter,
    runEventEsc: runEventEsc
  };

})();
