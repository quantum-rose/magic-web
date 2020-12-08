class ListItem {
    constructor(template, index, height) {
        this.template = template;
        this.index = index;
        this.height = height;
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
            this.node.style.top = this.index * this.height + 'px';
            this.node.innerHTML = this.template;
        }
    }
}

class VirtualList {
    constructor(elem, listItems, itemHeight) {
        this.$root = elem;
        this.listItems = listItems;
        this.itemHeight = itemHeight;

        this.$list = document.createElement('ul');
        this.$list.classList.add('list');
        this.$list.style.height = this.listItems.length * this.itemHeight + 'px';
        this.$root.appendChild(this.$list);

        this.height = this.$root.offsetHeight;
        this.visibleCount = Math.ceil(this.height / this.itemHeight) + 1; // 能看到的列表项数量

        this.start = Math.floor(this.$root.scrollTop / this.itemHeight); // 起始项，第一项为0
        this.end = Math.min(this.start + this.visibleCount, this.listItems.length) - 1; // 结束项（包含），最大为length-1

        for (let i = this.start; i <= this.end; i++) {
            this.listItems[i].visible = true;
            this.$list.append(this.listItems[i].node);
        }

        this.$root.addEventListener('scroll', this._onscroll);
    }

    _onscroll = e => {
        const newStart = Math.floor(this.$root.scrollTop / this.itemHeight);
        const newEnd = Math.min(newStart + this.visibleCount, this.listItems.length) - 1;

        if (newEnd < this.start || newStart > this.end) {
            for (let i = this.start; i <= this.end; i++) {
                this.listItems[i].visible = false;
                this.$list.removeChild(this.listItems[i].node);
            }
            for (let i = newStart; i <= newEnd; i++) {
                this.listItems[i].visible = true;
                this.$list.append(this.listItems[i].node);
            }
        } else if (newStart < this.start) {
            for (let i = newEnd + 1; i <= this.end; i++) {
                this.listItems[i].visible = false;
                this.$list.removeChild(this.listItems[i].node);
            }
            for (let i = newStart; i < this.start; i++) {
                this.listItems[i].visible = true;
                this.$list.prepend(this.listItems[i].node);
            }
        } else if (newEnd > this.end) {
            for (let i = this.start; i < newStart; i++) {
                this.listItems[i].visible = false;
                this.$list.removeChild(this.listItems[i].node);
            }
            for (let i = this.end + 1; i <= newEnd; i++) {
                this.listItems[i].visible = true;
                this.$list.append(this.listItems[i].node);
            }
        }

        this.start = newStart;
        this.end = newEnd;
    };

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
    listItems[i] = new ListItem(
        // `<div>#${i}</div>`,
        `<div class="container"><div class="img"></div><div class="text"><input type="text" placeholder="${i}" /></div></div>`,
        i,
        120
    );
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
