"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Vector2D = /*#__PURE__*/function () {
  function Vector2D() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Vector2D);

    this.x = x;
    this.y = y;
  }
  /**
   * 向量的模，向量的长度值
   */


  _createClass(Vector2D, [{
    key: "copy",

    /**
     * 复制向量
     */
    value: function copy() {
      return new Vector2D(this.x, this.y);
    }
    /**
     * 向量加法
     * @param {Vector2D} vec 向量
     */

  }, {
    key: "add",
    value: function add(vec) {
      this.x += vec.x;
      this.y += vec.y;
      return this;
    }
    /**
     * 向量减法
     * @param {Vector2D} vec 向量
     */

  }, {
    key: "sub",
    value: function sub(vec) {
      this.x -= vec.x;
      this.y -= vec.y;
      return this;
    }
    /**
     * 点积
     * @param {Vector2D} vec 向量
     */

  }, {
    key: "dot",
    value: function dot(vec) {
      return this.x * vec.x + this.y * vec.y;
    }
    /**
     * 叉积
     * @param {Vector2D} vec 向量
     */

  }, {
    key: "cross",
    value: function cross(vec) {
      return this.x * vec.y - this.y * vec.x;
    }
    /**
     * 向量缩放
     * @param {Number} s 缩放倍数
     */

  }, {
    key: "scale",
    value: function scale(s) {
      this.x *= s;
      this.y *= s;
      return this;
    }
    /**
     * 向量旋转，从 x 轴正方向到 y 轴正方向的旋转为正值
     * @param {Number} rad 弧度
     */

  }, {
    key: "rotate",
    value: function rotate(rad) {
      var cos = Math.cos(rad);
      var sin = Math.sin(rad);
      var x = this.x,
          y = this.y;
      this.x = cos * x + sin * y;
      this.y = -sin * x + cos * y;
      return this;
    }
    /**
     * 化为单位向量
     */

  }, {
    key: "normalize",
    value: function normalize() {
      return this.scale(1 / this.norm);
    }
  }, {
    key: "norm",
    set: function set(val) {},
    get: function get() {
      return Math.hypot(this.x, this.y);
    }
    /**
     * 方向，弧度值，向量到 x 轴正方向的角度，y 轴正方向为90度
     */

  }, {
    key: "dir",
    set: function set(val) {},
    get: function get() {
      return Math.atan2(this.y, this.x);
    }
  }]);

  return Vector2D;
}();

var cvs = document.querySelector('#tree'),
    cvsCtx = cvs.getContext('2d');
cvs.width = cvs.offsetWidth * window.devicePixelRatio;
cvs.height = cvs.offsetHeight * window.devicePixelRatio;
cvs.style.width = cvs.offsetWidth + 'px';
cvs.style.height = cvs.offsetHeight + 'px';
cvsCtx.transform(1, 0, 0, -1, cvs.width / 2, cvs.height);

function drawBranch(cvsCtx, totalLength, start, end, lineWidth, strokeStyle, callback) {
  var deltaX = end.x - start.x;
  var deltaY = end.y - start.y;
  var length = 0;
  var lastTime = 0;
  requestAnimationFrame(function draw() {
    if (Date.now() - lastTime > 16) {
      lastTime = Date.now();
      length += 10;
      length > totalLength && (length = totalLength);
      var progress = length / totalLength;
      cvsCtx.beginPath();
      cvsCtx.strokeStyle = strokeStyle;
      cvsCtx.lineWidth = lineWidth;
      cvsCtx.lineCap = 'round';
      cvsCtx.moveTo(start.x, start.y);
      cvsCtx.lineTo(start.x + deltaX * progress, start.y + deltaY * progress);
      cvsCtx.stroke();
    }

    if (length !== totalLength) {
      requestAnimationFrame(draw);
    } else {
      callback();
    }
  });
}

function drawTree(cvsCtx, start, length, width, dir, bias) {
  var end = new Vector2D().scale(length).rotate(dir).add(start);
  drawBranch(cvsCtx, length, start, end, width, '#000', function () {
    if (width >= 1) {
      drawTree(cvsCtx, end, length * 0.8, width * 0.8, dir + Math.PI * 0.125 + bias * (0.5 - Math.random()), bias * 0.9);
      drawTree(cvsCtx, end, length * 0.8, width * 0.8, dir - Math.PI * 0.125 + bias * (0.5 - Math.random()), bias * 0.9);
    }

    if (width < 5 && Math.random() < 0.2) {
      cvsCtx.save();
      cvsCtx.strokeStyle = '#c72c35';
      cvsCtx.lineWidth = Math.random() * 10 + 3;
      cvsCtx.lineCap = 'round';
      cvsCtx.beginPath();
      cvsCtx.moveTo(end.x, end.y - 1);
      cvsCtx.lineTo(end.x, end.y + 1);
      cvsCtx.stroke();
      cvsCtx.restore();
    }
  });
}

drawTree(cvsCtx, new Vector2D(0, 0), Math.min(cvs.width, cvs.height) * 0.2, Math.min(cvs.width, cvs.height) * 0.02, Math.PI * -0.5 + (0.5 - Math.random()), Math.PI / 3);
//# sourceMappingURL=script.babel.js.map