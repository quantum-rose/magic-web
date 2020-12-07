"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Puzzle = /*#__PURE__*/function () {
  _createClass(Puzzle, [{
    key: "images",
    // 所有碎片
    get: function get() {
      return this._images;
    },
    set: function set(val) {
      this._images = val;
      this._imageIndex = 0;

      this._changeBackgroundImage();
    }
  }, {
    key: "imageIndex",
    get: function get() {
      return this._imageIndex;
    },
    set: function set(val) {
      this._imageIndex = val;

      this._changeBackgroundImage();
    }
  }]);

  function Puzzle(elem, width, height) {
    var images = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    var piecesNum = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 160;
    var levels = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 8;

    _classCallCheck(this, Puzzle);

    _defineProperty(this, "pieces", []);

    _defineProperty(this, "_images", []);

    _defineProperty(this, "_imageIndex", 0);

    this.elem = elem;
    var id = this.id = parseInt(Math.random() * (0xffffffff - 0xfffffff) + 0xfffffff).toString(16);
    elem.dataset[id] = '';
    elem.style.position = 'relative';
    elem.style.top = '0';
    elem.style.left = '0';
    elem.style.opacity = '0';
    this.$backgroundImage = document.createElement('style');
    document.head.append(this.$backgroundImage);
    this.width = width;
    this.maxOffsetX = width / 20;
    this.height = height;
    this.maxOffsetY = height / 20;
    this.images = images;

    this._preload();

    this.piecesNum = piecesNum;
    this.levels = levels;
    this.cx = width / 2;
    this.cy = height / 2;
    var $style = document.createElement('style');
    $style.innerText = this._compressCss("\n            [data-".concat(id, "] > * {\n                background-size: ").concat(width, "px ").concat(height, "px;\n                background-repeat: no-repeat;\n                position: absolute;\n                box-shadow: 0 0 20px 6px rgba(0, 0, 0, 0.4);\n            }\n            [data-").concat(id, "].in > * {\n                animation: in-").concat(id, " 0.3s ease-out backwards;\n            }\n            [data-").concat(id, "].out > * {\n                animation: out-").concat(id, " 0.3s ease-out forwards;\n            }\n            @keyframes in-").concat(id, " {\n                from {\n                    opacity: 0;\n                    transform: translate3d(").concat(-width, "px, 0, 0) scale(1, 0);\n                }\n            }\n            @keyframes out-").concat(id, " {\n                to {\n                    opacity: 0;\n                    transform: translate3d(").concat(width, "px, 0, 0) scale(1, 0);\n                }\n            }\n        "));
    document.head.append($style);
  }

  _createClass(Puzzle, [{
    key: "init",
    value: function init() {
      var _this = this;

      var elem = this.elem,
          pieces = this.pieces,
          piecesNum = this.piecesNum,
          images = this.images;

      for (var i = 0; i < piecesNum; i++) {
        var piece = pieces[i] = {
          translateX: 0,
          translateY: 0
        };
        piece.elem = document.createElement('div');

        this._setPieceStyle(piece, i);

        elem.append(piece.elem);
      }

      var isClicked = false;
      elem.addEventListener('click', function () {
        if (!isClicked) {
          isClicked = true;
          elem.classList.add('out');
        }
      });
      var animatedCount = 0;
      elem.addEventListener('animationend', function () {
        animatedCount++;

        if (animatedCount === piecesNum) {
          animatedCount = 0;

          if (elem.classList.contains('out')) {
            _this.imageIndex = (_this.imageIndex + 1) % images.length;

            _this.reset();

            requestAnimationFrame(function () {
              elem.classList.remove('out');
              elem.classList.add('in');
            });
          } else if (elem.classList.contains('in')) {
            elem.classList.remove('in');
            isClicked = false;
          }
        }
      });
    }
  }, {
    key: "parallax",
    value: function parallax(offsetXRatio, offsetYRatio) {
      var maxOffsetX = this.maxOffsetX,
          maxOffsetY = this.maxOffsetY,
          levels = this.levels,
          piecesNum = this.piecesNum;
      this.pieces.forEach(function (piece, i) {
        piece.translateX = offsetXRatio * maxOffsetX * (piece.zIndex / levels + i / piecesNum); // 层级越高、索引越大，偏移量越大

        piece.translateY = offsetYRatio * maxOffsetY * (piece.zIndex / levels + i / piecesNum);
        piece.elem.style.transform = "translate3d(".concat(piece.translateX, "px,").concat(piece.translateY, "px,0)");
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      this.pieces.forEach(this._setPieceStyle.bind(this));
    }
  }, {
    key: "_changeBackgroundImage",
    value: function _changeBackgroundImage() {
      this.$backgroundImage.innerText = this._compressCss("\n            [data-".concat(this.id, "] > * {\n                background-image: url(").concat(this.images[this.imageIndex], ");\n            }\n        "));
    }
  }, {
    key: "_setPieceStyle",
    value: function _setPieceStyle(piece, i) {
      var cx = this.cx,
          cy = this.cy,
          levels = this.levels,
          piecesNum = this.piecesNum;
      var style = piece.elem.style;
      var zIndex = piece.zIndex = style.zIndex = Math.floor(Math.pow(i / piecesNum, 1 / 3) * levels + 1); // 非均匀分布，层级越高，碎片数量越多

      var sizeRandom = Math.random();
      var width = piece.width = cx * ((sizeRandom + levels - zIndex) / levels); // 层级越高，尺寸越小

      var height = piece.height = cy * ((sizeRandom + levels - zIndex) / levels);
      style.width = width + 'px';
      style.height = height + 'px';
      var radiusRandom = Math.random();
      var rad = Math.random() * Math.PI * 2; // 随机的角度，碎片将分布在容器的内切椭圆中

      var left = piece.left = cx * ((radiusRandom + zIndex - 1) / levels) * Math.cos(rad) - width / 2; // 层级越高，距离中心越远

      var top = piece.top = cy * ((radiusRandom + zIndex - 1) / levels) * Math.sin(rad) - height / 2;
      style.left = left + 'px';
      style.top = top + 'px';
      style.backgroundPosition = "".concat(-left - cx, "px ").concat(-top - cy, "px");
      style.animationDelay = (Math.random() + i / piecesNum) * 0.5 + 's';
    }
  }, {
    key: "_compressCss",
    value: function _compressCss(css) {
      return css.replace(/\s{2,}/, ' ').replace(/\s*[{};,>~=-]\s*|[(\[:]\s*|\s*[)\]]/g, function (match) {
        return match.trim();
      }).trim();
    }
  }, {
    key: "_preload",
    value: function _preload() {
      var _this2 = this;

      var loadedCount = 0;

      var onLoad = function onLoad() {
        loadedCount++;

        if (loadedCount === this.images.length) {
          this.elem.style.transition = 'opacity 0.2s linear';
          this.elem.style.opacity = '1';
          this.elem.addEventListener('transitionend', function ontransitionend() {
            this.style.transition = '';
            this.style.opacity = '';
            this.removeEventListener('transitionend', ontransitionend);
          });
        }
      };

      this.images.forEach(function (image) {
        var img = document.createElement('img');
        img.src = image;
        img.addEventListener('load', onLoad.bind(_this2));
      });
    }
  }]);

  return Puzzle;
}();

var size = Math.min(window.innerWidth, window.innerHeight);
var puzzle = new Puzzle(document.querySelector('.box'), size, size, ['./img/bg1.jpg', './img/bg2.jpg', './img/bg3.jpg']);
puzzle.imageIndex = Date.now() % 3;
puzzle.init();
window.addEventListener('mousemove', function (e) {
  puzzle.parallax(1 - 2 * e.clientX / window.innerWidth, 1 - 2 * e.clientY / window.innerHeight);
});
//# sourceMappingURL=script.babel.js.map