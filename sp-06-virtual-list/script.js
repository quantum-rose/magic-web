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
    constructor(elem, listItems) {
        this.$root = elem;
        this.listItems = listItems;
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
        this.visibleCount = Math.ceil(this.height / 120) + 2;
        window.addEventListener('resize', () => {
            this.height = this.$root.offsetHeight;
            this.visibleCount = Math.ceil(this.height / 120) + 2;
        });

        this.from = Math.floor(this.$root.scrollTop / 120);
        this.to = Math.min(this.from + this.visibleCount - 1, this.listItems.length);
        this.startOffset = this.from * 120 + 'px';
        this.$startOffset.style.height = this.startOffset;
        this.endOffset = (this.listItems.length - this.to) * 120 + 'px';
        this.$endOffset.style.height = this.endOffset;
        this.visibleListItems = this.listItems.slice(this.from, this.to + 1);

        for (let i = 0; i < this.listItems.length; i++) {
            if (i >= this.from && i < this.to) {
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
            const _from = Math.floor($virtualList.scrollTop / 120);
            if (_from !== this.from) {
                const flag = _from > this.from;
                this.from = _from;
                this.to = Math.min(this.from + this.visibleCount - 1, this.listItems.length);
                this.startOffset = this.from * 120 + 'px';
                this.$startOffset.style.height = this.startOffset;
                this.endOffset = (this.listItems.length - this.to) * 120 + 'px';
                this.$endOffset.style.height = this.endOffset;
                this.visibleListItems = this.listItems.slice(this.from, this.to + 1);

                if (flag) {
                    for (let i = 0; i < this.listItems.length; i++) {
                        if (i >= this.from && i < this.to) {
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
                    for (let i = this.listItems.length - 1; i >= 0; i--) {
                        if (i >= this.from && i < this.to) {
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
        this.$root.scrollTop = index * 120;
    }
}

const listItems = [];

for (let i = 0; i < 100000; i++) {
    listItems[i] = new ListItem(`
        <div class="container">
            <div class="img"></div>
            <div class="text">${i}</div>
        </div>
    `);
}

const $virtualList = document.querySelector('.virtual-list');
const virtualList = new VirtualList($virtualList, listItems);

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
