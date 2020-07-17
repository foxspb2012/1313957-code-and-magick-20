'use strict';
(function () {

  var createRequest = function (xhr, onLoad, onError) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.const.statusCode.OK) {
        onLoad(xhr.response);
        return;
      }
      onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + (xhr.timeout / 1000) + 'секунд');
    });

    xhr.timeout = window.const.TIMEOUT;
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    createRequest(xhr, onLoad, onError);
    xhr.open('GET', window.const.HTTPMethod.GET);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    createRequest(xhr, onLoad, onError);
    xhr.open('POST', window.const.HTTPMethod.POST);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save,
  };
})();
