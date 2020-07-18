'use strict';

(function () {
  var key = {
    ESCAPE: 'Escape',
    ENTER: 'Enter',
  };

  var nameLength = {
    MIN: 2,
    MAX: 25,
  };

  var HTTPMethods = {
    POST: 'https://javascript.pages.academy/code-and-magick',
    GET: 'https://javascript.pages.academy/code-and-magick/data',
  };

  var statusCode = {
    OK: 200
  };

  var HIDDEN_CLASS = 'hidden';

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

  var WIDTH_RECT = 420;
  var HEIGHT_RECT = 270;
  var X_RECT = 100;
  var Y_RECT = 10;
  var GAP = 5;
  var LINE_HEIGHT = 20;
  var BAR_WIDTH = 40;
  var BAR_MAX_HEIGHT = 150;
  var COLOR_YOU = 'rgba(255, 0, 0, 1)';
  var TIMEOUT = 5000;
  var QUANTITY_WIZARDS = 4;
  var DEBOUNCE_INTERVAL = 300;
  var TYPE_FILES = ['gif', 'jpg', 'jpeg', 'png'];

  window.const = {
    key: key,
    nameLength: nameLength,
    HTTPMethod: HTTPMethods,
    statusCode: statusCode,
    HIDDEN_CLASS: HIDDEN_CLASS,
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS,
    FIREBALL_COLORS: FIREBALL_COLORS,
    WIDTH_RECT: WIDTH_RECT,
    HEIGHT_RECT: HEIGHT_RECT,
    X_RECT: X_RECT,
    Y_RECT: Y_RECT,
    GAP: GAP,
    LINE_HEIGHT: LINE_HEIGHT,
    BAR_WIDTH: BAR_WIDTH,
    BAR_MAX_HEIGHT: BAR_MAX_HEIGHT,
    COLOR_YOU: COLOR_YOU,
    TIMEOUT: TIMEOUT,
    QUANTITY_WIZARDS: QUANTITY_WIZARDS,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
    TYPE_FILES: TYPE_FILES,
  };

})();
