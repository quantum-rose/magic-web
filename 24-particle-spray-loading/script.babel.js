"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var $cvs = document.querySelector('#cvs');
/* 粒子 */

var Particle = /*#__PURE__*/function () {
  // 横坐标
  // 纵坐标
  // 水平速度
  // 垂直速度
  // 水平加速度
  // 垂直加速度
  function Particle(_ref) {
    var cvsCtx = _ref.cvsCtx,
        x = _ref.x,
        y = _ref.y,
        vx = _ref.vx,
        vy = _ref.vy,
        ax = _ref.ax,
        ay = _ref.ay,
        color = _ref.color,
        _ref$lifetime = _ref.lifetime,
        lifetime = _ref$lifetime === void 0 ? 1 : _ref$lifetime;

    _classCallCheck(this, Particle);

    _defineProperty(this, "cvsCtx", null);

    _defineProperty(this, "r", Math.random() + 0.75);

    _defineProperty(this, "x", 0);

    _defineProperty(this, "y", 0);

    _defineProperty(this, "vx", 0);

    _defineProperty(this, "vy", 0);

    _defineProperty(this, "ax", 0);

    _defineProperty(this, "ay", 0);

    _defineProperty(this, "color", '');

    _defineProperty(this, "lifetime", 1);

    _defineProperty(this, "duration", 0);

    _defineProperty(this, "alpha", 1);

    this.cvsCtx = cvsCtx;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.ax = ax;
    this.ay = ay;
    this.color = color.join(',');
    this.lifetime = lifetime;
  }

  _createClass(Particle, [{
    key: "render",
    value: function render(t) {
      var cvsCtx = this.cvsCtx,
          r = this.r,
          vx = this.vx,
          vy = this.vy,
          ax = this.ax,
          ay = this.ay,
          color = this.color,
          lifetime = this.lifetime;
      this.duration += t;
      this.alpha = Math.pow(1 - Math.min(this.duration / lifetime, 1), 0.5);
      this.vx += ax * t;
      this.vy += ay * t;
      this.x += vx * t;
      this.y += vy * t;
      cvsCtx.beginPath();
      cvsCtx.fillStyle = "rgba(".concat(color, ",").concat(this.alpha, ")");
      cvsCtx.arc(this.x, this.y, r, 0, Math.PI * 2, false);
      cvsCtx.fill();
      cvsCtx.closePath();
    }
  }]);

  return Particle;
}();

