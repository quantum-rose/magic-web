"use strict";

var ani_1 = document.querySelector('#ani-1');
var ani_2 = document.querySelector('#ani-2');
var h = 400; // 水的填充高度

var C = 384; // 周期

var C_1 = C / 4; // 四分之一周期

var C_2 = C / 2; // 四分之二周期

var C_3 = C_1 * 3; // 四分之三周期

var C_num = 20; // 周期数量，波形平移距离为 C_num - 1 个周期的长度

var values_1 = [];
var values_2 = [];

for (var i = 0; i < 5; i++) {
  var A = i % 2 * 40; // 振幅

  var y = Math.abs(i - 2) * h / 2; // 纵坐标

  var startX = C - C_num * C + i / 4 * ((C_num - 1) * C); // 左侧起点横坐标

  var wave = [];

  for (var j = 0; j < C_num; j++) {
    var x = startX + C * j;
    wave[j] = "C".concat(x, ",").concat(y, ",").concat(x + C_1, ",").concat(y + A, ",").concat(x + C_2, ",").concat(y, " C").concat(x + C_2, ",").concat(y, ",").concat(x + C_3, ",").concat(y - A, ",").concat(x + C, ",").concat(y);
  }

  values_1[i] = values_2[4 - i] = "M".concat(startX, ",").concat(y).concat(wave.join(''), "L").concat(C, ",").concat(y, "L").concat(C, ",").concat(y + h, "L").concat(startX, ",").concat(y + h);
}

ani_1.setAttribute('values', values_1.join(';'));
ani_2.setAttribute('values', values_2.join(';'));
//# sourceMappingURL=script.babel.js.map