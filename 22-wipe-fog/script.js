const getQueryString = function (key) {
    const result = window.location.search.substring(1).match(new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i'));
    return result !== null ? decodeURI(result[2]) : null;
};
const initialSlide = getQueryString('index');
const mySwiper = new Swiper('.swiper-container', {
    initialSlide: isNaN(initialSlide) ? 0 : initialSlide,
    direction: 'vertical', // 垂直切换选项
    mousewheel: true,
    pagination: {
        el: '.swiper-pagination',
    },
    resistance: true,
    resistanceRatio: 0,
    noSwiping: true,
});

(function () {
    const cvs = document.querySelector('#cvs-1');
    const width = (cvs.width = cvs.offsetWidth * window.devicePixelRatio);
    const height = (cvs.height = cvs.offsetHeight * window.devicePixelRatio);
    cvs.style.width = width + 'px';
    cvs.style.height = height + 'px';

    // 脚印
    class Footpring {
        cvsCtx = null;
        duration = 5000;
        startTime = 0;
        startX = 0;
        startY = 0;
        endX = 0;
        endY = 0;
        p = 0;

        get destroyed() {
            return this.p === 1;
        }

        constructor({ cvsCtx, startX, startY, endX, endY }) {
            this.cvsCtx = cvsCtx;
            this.startX = startX;
            this.startY = startY;
            this.endX = endX;
            this.endY = endY;
            this.startTime = Date.now();
        }

        rander() {
            const { cvsCtx, duration, startTime, startX, startY, endX, endY } = this;
            this.p = this._easeInQuad(Math.max(Math.min((Date.now() - startTime) / duration, 1), 0));
            cvsCtx.beginPath();
            cvsCtx.strokeStyle = '#000000';
            cvsCtx.lineWidth = 100 * (1 - this.p) + 1;
            cvsCtx.lineCap = 'round';
            cvsCtx.moveTo(startX, startY);
            cvsCtx.lineTo(endX, endY);
            cvsCtx.stroke();
            cvsCtx.closePath();
        }

        _easeInQuad(x) {
            return x * x;
        }
    }

    // 窗户
    class FogWindow {
        cvs = null;
        cvsCtx = null;
        lastPoint = { x: 0, y: 0 };
        path = [];

        constructor(cvs) {
            this.cvs = cvs;
            this.cvsCtx = cvs.getContext('2d');

            cvs.addEventListener('mousedown', e => {
                const { offsetX: x, offsetY: y } = e;
                this.lastPoint.x = x;
                this.lastPoint.y = y;
                cvs.addEventListener('mousemove', this.wipe);
            });

            cvs.addEventListener('mouseup', e => {
                cvs.removeEventListener('mousemove', this.wipe);
            });

            this._onEnterFrame();
        }

        wipe = e => {
            const {
                cvsCtx,
                lastPoint: { x: startX, y: startY },
            } = this;
            const { offsetX: endX, offsetY: endY } = e;
            this.lastPoint.x = endX;
            this.lastPoint.y = endY;
            this.path.push(
                new Footpring({
                    cvsCtx,
                    startX,
                    startY,
                    endX,
                    endY,
                })
            );
        };

        _onEnterFrame = () => {
            const { cvsCtx } = this;
            cvsCtx.clearRect(0, 0, width, height);
            cvsCtx.fillStyle = 'rgba(255,255,255,0.9)';
            cvsCtx.fillRect(0, 0, width, height);
            cvsCtx.fillStyle = '#000000';
            cvsCtx.textAlign = 'center';
            cvsCtx.textBaseline = 'middle';
            cvsCtx.font = '700 400px Helvetica';
            cvsCtx.fillText('winter', width / 2, 200);
            this.path = this.path.filter(item => {
                if (!item.destroyed) {
                    item.rander();
                }
                return !item.destroyed;
            });
            requestAnimationFrame(this._onEnterFrame);
        };
    }

    new FogWindow(cvs);
})();
