"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var cvs = document.querySelector('#cvs');
cvs.width = cvs.offsetWidth * window.devicePixelRatio;
cvs.height = cvs.offsetHeight * window.devicePixelRatio;
/* 粒子 */

var Particle = /*#__PURE__*/function () {
  _createClass(Particle, [{
    key: "randomX",
    // canvas 绘图上下文
    // 粒子半径
    // 粒子直径
    // 粒子分布最小坐标
    // 粒子分布最小坐标
    // 粒子分布最大坐标
    // 粒子分布最大坐标
    // 粒子当前色值
    // 粒子透明度
    // 粒子当前坐标
    // 粒子当前坐标
    // 粒子的运动路径队列
    // 是否是自由粒子（不参与组成文字）
    // 粒子动画启动延时
    // 粒子动画持续时间
    // 粒子运动起始色值
    // 粒子运动结束色值
    // 粒子运动起始透明度
    // 粒子运动结束透明度
    // 粒子运动起始坐标
    // 粒子运动起始坐标
    // 粒子运动结束坐标
    // 粒子运动结束坐标
    get: function get() {
      var minX = this.minX,
          maxX = this.maxX,
          diameter = this.diameter;
      return (Math.floor((Math.random() * (maxX - minX) + minX) / diameter) + 0.5) * diameter;
    }
  }, {
    key: "randomY",
    get: function get() {
      var minY = this.minY,
          maxY = this.maxY,
          diameter = this.diameter;
      return (Math.floor((Math.random() * (maxY - minY) + minY) / diameter) + 0.5) * diameter;
    }
  }]);

  function Particle(_ref) {
    var cvsCtx = _ref.cvsCtx,
        radius = _ref.radius,
        minX = _ref.minX,
        minY = _ref.minY,
        maxX = _ref.maxX,
        maxY = _ref.maxY,
        _ref$color = _ref.color,
        color = _ref$color === void 0 ? 0 : _ref$color,
        _ref$alpha = _ref.alpha,
        alpha = _ref$alpha === void 0 ? 1 : _ref$alpha,
        _ref$random = _ref.random,
        random = _ref$random === void 0 ? true : _ref$random,
        _ref$delay = _ref.delay,
        delay = _ref$delay === void 0 ? 0 : _ref$delay,
        _ref$duration = _ref.duration,
        duration = _ref$duration === void 0 ? 1000 : _ref$duration;

    _classCallCheck(this, Particle);

    _defineProperty(this, "cvsCtx", null);

    _defineProperty(this, "radius", 0);

    _defineProperty(this, "diameter", 0);

    _defineProperty(this, "minX", 0);

    _defineProperty(this, "minY", 0);

    _defineProperty(this, "maxX", 0);

    _defineProperty(this, "maxY", 0);

    _defineProperty(this, "color", 0);

    _defineProperty(this, "alpha", 1);

    _defineProperty(this, "x", 0);

    _defineProperty(this, "y", 0);

    _defineProperty(this, "path", []);

    _defineProperty(this, "random", true);

    _defineProperty(this, "delay", 0);

    _defineProperty(this, "duration", 1000);

    _defineProperty(this, "fromColor", 0);

    _defineProperty(this, "toColor", 0);

    _defineProperty(this, "fromAlpha", 0);

    _defineProperty(this, "toAlpha", 0);

    _defineProperty(this, "fromX", 0);

    _defineProperty(this, "fromY", 0);

    _defineProperty(this, "toX", 0);

    _defineProperty(this, "toY", 0);

    _defineProperty(this, "startTime", 0);

    this.cvsCtx = cvsCtx;
    this.radius = radius;
    this.diameter = radius * 2;
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
    this.color = this.fromColor = this.toColor = color;
    this.alpha = this.fromAlpha = this.toAlpha = alpha;
    this.x = this.fromX = this.toX = this.randomX;
    this.y = this.fromY = this.toY = this.randomY;
    this.random = random;
    this.delay = delay;
    this.duration = duration;
  }

  _createClass(Particle, [{
    key: "update",
    value: function update() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          random = _ref2.random,
          delay = _ref2.delay,
          duration = _ref2.duration,
          color = _ref2.color,
          alpha = _ref2.alpha,
          x = _ref2.x,
          y = _ref2.y;

      this.path.push({
        random: random === undefined ? this.random : random,
        delay: delay === undefined ? this.delay : delay,
        duration: duration === undefined ? this.duration : duration,
        color: color === undefined ? this.color : color,
        alpha: alpha === undefined ? this.alpha : alpha,
        x: x === undefined ? this.randomX : x + this.radius,
        y: y === undefined ? this.randomY : y + this.radius
      });
    }
  }, {
    key: "render",
    value: function render() {
      var startTime = this.startTime,
          delay = this.delay,
          duration = this.duration,
          fromColor = this.fromColor,
          toColor = this.toColor,
          fromAlpha = this.fromAlpha,
          toAlpha = this.toAlpha,
          fromX = this.fromX,
          toX = this.toX,
          fromY = this.fromY,
          toY = this.toY,
          cvsCtx = this.cvsCtx,
          radius = this.radius;

      var p = this._easeInOutQuad(Math.max(Math.min((Date.now() - startTime - delay) / duration, 1), 0));

      this.color = (toColor - fromColor) * p + fromColor;
      this.alpha = (toAlpha - fromAlpha) * p + fromAlpha;
      this.x = (toX - fromX) * p + fromX;
      this.y = (toY - fromY) * p + fromY;
      cvsCtx.beginPath();
      cvsCtx.fillStyle = "hsla(".concat(this.color, ", 100%, 50%, ").concat(this.alpha, ")");
      cvsCtx.arc(this.x, this.y, radius * 0.8, 0, Math.PI * 2, false);
      cvsCtx.fill(); // 已运动到当前终点坐标

      if (p === 1) {
        if (this.path.length === 0) {
          if (this.random) {
            this.update({
              random: true
            });
          } else {
            return;
          }
        }

        this.startTime = Date.now();

        var _this$path$shift = this.path.shift(),
            random = _this$path$shift.random,
            _delay = _this$path$shift.delay,
            _duration = _this$path$shift.duration,
            color = _this$path$shift.color,
            alpha = _this$path$shift.alpha,
            x = _this$path$shift.x,
            y = _this$path$shift.y;

        this.fromColor = this.color;
        this.fromAlpha = this.alpha;
        this.fromX = this.x;
        this.fromY = this.y;
        this.random = random;
        this.delay = _delay;
        this.duration = _duration;
        this.toColor = color;
        this.toAlpha = alpha;
        this.toX = x;
        this.toY = y;
      }
    }
  }, {
    key: "_easeInOutQuad",
    value: function _easeInOutQuad(x) {
      return x < 0.5 ? 2 * Math.pow(x, 2) : 1 - Math.pow(2 - 2 * x, 2) / 2;
    }
  }]);

  return Particle;
}();
/* 粒子文本 */


