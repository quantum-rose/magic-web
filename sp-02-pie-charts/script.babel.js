"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var data = [{
  per: 30 / 360,
  fill: '#37c'
}, {
  per: 35 / 360,
  fill: '#3c7'
}, {
  per: 45 / 360,
  fill: 'orange'
}, {
  per: 90 / 360,
  fill: '#f73'
}],
    $pieConicGradient = document.querySelector('.pie-conic-gradient'),
    $pieSvgPath = document.querySelector('.pie-svg-path'),
    $pieSvgDash = document.querySelector('.pie-svg-dash'),
    $pieCanvas = document.querySelector('.pie-canvas');

var PieConicGradient = /*#__PURE__*/function () {
  function PieConicGradient(elem, data) {
    _classCallCheck(this, PieConicGradient);

    _defineProperty(this, "elem", null);

    _defineProperty(this, "data", []);

    this.elem = elem;
    this.data = data;
    this.elem.style.borderRadius = '50%';
    this.elem.style.backgroundColor = '#ccc';

    this._render();
  }

  _createClass(PieConicGradient, [{
    key: "_render",
    value: function _render() {
      var gradientArr = [],
          θ = 0; // 饼图起始位置，圆锥渐变 top 方向为 0deg，right 方向为 90deg

      this.data.forEach(function (item) {
        gradientArr.push("".concat(item.fill, " ").concat(θ, "deg, ").concat(item.fill, " ").concat(θ += 360 * item.per, "deg"));
      });
      this.elem.style.backgroundImage = "conic-gradient(".concat(gradientArr.join(','), ", rgba(0, 0, 0, 0) ").concat(θ, "deg)");
    }
  }, {
    key: "update",
    value: function update(data) {
      this.data = data;

      this._render();
    }
  }]);

  return PieConicGradient;
}();

var pieConicGradient = new PieConicGradient($pieConicGradient, data);

var PieSvgPath = /*#__PURE__*/function () {
  function PieSvgPath(elem, data) {
    _classCallCheck(this, PieSvgPath);

    _defineProperty(this, "elem", null);

    _defineProperty(this, "data", []);

    _defineProperty(this, "pies", []);

    this.elem = elem;
    this.data = data;
    this.elem.setAttribute('viewBox', '0 0 100 100');
    this.elem.innerHTML = "<circle cx=\"50\" cy=\"50\" r=\"50\" fill=\"#ccc\" />";

    this._render();
  }

  _createClass(PieSvgPath, [{
    key: "_render",
    value: function _render() {
      var _this = this;

      var θ = -Math.PI / 2,
          // 饼图起始位置，x 轴正方向为 0，y 轴正方向为 π/2
      x = 50,
          y = 0,
          pie = null,
          θper = 0,
          endX = 0,
          endY = 0;
      this.pies.length = this.data.length;
      this.data.forEach(function (item, i) {
        if (!_this.pies[i]) {
          _this.pies[i] = document.createElementNS('http://www.w3.org/2000/svg', 'path');

          _this.elem.appendChild(_this.pies[i]);
        }

        θ += Math.PI * 2 * item.per;
        θper = Math.PI * 2 * item.per;
        endX = Math.cos(θ) * 50 + 50;
        endY = Math.sin(θ) * 50 + 50;
        pie = _this.pies[i];
        pie.setAttribute('d', "M 50 50 L ".concat(x, " ").concat(y, " A 50 50 0 ").concat(θper > Math.PI ? 1 : 0, " 1 ").concat(endX, " ").concat(endY, " Z"));
        pie.setAttribute('fill', item.fill);
        x = endX;
        y = endY;
      });
    }
  }, {
    key: "update",
    value: function update(data) {
      this.data = data;

      this._render();
    }
  }]);

  return PieSvgPath;
}();

var pieSvgPath = new PieSvgPath($pieSvgPath, data);

