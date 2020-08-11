class ListItem {
    constructor(template) {
        this.template = template;
        this.node = null;
    }

    _visible = false;
    get visible() {
        return this._visible;
    }
    set visible(val) {
        this._visible = val;
        if (val && !this.node) {
            this.node = document.createElement('li');
            this.node.innerHTML = this.template;
        }
    }
}

class VirtualList {
    constructor(elem, listItems, itemHeight) {
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

        for (let i = 0; i < this.listItems.length; i++) {
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

        $virtualList.addEventListener('scroll', e => {
            const _from = Math.floor($virtualList.scrollTop / this.itemHeight);
            if (_from !== this.from) {
                const flag = _from > this.from;
                this.from = _from;
                this.to = Math.min(this.from + this.visibleCount, this.listItems.length) - 1;
                this.startOffset = this.from * this.itemHeight + 'px';
                this.$startOffset.style.height = this.startOffset;
                this.endOffset = (this.listItems.length - this.to - 1) * this.itemHeight + 'px';
                this.$endOffset.style.height = this.endOffset;
                this.visibleListItems = this.listItems.slice(this.from, this.to + 1);

                if (flag) {
                    // 向下滚动时，正序遍历，将新的节点插入到列表尾部
                    for (let i = 0; i < this.listItems.length; i++) {
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
                } else {
                    // 向上滚动时，倒序遍历，将新的节点插入到列表头部
                    for (let i = this.listItems.length - 1; i >= 0; i--) {
                        if (i >= this.from && i <= this.to) {
                            if (!this.listItems[i].visible) {
                                this.listItems[i].visible = true;
                                this.$list.prepend(this.listItems[i].node);
                            }
                        } else {
                            if (this.listItems[i].visible) {
                                this.listItems[i].visible = false;
                                this.$list.removeChild(this.listItems[i].node);
                            }
                        }
                    }
                }
            }
        });
    }

    scrollTo(index) {
        if (index < 0) {
            index = 0;
        }
        if (index > this.listItems.length - 1) {
            index = this.listItems.length - 1;
        }
        this.$root.scrollTop = index * this.itemHeight;
    }
}

const listItems = [];
for (let i = 0; i < 100000; i++) {
    listItems[i] = new ListItem(`
        <div class="container">
            <div class="img"></div>
            <div class="text">
                <input type="text" placeholder="${i}" />
            </div>
        </div>
    `);
}

const $virtualList = document.querySelector('.virtual-list');
const virtualList = new VirtualList($virtualList, listItems, 120);

const $input = document.querySelector('#index');
const $go = document.querySelector('.go');
$go.addEventListener('click', function () {
    virtualList.scrollTo($input.value);
});
$input.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        virtualList.scrollTo($input.value);
    }
});
