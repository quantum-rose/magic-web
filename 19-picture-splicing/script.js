class Puzzle {
    pieces = []; // 所有碎片

    _images = [];
    get images() {
        return this._images;
    }
    set images(val) {
        this._images = val;
        this._imageIndex = 0;
        this._setAllPiecesStyle();
    }

    _imageIndex = 0;
    get imageIndex() {
        return this._imageIndex;
    }
    set imageIndex(val) {
        this._imageIndex = val;
        this._setAllPiecesStyle();
    }

    constructor(elem, width, height, images = [], piecesNum = 160, levels = 8) {
        this.elem = elem;
        this.id = parseInt(Math.random() * (0xffffffff - 0xfffffff) + 0xfffffff).toString(16);
        elem.dataset[this.id] = '';
        elem.style.position = 'relative';
        elem.style.top = '0';
        elem.style.left = '0';
        elem.style.opacity = '0';

        this.$style = document.createElement('style');
        document.head.append(this.$style);

        this.width = width;
        elem.style.width = width + 'px';
        this.height = height;
        elem.style.height = height + 'px';

        this.images = images;
        this._preload();

        this.piecesNum = piecesNum;
        this.levels = levels;

        this.cx = width / 2;
        this.cy = height / 2;

        const $keyframes = document.createElement('style');
        $keyframes.innerText = this._compressCss(`
            [data-${this.id}].in > * {
                animation: in-${this.id} 0.5s ease-out backwards;
            }
            [data-${this.id}].out > * {
                animation: out-${this.id} 0.5s ease-out forwards;
            }
            @keyframes in-${this.id} {
                from {
                    opacity: 0;
                    transform: translate3d(${-width}px, 0, 0) scale(0);
                }
            }
            @keyframes out-${this.id} {
                to {
                    opacity: 0;
                    transform: translate3d(${width}px, 0, 0) scale(0);
                }
            }
        `);
        document.head.append($keyframes);
    }

    init() {
        const { elem, pieces, piecesNum, images } = this;

        for (let i = 0; i < piecesNum; i++) {
            const piece = (pieces[i] = {
                translateX: 0,
                translateY: 0,
            });
            piece.elem = document.createElement('div');
            this._setPieceStyle(piece, i);
            elem.append(piece.elem);
        }

        let isClicked = false;
        let clickCount = 0;
        elem.addEventListener('click', () => {
            if (!isClicked) {
                isClicked = true;
                clickCount++;
                elem.classList.add('out');
            }
        });
        let animatedCount = 0;
        elem.addEventListener('animationend', () => {
            animatedCount++;
            if (animatedCount === piecesNum) {
                animatedCount = 0;
                if (elem.classList.contains('out')) {
                    this.imageIndex = clickCount % images.length;
                    this.reset();
                    requestAnimationFrame(() => {
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

    parallax(offsetX, offsetY) {
        const { levels, piecesNum } = this;
        this.pieces.forEach((piece, i) => {
            piece.translateX = offsetX * (piece.zIndex / levels + i / piecesNum); // 层级越高、索引越大，偏移量越大
            piece.translateY = offsetY * (piece.zIndex / levels + i / piecesNum);
            piece.elem.style.transform = `translate3d(${piece.translateX}px,${piece.translateY}px,0)`;
        });
    }

    reset() {
        this.pieces.forEach(this._setPieceStyle.bind(this));
    }

    _setAllPiecesStyle() {
        this.$style.innerText = this._compressCss(`
            [data-${this.id}] > * {
                background-image: url(${this.images[this.imageIndex]});
                background-size: ${this.width}px ${this.height}px;
                background-repeat: no-repeat;
                position: absolute;
                box-shadow: 0 0 20px 6px rgba(0, 0, 0, 0.4);
            }
        `);
    }

    _setPieceStyle(piece, i) {
        const { cx, cy, levels, piecesNum } = this;

        const style = piece.elem.style;

        const zIndex = (piece.zIndex = style.zIndex = Math.floor((i / piecesNum) ** (1 / 3) * levels + 1)); // 非均匀分布，层级越高，碎片数量越多

        const sizeRandom = Math.random();
        const width = (piece.width = cx * ((sizeRandom + levels - zIndex) / levels)); // 层级越高，尺寸越小
        const height = (piece.height = cy * ((sizeRandom + levels - zIndex) / levels));
        style.width = width + 'px';
        style.height = height + 'px';

        const radiusRandom = Math.random();
        const rad = Math.random() * Math.PI * 2; // 随机的角度，碎片将分布在容器的内切椭圆中
        const left = (piece.left = cx + cx * ((radiusRandom + zIndex - 1) / levels) * Math.cos(rad) - width / 2); // 层级越高，距离中心越远
        const top = (piece.top = cy + cy * ((radiusRandom + zIndex - 1) / levels) * Math.sin(rad) - height / 2);
        style.left = left + 'px';
        style.top = top + 'px';
        style.backgroundPosition = `${-left}px ${-top}px`;
        style.animationDelay = (Math.random() + i / piecesNum) * 0.5 + 's';
    }

    _compressCss(css) {
        return css
            .replace(/\s{2,}/, ' ')
            .replace(/\s*[{};,>~=-]\s*|[(\[:]\s*|\s*[)\]]/g, match => match.trim())
            .trim();
    }

    _preload() {
        let loadedCount = 0;
        const onLoad = function () {
            loadedCount++;
            if (loadedCount === this.images.length) {
                this.elem.style.transition = 'opacity 0.2s linear';
                this.elem.style.opacity = '1';
            }
        };
        this.images.forEach(image => {
            const img = document.createElement('img');
            img.src = image;
            img.addEventListener('load', onLoad.bind(this));
        });
    }
}

const size = Math.min(window.innerWidth, window.innerHeight);
const puzzle = new Puzzle(document.querySelector('.box'), size, size, [
    './img/bg1.jpg',
    './img/bg2.jpg',
    './img/bg3.jpg',
]);
puzzle.init();

window.addEventListener('mousemove', function (e) {
    puzzle.parallax((window.innerWidth / 2 - e.clientX) / 10, (window.innerHeight / 2 - e.clientY) / 10);
});
