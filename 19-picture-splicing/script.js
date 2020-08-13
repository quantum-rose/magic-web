class Puzzle {
    pieces = []; // 所有碎片

    _images = [];
    get images() {
        return this._images;
    }
    set images(val) {
        this._images = val;
        this._imageIndex = 0;
        this._changeBackgroundImage();
    }

    _imageIndex = 0;
    get imageIndex() {
        return this._imageIndex;
    }
    set imageIndex(val) {
        this._imageIndex = val;
        this._changeBackgroundImage();
    }

    constructor(elem, width, height, images = [], piecesNum = 160, levels = 8) {
        this.elem = elem;
        const id = (this.id = parseInt(Math.random() * (0xffffffff - 0xfffffff) + 0xfffffff).toString(16));
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

        const $style = document.createElement('style');
        $style.innerText = this._compressCss(`
            [data-${id}] > * {
                background-size: ${width}px ${height}px;
                background-repeat: no-repeat;
                position: absolute;
                box-shadow: 0 0 20px 6px rgba(0, 0, 0, 0.4);
            }
            [data-${id}].in > * {
                animation: in-${id} 0.3s ease-out backwards;
            }
            [data-${id}].out > * {
                animation: out-${id} 0.3s ease-out forwards;
            }
            @keyframes in-${id} {
                from {
                    opacity: 0;
                    transform: translate3d(${-width}px, 0, 0) scale(1, 0);
                }
            }
            @keyframes out-${id} {
                to {
                    opacity: 0;
                    transform: translate3d(${width}px, 0, 0) scale(1, 0);
                }
            }
        `);
        document.head.append($style);
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
        elem.addEventListener('click', () => {
            if (!isClicked) {
                isClicked = true;
                elem.classList.add('out');
            }
        });
        let animatedCount = 0;
        elem.addEventListener('animationend', () => {
            animatedCount++;
            if (animatedCount === piecesNum) {
                animatedCount = 0;
                if (elem.classList.contains('out')) {
                    this.imageIndex = (this.imageIndex + 1) % images.length;
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

    parallax(offsetXRatio, offsetYRatio) {
        const { maxOffsetX, maxOffsetY, levels, piecesNum } = this;
        this.pieces.forEach((piece, i) => {
            piece.translateX = offsetXRatio * maxOffsetX * (piece.zIndex / levels + i / piecesNum); // 层级越高、索引越大，偏移量越大
            piece.translateY = offsetYRatio * maxOffsetY * (piece.zIndex / levels + i / piecesNum);
            piece.elem.style.transform = `translate3d(${piece.translateX}px,${piece.translateY}px,0)`;
        });
    }

    reset() {
        this.pieces.forEach(this._setPieceStyle.bind(this));
    }

    _changeBackgroundImage() {
        this.$backgroundImage.innerText = this._compressCss(`
            [data-${this.id}] > * {
                background-image: url(${this.images[this.imageIndex]});
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
        const left = (piece.left = cx * ((radiusRandom + zIndex - 1) / levels) * Math.cos(rad) - width / 2); // 层级越高，距离中心越远
        const top = (piece.top = cy * ((radiusRandom + zIndex - 1) / levels) * Math.sin(rad) - height / 2);
        style.left = left + 'px';
        style.top = top + 'px';
        style.backgroundPosition = `${-left - cx}px ${-top - cy}px`;
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
                this.elem.addEventListener('transitionend', function ontransitionend() {
                    this.style.transition = '';
                    this.style.opacity = '';
                    this.removeEventListener('transitionend', ontransitionend);
                });
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
puzzle.imageIndex = Date.now() % 3;
puzzle.init();

window.addEventListener('mousemove', function (e) {
    puzzle.parallax(1 - (2 * e.clientX) / window.innerWidth, 1 - (2 * e.clientY) / window.innerHeight);
});
