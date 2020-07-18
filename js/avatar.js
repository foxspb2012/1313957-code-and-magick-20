'use strict';

(function () {
  var TYPE_FILES = window.const.TYPE_FILES;

  var fileSelect = document.querySelector('.upload input[type=file]');
  var preview = document.querySelector('.setup-user-pic');

  fileSelect.addEventListener('change', function () {
    var file = fileSelect.files[0];
    var fileName = file.name.toLowerCase();

    var matches = TYPE_FILES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

})();
