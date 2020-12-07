"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var $cvs = document.querySelector('#cvs');
var cvsCtx = $cvs.getContext('2d');
var width = $cvs.width = $cvs.offsetWidth;
var height = $cvs.height = $cvs.offsetHeight;
var cube = [[-0.5, -0.5, -0.5], [-0.5, 0.5, -0.5], [0.5, 0.5, -0.5], [0.5, -0.5, -0.5], [-0.5, -0.5, 0.5], [-0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [0.5, -0.5, 0.5]];
var camera = [0, 0, 2];

var lengthSquare = function lengthSquare(_ref, _ref2) {
  var _ref3 = _slicedToArray(_ref, 3),
      x1 = _ref3[0],
      y1 = _ref3[1],
      z1 = _ref3[2];

  var _ref4 = _slicedToArray(_ref2, 3),
      x2 = _ref4[0],
      y2 = _ref4[1],
      z2 = _ref4[2];

  return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2);
};

var transform = function transform(_ref5) {
  var _ref6 = _slicedToArray(_ref5, 3),
      x = _ref6[0],
      y = _ref6[1],
      z = _ref6[2];

  var cx = camera[0],
      cy = camera[1],
      cz = camera[2];
  return [(x - cx) * cz / (cz - z), (y - cy) * cz / (cz - z)];
};

var renderCube = function renderCube() {
  cvsCtx.save();
  cvsCtx.setTransform(400, 0, 0, -400, width >> 1, height >> 1);

  for (var i = 0; i < cube.length - 1; i++) {
    for (var j = i + 1; j < cube.length; j++) {
      if (lengthSquare(cube[i], cube[j]) <= 1.1) {
        cvsCtx.beginPath();
        cvsCtx.moveTo.apply(cvsCtx, _toConsumableArray(transform(cube[i])));
        cvsCtx.lineTo.apply(cvsCtx, _toConsumableArray(transform(cube[j])));
        cvsCtx.lineWidth = 0.005;
        cvsCtx.strokeStyle = "#ffffff";
        cvsCtx.stroke();
      }
    }
  }

  cvsCtx.beginPath();
  cvsCtx.moveTo.apply(cvsCtx, _toConsumableArray(transform(cube[0])));
  cvsCtx.lineTo.apply(cvsCtx, _toConsumableArray(transform(cube[1])));
  cvsCtx.lineTo.apply(cvsCtx, _toConsumableArray(transform(cube[2])));
  cvsCtx.lineTo.apply(cvsCtx, _toConsumableArray(transform(cube[3])));
  cvsCtx.closePath();
  cvsCtx.fillStyle = 'rgba(0,255,255,0.5)';
  cvsCtx.fill();
  cvsCtx.beginPath();
  cvsCtx.fillStyle = 'red';
  cvsCtx.arc.apply(cvsCtx, _toConsumableArray(transform(cube[0])).concat([0.025 + cube[0][2] * 0.02, 0, Math.PI * 2, false]));
  cvsCtx.fill();
  cvsCtx.restore();
};

requestAnimationFrame(function draw() {
  cvsCtx.clearRect(0, 0, width, height);
  cvsCtx.fillStyle = '#000000';
  cvsCtx.fillRect(0, 0, width, height);
  renderCube();
  requestAnimationFrame(draw);
});
var r = 0.5 * Math.pow(2, 0.5);
var lastPoint = {
  x: 0,
  y: 0
};

var mousemove = function mousemove(e) {
  var x = e.offsetX,
      y = e.offsetY;
  var deltaRadY = (x - lastPoint.x) * 0.00390625;
  var deltaRadX = (y - lastPoint.y) * 0.00390625;
  lastPoint.x = x;
  lastPoint.y = y;

  for (var i = 0; i < cube.length; i++) {
    var radY = Math.atan2(cube[i][2], cube[i][0]) - deltaRadY;
    cube[i][0] = Math.cos(radY) * r;
    cube[i][2] = Math.sin(radY) * r; // const radX = Math.atan2(cube[i][2], cube[i][1]) + deltaRadX;
    // cube[i][1] = Math.cos(radX) * r;
    // cube[i][2] = Math.sin(radX) * r;
  }
};

$cvs.addEventListener('mousedown', function (e) {
  lastPoint.x = e.offsetX;
  lastPoint.y = e.offsetY;
  $cvs.addEventListener('mousemove', mousemove);
});
$cvs.addEventListener('mouseup', function () {
  $cvs.removeEventListener('mousemove', mousemove);
});
//# sourceMappingURL=script.js.map