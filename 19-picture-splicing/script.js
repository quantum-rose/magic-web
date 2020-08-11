class Puzzle {
    pieces = []; // 所有碎片

    constructor(elem, width, height, image, piecesNum = 100) {
        this.elem = elem;
        const id = parseInt(Math.random() * (0xffffff - 0xfffff) + 0xfffff).toString(16);
        elem.dataset[id] = '';
        elem.style.position = 'relative';
        elem.style.top = '0';
        elem.style.left = '0';
        this.width = width;
        elem.style.width = width + 'px';
        this.height = height;
        elem.style.height = height + 'px';

        const style = document.createElement('style');
        const css = this._setStyle({
            backgroundImage: `url('${image}')`,
            backgroundSize: `${width}px ${height}px`,
            backgroundRepeat: 'no-repeat',
            position: 'absolute',
            boxShadow: '0 0 10px 0 rgba(0,0,0,0.5)',
        });
        style.innerText = `[data-${id}]>*{${css}}`;
        document.head.append(style);

        this.piecesNum = piecesNum;
    }

    init() {
        const cx = this.width / 2;
        const cy = this.height / 2;
        const minSize = 100;
        const maxSize = 200;

        for (let i = 0; i < this.piecesNum; i++) {
            const piece = (this.pieces[i] = document.createElement('div'));
            const style = piece.style;
            const zIndex = (style.zIndex = Math.floor(i / this.piecesNum / 0.2) + 1);

            const sizeRandom = Math.random();
            const size = sizeRandom * (maxSize - minSize) + minSize;
            style.width = style.height = size + 'px';

            const random = Math.random() * sizeRandom;
            const rad = Math.random() * Math.PI * 2;
            const x = cx + random * (cx - size / 2) * Math.cos(rad) - size / 2;
            const y = cy + random * (cy - size / 2) * Math.sin(rad) - size / 2;
            style.top = y + 'px';
            style.left = x + 'px';
            style.backgroundPosition = `${-x}px ${-y}px`;

            this.elem.append(piece);
        }
    }

    _setStyle(style) {
        let css = [];
        for (let key in style) {
            css.push(`${key.replace(/[A-Z]/g, match => '-' + match.toLowerCase())}:${style[key]};`);
        }
        return css.join('');
    }
}

const puzzle = new Puzzle(document.querySelector('.box'), 700, 700, './img/bg1.jpg');
puzzle.init();