var ParticleLoading = /*#__PURE__*/function () {
  _createClass(ParticleLoading, [{
    key: "v",
    get: function get() {
      return this.width / 4;
    }
  }, {
    key: "w",
    get: function get() {
      return this.width * 0.8;
    }
  }, {
    key: "h",
    get: function get() {
      return this.width * 0.04;
    }
  }, {
    key: "x",
    get: function get() {
      return this.width * 0.1;
    }
  }, {
    key: "y",
    get: function get() {
      return (this.height - this.h) * 0.5;
    }
  }]);

  function ParticleLoading() {
    var _this = this;

    _classCallCheck(this, ParticleLoading);

    _defineProperty(this, "cvs", null);

    _defineProperty(this, "cvsCtx", null);

    _defineProperty(this, "width", 0);

    _defineProperty(this, "height", 0);

    _defineProperty(this, "lastTime", 0);

    _defineProperty(this, "lastPercent", 0);

    _defineProperty(this, "percent", 0);

    _defineProperty(this, "particles", []);

    _defineProperty(this, "_onEnterFrame", function () {
      var cvsCtx = _this.cvsCtx,
          width = _this.width,
          height = _this.height,
          w = _this.w,
          h = _this.h,
          x = _this.x,
          y = _this.y,
          v = _this.v,
          percent = _this.percent,
          lastPercent = _this.lastPercent;
      var t = (Date.now() - _this.lastTime) / 1000;
      _this.lastTime = Date.now();
      cvsCtx.clearRect(0, 0, width, height);
      cvsCtx.fillStyle = '#000000';
      cvsCtx.fillRect(0, 0, width, height);
      cvsCtx.fillStyle = '#333333';
      cvsCtx.fillRect(x, y, w, h);
      var f = cvsCtx.createLinearGradient(x, y, x + w, y);
      f.addColorStop(0, 'rgba(255,0,0,1)');
      f.addColorStop(0.25, 'rgba(255,255,0,1');
      f.addColorStop(0.5, 'rgba(0,255,0,1');
      f.addColorStop(0.75, 'rgba(0,255,255,1');
      f.addColorStop(1, 'rgba(0,0,255,1');
      cvsCtx.fillStyle = f;
      cvsCtx.fillRect(x, y, w * percent, h);
      _this.particles = _this.particles.filter(function (item) {
        return item.render(t), item.alpha > 0;
      });

      for (var i = 0; i < (percent - lastPercent) * 5 * width; i++) {
        var rad = (Math.random() / 3 - 1) * Math.PI;

        _this.particles.push(new Particle({
          cvsCtx: cvsCtx,
          x: x + w * percent + 2 - Math.random() * 4,
          y: y + Math.random() * h * 0.5,
          vx: Math.cos(rad) * v * (0.5 + Math.random()),
          vy: Math.sin(rad) * v,
          ax: 0,
          ay: v * 1.5,
          color: _this._color(percent)
        }));
      }

      requestAnimationFrame(_this._onEnterFrame);
    });

    this.cvs = cvs;
    this.cvsCtx = cvs.getContext('2d');
    this.width = this.cvs.width = cvs.offsetWidth * window.devicePixelRatio;
    this.height = this.cvs.height = cvs.offsetHeight * window.devicePixelRatio;
    this.lastTime = Date.now();

    this._init();

    this._onEnterFrame();
  }

  _createClass(ParticleLoading, [{
    key: "update",
    value: function update(percent) {
      this.lastPercent = this.percent;
      this.percent = percent;
    }
  }, {
    key: "_init",
    value: function _init() {
      var _this2 = this;

      window.addEventListener('resize', function () {
        _this2.width = _this2.cvs.width = cvs.offsetWidth * window.devicePixelRatio;
        _this2.height = _this2.cvs.height = cvs.offsetHeight * window.devicePixelRatio;
      });
    }
  }, {
    key: "_color",
    value: function _color(p) {
      var r, g, b;

      if (p < 0.25) {
        r = 255;
        g = 255 * (p / 0.25);
        b = 0;
      } else if (p < 0.5) {
        r = 255 * (1 - (p - 0.25) / 0.25);
        g = 255;
        b = 0;
      } else if (p < 0.75) {
        r = 0;
        g = 255;
        b = 255 * ((p - 0.5) / 0.25);
      } else {
        r = 0;
        g = 255 * (1 - (p - 0.75) / 0.25);
        b = 255;
      }

      return [r, g, b];
    }
  }]);

  return ParticleLoading;
}();

var loading = new ParticleLoading(cvs);
var lastTime = Date.now();
var percent = 0;
var hidden = false;
var pause = false;
var speed = 0.0001;
requestAnimationFrame(function draw() {
  var t = Date.now() - lastTime;

  if (!hidden && !pause) {
    percent = (percent + speed * t) % 1;
  }

  loading.update(percent);
  lastTime += t;
  requestAnimationFrame(draw);
});
document.addEventListener('visibilitychange', function (e) {
  setTimeout(function () {
    hidden = document.hidden;
  }, 0);
});
$cvs.addEventListener('click', function (e) {
  pause = !pause;
});
var $range = document.querySelector('#range');
var $number = document.querySelector('#number');
$range.addEventListener('input', function (e) {
  $number.innerText = (this.value - 0).toFixed(2) + '% / s';
  speed = this.value / 100000;
});
//# sourceMappingURL=script.babel.js.map