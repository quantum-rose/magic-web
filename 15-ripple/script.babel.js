"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var mySwiper = new Swiper('.swiper-container', {
  direction: 'vertical',
  // 垂直切换选项
  mousewheel: true,
  pagination: {
    el: '.swiper-pagination'
  }
});

(function (document) {
  var $svg = document.querySelector('#svg');
  var $ripple = document.querySelector('.ripple');
  var $ripples = document.querySelector('#ripples');
  $svg.addEventListener('click', function (e) {
    var matrix = $svg.getScreenCTM().inverse();
    var screenPoint = $svg.createSVGPoint();
    screenPoint.x = e.clientX;
    screenPoint.y = e.clientY;
    var svgPoint = screenPoint.matrixTransform(matrix);
    var $newRipple = $ripple.cloneNode(true);
    $newRipple.setAttribute('transform', "translate(".concat(svgPoint.x, ", ").concat(svgPoint.y, ")"));
    $ripples.appendChild($newRipple);
    var $animates = $newRipple.querySelectorAll('animate');
    var animationendCount = 0;

    var animationend = function animationend() {
      if (++animationendCount == $animates.length) {
        $newRipple.remove();
      }
    };

    $animates.forEach(function (item) {
      item.onend = animationend;
      item.beginElement();
    });
  });
})(document);

(function (window, document) {
  var Wave = /*#__PURE__*/function () {
    function Wave(elem) {
      _classCallCheck(this, Wave);

      this.elem = elem;
      this.id = 'wave' + Date.now();
      this.clicked = false;
      this.init();
    }

    _createClass(Wave, [{
      key: "init",
      value: function init() {
        var _this = this;

        document.body.insertAdjacentHTML('afterbegin', "<svg\n                    version=\"1.1\"\n                    xmlns=\"http://www.w3.org/2000/svg\"\n                    xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n                    style=\"position: absolute; height: 0; clip: rect(0 0 0 0);\"\n                >\n                    <defs>\n                        <filter id=\"".concat(this.id, "\">\n                            <feImage\n                                x=\"0\"\n                                y=\"0\"\n                                width=\"0\"\n                                height=\"0\"\n                                result=\"img\"\n                                xlink:href=\"").concat(this.backgroundImage, "\"\n                            ></feImage>\n                            <feDisplacementMap\n                                in=\"SourceGraphic\"\n                                in2=\"img\"\n                                scale=\"0\"\n                                xChannelSelector=\"R\"\n                                yChannelSelector=\"G\"\n                                color-interpolation-filters=\"sRGB\"\n                            ></feDisplacementMap>\n                            <feComposite operator=\"in\" in2=\"img\"></feComposite>\n                            <feComposite in2=\"SourceGraphic\"></feComposite>\n                        </filter>\n                    </defs>\n                </svg>"));
        this.$feImage = document.querySelector("#".concat(this.id, " feImage"));
        this.$feDisplacementMap = document.querySelector("#".concat(this.id, " feDisplacementMap"));
        this.elem.addEventListener('click', function (e) {
          if (_this.clicked) return;
          _this.clicked = true;
          _this.elem.style.filter = "url(#".concat(_this.id, ")");
          var lastTime = 0;
          var percent = 0;

          var draw = function draw() {
            if (Date.now() - lastTime > 16) {
              lastTime = Date.now();
              percent = Math.min(percent + 0.01, 1);
              var size = 1000 * percent;

              _this.$feImage.setAttribute('x', e.offsetX - size / 2);

              _this.$feImage.setAttribute('y', e.offsetY - size / 2);

              _this.$feImage.setAttribute('width', size);

              _this.$feImage.setAttribute('height', size);

              _this.$feDisplacementMap.setAttribute('scale', 50 * (1 - percent));
            }

            if (percent !== 1) {
              requestAnimationFrame(draw);
            } else {
              _this.clicked = false;
              _this.elem.style.filter = '';
            }
          };

          draw();
        });
      }
    }]);

    return Wave;
  }();

  var radius = 256;
  var cvs = document.createElement('canvas');
  cvs.width = cvs.height = radius * 2;
  var cvsCtx = cvs.getContext('2d');
  cvsCtx.save();
  cvsCtx.translate(radius, radius);
  /* 绘制红绿相间的圆锥渐变，其实是4个线性渐变 */

  for (var i = 0, rad = 0; i < 4; i++) {
    cvsCtx.beginPath();
    cvsCtx.arc(0, 0, 128, rad, rad + Math.PI / 2, false);
    var x0 = radius * Math.cos(rad);
    var y0 = radius * Math.sin(rad);
    rad += Math.PI / 2;
    var x1 = radius * Math.cos(rad);
    var y1 = radius * Math.sin(rad);

    var _f = cvsCtx.createLinearGradient(x0, y0, x1, y1);

    _f.addColorStop(0, i % 2 ? '#f00' : '#0f0');

    _f.addColorStop(1, i % 2 ? '#0f0' : '#f00');

    cvsCtx.strokeStyle = _f;
    cvsCtx.lineWidth = radius;
    cvsCtx.stroke();
  }
  /* 绘制环形条纹 */


  var startRadius = 100;
  var endRadius = 250;
  var l = endRadius - startRadius;
  var f = cvsCtx.createRadialGradient(0, 0, startRadius, 0, 0, endRadius);
  f.addColorStop(0, 'rgba(127,127,127,1)');
  f.addColorStop(17 / l, 'rgba(115,115,115,.8)');
  f.addColorStop(25 / l, 'rgba(115,115,115,0.1)');
  f.addColorStop(28 / l, 'rgba(115,115,115,0.1)');
  f.addColorStop(37 / l, 'rgba(115,104,104,.8)');
  f.addColorStop(43 / l, 'rgba(115,104,104,1)');
  f.addColorStop(44 / l, 'rgba(127,127,127,1)');
  f.addColorStop(50 / l, 'rgba(127,127,127,.6)');
  f.addColorStop(54 / l, 'rgba(127,127,127,0)');
  f.addColorStop(61 / l, 'rgba(0,0,0,0)');
  f.addColorStop(67 / l, 'rgba(0,0,0,1)');
  f.addColorStop(78 / l, 'rgba(0,0,0,1)');
  f.addColorStop(88 / l, 'rgba(0,0,0,0)');
  f.addColorStop(100 / l, 'rgba(0,0,0,0)');
  f.addColorStop(108 / l, 'rgba(0,0,0,1)');
  f.addColorStop(117 / l, 'rgba(0,0,0,1)');
  f.addColorStop(136 / l, 'rgba(0,0,0,0)');
  f.addColorStop(1, 'rgba(0,0,0,0)');
  cvsCtx.beginPath();
  cvsCtx.arc(0, 0, radius, 0, Math.PI * 2);
  cvsCtx.fillStyle = f;
  cvsCtx.fill();
  cvsCtx.restore();
  Wave.prototype.backgroundImage = cvs.toDataURL();
  window.Wave = Wave;
})(window, document);

new Wave(document.querySelector('#pond'));
new Wave(document.querySelector('#box'));
//# sourceMappingURL=script.babel.js.map