var ParticleText = /*#__PURE__*/function () {
  _createClass(ParticleText, [{
    key: "randomText",
    // 所有粒子
    // 文字轮播队列
    // 粒子画布
    // 粒子画布绘图上下文
    // 文本画布
    // 文本画布绘图上下文
    // 文本画布的imageData
    // 粒子画布与文本画布边长之比
    // 粒子自动扩散延时器
    get: function get() {
      return new Date().toTimeString().match(/^.*(?=\sGMT)/g)[0];
    }
  }, {
    key: "randomColor",
    get: function get() {
      return Math.random() * 360;
    }
  }, {
    key: "randomDelay",
    get: function get() {
      return Math.random() * 1000;
    }
  }, {
    key: "randomDuration",
    get: function get() {
      return 1000 + Math.random() * 1000;
    }
  }, {
    key: "randomAlpha",
    get: function get() {
      return Math.random() > 0.9 ? 0.5 : 0;
    }
  }]);

  function ParticleText(cvs) {
    var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    _classCallCheck(this, ParticleText);

    _defineProperty(this, "particles", []);

    _defineProperty(this, "text", []);

    _defineProperty(this, "cvs", null);

    _defineProperty(this, "cvsCtx", null);

    _defineProperty(this, "textCvs", null);

    _defineProperty(this, "textCvsCtx", null);

    _defineProperty(this, "textData", null);

    _defineProperty(this, "cvsRatio", 10);

    _defineProperty(this, "_spreadTimer", null);

    this.cvs = cvs;
    this.text.push(text || this.randomText);
    this.cvsCtx = cvs.getContext('2d');
    this.textCvs = document.createElement('canvas');
    this.textCvs.width = cvs.width / this.cvsRatio;
    this.textCvs.height = cvs.height / this.cvsRatio;
    this.textCvsCtx = this.textCvs.getContext('2d');

    this._initParticles();

    this._update();

    this._onEnterFrame();
  }

  _createClass(ParticleText, [{
    key: "_initParticles",
    value: function _initParticles() {
      var _this$textCvs = this.textCvs,
          width = _this$textCvs.width,
          height = _this$textCvs.height,
          _this$cvs = this.cvs,
          maxX = _this$cvs.width,
          maxY = _this$cvs.height,
          cvsCtx = this.cvsCtx,
          cvsRatio = this.cvsRatio;
      var color = this.randomColor;

      for (var i = 0; i < width * height / 10; i++) {
        this.particles[i] = new Particle({
          cvsCtx: cvsCtx,
          radius: cvsRatio / 2,
          minX: 0,
          minY: 0,
          maxX: maxX,
          maxY: maxY,
          delay: this.randomDelay,
          duration: this.randomDuration,
          color: color,
          alpha: this.randomAlpha
        });
      }
    }
  }, {
    key: "updateText",
    value: function updateText(text) {
      var _this = this;

      text.split(' ').forEach(function (item) {
        if (/[a-zA-Z]/.test(item)) {
          _this.text.push(item);
        } else {
          var _this$text;

          (_this$text = _this.text).push.apply(_this$text, _toConsumableArray(item.split('')));
        }
      });
    }
  }, {
    key: "_update",
    value: function _update() {
      var _this2 = this;

      var particles = this.particles,
          cvsCtx = this.textCvsCtx,
          cvsRatio = this.cvsRatio;
      var _this$textCvs2 = this.textCvs,
          width = _this$textCvs2.width,
          height = _this$textCvs2.height;
      cvsCtx.clearRect(0, 0, width, height);
      cvsCtx.fillStyle = '#000000';
      cvsCtx.font = "700 ".concat(width / 6.4, "px Helvetica");
      cvsCtx.textAlign = 'center';
      cvsCtx.textBaseline = 'middle';
      cvsCtx.fillText(this.text.shift(), width / 2, height / 2);
      var textData = this.textData = cvsCtx.getImageData(0, 0, width, height); // 组成文字的粒子

      var textParticle = [];

      for (var i = 0; i < textData.data.length; i += 4) {
        if (textData.data[i + 3] !== 0) {
          textParticle.push({
            index: i / 4,
            alpha: textData.data[i + 3] / 255
          });
        }
      } // 设置粒子运动目标


      var color = this.randomColor;

      for (var _i = 0; _i < particles.length; _i++) {
        var option = {
          random: true,
          delay: this.randomDelay,
          duration: this.randomDuration,
          color: color,
          alpha: this.randomAlpha
        };

        if (_i < textParticle.length) {
          var _textParticle$_i = textParticle[_i],
              index = _textParticle$_i.index,
              alpha = _textParticle$_i.alpha;
          option.random = false;
          option.alpha = alpha;
          option.x = index % textData.width * cvsRatio;
          option.y = parseInt(index / textData.width) * cvsRatio;
        }

        particles[_i].update(option);
      } // 一段时间后自动散开


      this._spreadTimer = setTimeout(function () {
        var color = _this2.randomColor;

        for (var _i2 = 0; _i2 < particles.length; _i2++) {
          particles[_i2].update({
            random: true,
            delay: _this2.randomDelay,
            duration: _this2.randomDuration,
            color: color,
            alpha: _this2.randomAlpha
          });
        }

        setTimeout(function () {
          _this2._spreadTimer = null;

          if (_this2.text.length === 0) {
            _this2.text.push(_this2.randomText);
          }

          _this2._update();
        }, 3000);
      }, 6000);
    }
  }, {
    key: "_onEnterFrame",
    value: function _onEnterFrame() {
      var particles = this.particles,
          cvs = this.cvs,
          cvsCtx = this.cvsCtx;
      cvsCtx.clearRect(0, 0, cvs.width, cvs.height);

      for (var i = 0; i < particles.length; i++) {
        particles[i].render();
      }

      requestAnimationFrame(this._onEnterFrame.bind(this));
    }
  }]);

  return ParticleText;
}();

var particleText = new ParticleText(cvs);

(function () {
  var inputContainer = document.querySelector('.input-container');
  var inputContent = inputContainer.querySelector('.input-content');
  var inputMask = inputContent.querySelector('.mask');
  var input = inputContent.querySelector('input');
  var inputContainerVisible = false;
  var inputContentVisible = false;
  window.addEventListener('keyup', function (e) {
    if (e.code === 'Enter' && !inputContainerVisible) {
      inputContainerVisible = true;
      inputContainer.style.display = 'block';
      inputContentVisible = true;
      inputContent.classList.add('show');
      input.focus();
    }
  });
  input.addEventListener('keyup', function (e) {
    if (e.code === 'Enter') {
      inputContentVisible = false;
      inputContent.classList.replace('show', 'hide');
      input.blur();
    }
  });
  input.addEventListener('blur', function (e) {
    if (input.value.trim()) {
      particleText.updateText(input.value.trim());
    }
  });
  inputMask.addEventListener('animationend', function (e) {
    if (!inputContentVisible) {
      inputContainerVisible = false;
      inputContainer.style.display = 'none';
      inputContent.classList.remove('hide');
      input.value = '';
    }
  });
})();
//# sourceMappingURL=script.babel.js.map