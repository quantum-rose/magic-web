"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ListItem = /*#__PURE__*/function () {
  function ListItem(template) {
    _classCallCheck(this, ListItem);

    _defineProperty(this, "_visible", false);

    this.template = template;
    this.node = null;
  }

  _createClass(ListItem, [{
    key: "visible",
    get: function get() {
      return this._visible;
    },
    set: function set(val) {
      this._visible = val;

      if (val && !this.node) {
        this.node = document.createElement('li');
        this.node.innerHTML = this.template;
      }
    }
  }]);

  return ListItem;
}();

var VirtualList = /*#__PURE__*/function () {
  function VirtualList(elem, listItems, itemHeight) {
    var _this = this;

    _classCallCheck(this, VirtualList);

    this.$root = elem;
    this.listItems = listItems;
    this.itemHeight = itemHeight;
    this.$startOffset = document.createElement('div');
    this.$startOffset.classList.add('start-offset');
    this.$root.appendChild(this.$startOffset);
    this.$list = document.createElement('ul');
    this.$list.classList.add('list');
    this.$root.appendChild(this.$list);
    this.$endOffset = document.createElement('div');
    this.$endOffset.classList.add('end-offset');
    this.$root.appendChild(this.$endOffset);
    this.height = this.$root.offsetHeight;
    this.visibleCount = Math.ceil(this.height / this.itemHeight) + 1; // 能看到的列表项数量

    this.from = Math.floor(this.$root.scrollTop / this.itemHeight); // 起始项，第一项为0

    this.to = Math.min(this.from + this.visibleCount, this.listItems.length) - 1; // 结束项（包含），最大为length-1

    this.startOffset = this.from * this.itemHeight + 'px'; // 前偏移，刚好为起始项索引乘单项的高度

    this.$startOffset.style.height = this.startOffset;
    this.endOffset = (this.listItems.length - this.to - 1) * this.itemHeight + 'px'; // 后偏移，为(总数-结束项索引-1)乘单项高度

    this.$endOffset.style.height = this.endOffset;
    this.visibleListItems = this.listItems.slice(this.from, this.to + 1); // slice截取数组，不包含第二个参数所指下标项，所以是结束项索引+1

    for (var i = 0; i < this.listItems.length; i++) {
      if (i >= this.from && i <= this.to) {
        if (!this.listItems[i].visible) {
          this.listItems[i].visible = true;
          this.$list.append(this.listItems[i].node);
        }
      } else {
        if (this.listItems[i].visible) {
          this.listItems[i].visible = false;
          this.$list.removeChild(this.listItems[i].node);
        }
      }
    }

    $virtualList.addEventListener('scroll', function (e) {
      var _from = Math.floor($virtualList.scrollTop / _this.itemHeight);

      if (_from !== _this.from) {
        var flag = _from > _this.from;
        _this.from = _from;
        _this.to = Math.min(_this.from + _this.visibleCount, _this.listItems.length) - 1;
        _this.startOffset = _this.from * _this.itemHeight + 'px';
        _this.$startOffset.style.height = _this.startOffset;
        _this.endOffset = (_this.listItems.length - _this.to - 1) * _this.itemHeight + 'px';
        _this.$endOffset.style.height = _this.endOffset;
        _this.visibleListItems = _this.listItems.slice(_this.from, _this.to + 1);

        if (flag) {
          // 向下滚动时，正序遍历，将新的节点插入到列表尾部
          for (var _i = 0; _i < _this.listItems.length; _i++) {
            if (_i >= _this.from && _i <= _this.to) {
              if (!_this.listItems[_i].visible) {
                _this.listItems[_i].visible = true;

                _this.$list.append(_this.listItems[_i].node);
              }
            } else {
              if (_this.listItems[_i].visible) {
                _this.listItems[_i].visible = false;

                _this.$list.removeChild(_this.listItems[_i].node);
              }
            }
          }
        } else {
          // 向上滚动时，倒序遍历，将新的节点插入到列表头部
          for (var _i2 = _this.listItems.length - 1; _i2 >= 0; _i2--) {
            if (_i2 >= _this.from && _i2 <= _this.to) {
              if (!_this.listItems[_i2].visible) {
                _this.listItems[_i2].visible = true;

                _this.$list.prepend(_this.listItems[_i2].node);
              }
            } else {
              if (_this.listItems[_i2].visible) {
                _this.listItems[_i2].visible = false;

                _this.$list.removeChild(_this.listItems[_i2].node);
              }
            }
          }
        }
      }
    });
  }

  _createClass(VirtualList, [{
    key: "scrollTo",
    value: function scrollTo(index) {
      if (index < 0) {
        index = 0;
      }

      if (index > this.listItems.length - 1) {
        index = this.listItems.length - 1;
      }

      this.$root.scrollTop = index * this.itemHeight;
    }
  }]);

  return VirtualList;
}();

var listItems = [];

for (var i = 0; i < 100000; i++) {
  listItems[i] = new ListItem("\n        <div class=\"container\">\n            <div class=\"img\"></div>\n            <div class=\"text\">\n                <input type=\"text\" placeholder=\"".concat(i, "\" />\n            </div>\n        </div>\n    "));
}

var $virtualList = document.querySelector('.virtual-list');
var virtualList = new VirtualList($virtualList, listItems, 120);
var $input = document.querySelector('#index');
var $go = document.querySelector('.go');
$go.addEventListener('click', function () {
  virtualList.scrollTo($input.value);
});
$input.addEventListener('keyup', function (e) {
  if (e.keyCode === 13) {
    virtualList.scrollTo($input.value);
  }
});
//# sourceMappingURL=script.babel.js.map