var PieSvgDash = /*#__PURE__*/function () {
  function PieSvgDash(elem, data) {
    _classCallCheck(this, PieSvgDash);

    _defineProperty(this, "elem", null);

    _defineProperty(this, "data", []);

    _defineProperty(this, "pies", []);

    this.elem = elem;
    this.data = data;
    this.elem.setAttribute('viewBox', '0 0 100 100');
    this.elem.innerHTML = "<circle cx=\"50\" cy=\"50\" r=\"25\" stroke-width=\"50\" stroke=\"#ccc\" />";

    this._render();
  }

  _createClass(PieSvgDash, [{
    key: "_render",
    value: function _render() {
      var _this2 = this;

      var C = Math.PI * 2 * 25,
          length = 0,
          lengthPer = 0,
          pie = null;
      this.pies.length = this.data.length;
      this.data.forEach(function (item, i) {
        if (!_this2.pies[i]) {
          _this2.pies[i] = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

          _this2.elem.appendChild(_this2.pies[i]);
        }

        lengthPer = C * item.per;
        pie = _this2.pies[i];
        pie.setAttribute('cx', 50);
        pie.setAttribute('cy', 50);
        pie.setAttribute('r', 25);
        pie.setAttribute('stroke', item.fill);
        pie.setAttribute('stroke-width', 50);
        pie.setAttribute('stroke-dasharray', "0 ".concat(length, " ").concat(lengthPer, " ").concat(C));
        pie.setAttribute('fill-opacity', 0);
        pie.setAttribute('transform', 'rotate(-90, 50, 50)');
        length += lengthPer;
      });
    }
  }, {
    key: "update",
    value: function update(data) {
      this.data = data;

      this._render();
    }
  }]);

  return PieSvgDash;
}();

var pieSvgDash = new PieSvgDash($pieSvgDash, data);

var PieCanvas = /*#__PURE__*/function () {
  function PieCanvas(elem, data) {
    var _this3 = this;

    _classCallCheck(this, PieCanvas);

    _defineProperty(this, "elem", null);

    _defineProperty(this, "cvsCtx", null);

    _defineProperty(this, "data", []);

    this.elem = elem;
    this.cvsCtx = this.elem.getContext('2d');
    this.data = data;
    this.elem.width = this.elem.height = this.elem.offsetWidth * window.devicePixelRatio;

    this._render();

    window.addEventListener('resize', function () {
      _this3.elem.width = _this3.elem.height = _this3.elem.offsetWidth * window.devicePixelRatio;

      _this3._render();
    });
  }

  _createClass(PieCanvas, [{
    key: "_render",
    value: function _render() {
      var cvsCtx = this.cvsCtx,
          halfCvsSize = this.elem.width / 2,
          θ = -Math.PI / 2; // 饼图起始位置，x 轴正方向为 0，y 轴正方向为 π/2

      cvsCtx.clearRect(0, 0, this.elem.width, this.elem.height);
      cvsCtx.beginPath();
      cvsCtx.fillStyle = '#ccc';
      cvsCtx.arc(halfCvsSize, halfCvsSize, halfCvsSize, 0, Math.PI * 2, false);
      cvsCtx.fill();
      this.data.forEach(function (item) {
        cvsCtx.beginPath();
        cvsCtx.fillStyle = item.fill;
        cvsCtx.moveTo(halfCvsSize, halfCvsSize);
        cvsCtx.arc(halfCvsSize, halfCvsSize, halfCvsSize, θ, θ += Math.PI * 2 * item.per, false);
        cvsCtx.closePath();
        cvsCtx.fill();
      });
    }
  }, {
    key: "update",
    value: function update(data) {
      this.data = data;

      this._render();
    }
  }]);

  return PieCanvas;
}();

var pieCanvas = new PieCanvas($pieCanvas, data);

(function () {
  var $playPause = document.querySelector('#play-pause'),
      lastTime = 0,
      percent = 0;
  requestAnimationFrame(function update() {
    if (Date.now() - lastTime > 16 && $playPause.checked) {
      lastTime = Date.now();
      percent = (percent + 0.005) % 1;
      data[0].per = 20 / 360 * percent;
      data[1].per = 50 / 360 * percent;
      data[2].per = 100 / 360 * percent;
      data[3].per = 190 / 360 * percent;
      pieConicGradient.update(data);
      pieSvgPath.update(data);
      pieSvgDash.update(data);
      pieCanvas.update(data);
    }

    requestAnimationFrame(update);
  });
})();
//# sourceMappingURL=script.babel.js.map