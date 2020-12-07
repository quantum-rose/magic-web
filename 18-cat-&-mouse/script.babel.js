"use strict";

var $pupils = document.querySelectorAll('.pupil');
var w = document.body.offsetWidth;
var h = document.body.offsetHeight;
var cx = w / 2;
var cy = h - w * 0.2 * 0.9;
var translateX = 0;
var translateY = 0;
window.addEventListener('resize', function () {
  w = document.body.offsetWidth;
  h = document.body.offsetHeight;
  cx = w / 2;
  cy = h - w * 0.18;
});
window.addEventListener('mousemove', function (e) {
  translateX = (e.clientX - cx) / (w / 2) * 25;
  translateY = (e.clientY - cy) / (h / 2) * 25;
  $pupils.forEach(function (elem) {
    elem.style.transform = "translate3d(".concat(translateX, "%, ").concat(translateY, "%, 0)");
  });
});
//# sourceMappingURL=script.babel.js.map