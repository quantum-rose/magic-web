(function () {
    const getQueryString = function (key) {
        const result = window.location.search.substring(1).match(new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i'));
        return result !== null ? decodeURI(result[2]) : null;
    };
    const initialSlide = getQueryString('index');
    new Swiper('.swiper-container', {
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
})();

/* page-1 */
const cvs_1 = document.querySelector('#cvs-1');
cvs_1.width = cvs_1.offsetWidth * window.devicePixelRatio;
cvs_1.height = cvs_1.offsetHeight * window.devicePixelRatio;
const cvs_2 = document.querySelector('#cvs-2');
cvs_2.width = cvs_2.offsetWidth * window.devicePixelRatio;
cvs_2.height = cvs_2.offsetHeight * window.devicePixelRatio;

// 雪花
class Snowflake {
    cvsCtx = null;
    radius = 0;
    duration = 5000;
    startTime = 0;
    startX = 0;
    startY = 0;
    endX = 0;
    endY = 0;

    get destroyed() {
        return this.p === 1;
    }

    constructor({ cvsCtx, radius, duration, startX, startY, endX, endY }) {
        this.cvsCtx = cvsCtx;
        this.radius = radius;
        this.duration = duration;
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.startTime = Date.now();
    }

    render() {
        const { cvsCtx, radius, duration, startTime, startX, startY, endX, endY } = this;
        const p = (this.p = Math.max(Math.min((Date.now() - startTime) / duration, 1), 0));
        const x = startX + (endX - startX) * p;
        const y = startY + (endY - startY) * p;
        const f = cvsCtx.createRadialGradient(x, y, 0, x, y, radius);
        f.addColorStop(0, 'rgba(255,255,255,1)');
        f.addColorStop(0.25, 'rgba(255,255,255,1)');
        f.addColorStop(1, 'rgba(255,255,255,0)');
        cvsCtx.beginPath();
        cvsCtx.arc(x, y, radius, 0, Math.PI * 2, false);
        cvsCtx.fillStyle = f;
        cvsCtx.fill();
        cvsCtx.closePath();
    }
}

// 下雪
class Snowing {
    cvs = null;
    cvsCtx = null;
    width = 0;
    height = 0;
    snowflake = [];

    constructor(cvs) {
        this.cvs = cvs;
        this.cvsCtx = cvs.getContext('2d');
        this.width = cvs.width;
        this.height = cvs.height;
        this._onEnterFrame();
    }

    _onEnterFrame = () => {
        const { cvsCtx, width, height } = this;
        cvsCtx.clearRect(0, 0, width, height);
        this._addSnowflake();
        this.snowflake = this.snowflake.filter(item => (!item.destroyed && item.render(), !item.destroyed));
        requestAnimationFrame(this._onEnterFrame);
    };

    _addSnowflake() {
        const { cvsCtx, width, height } = this;
        const radius = 5 + Math.random() * 10;
        const duration = 2000 + Math.random() * 2000;
        const startX = Math.random() * width;
        const endX = startX;
        const startY = -2 * radius;
        const endY = height + 2 * radius;
        this.snowflake.push(
            new Snowflake({
                cvsCtx,
                radius,
                duration,
                startX,
                startY,
                endX,
                endY,
            })
        );
    }
}

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

    render() {
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
    width = 0;
    height = 0;
    lastPoint = { x: 0, y: 0 };
    path = [];
    snow = [];

    constructor(cvs) {
        this.cvs = cvs;
        this.cvsCtx = cvs.getContext('2d');
        this.width = cvs.width;
        this.height = cvs.height;

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
        const { cvsCtx, width, height } = this;
        cvsCtx.clearRect(0, 0, width, height);
        cvsCtx.fillStyle = 'rgba(255,255,255,0.9)';
        cvsCtx.fillRect(0, 0, width, height);
        cvsCtx.fillStyle = '#000000';
        cvsCtx.textAlign = 'center';
        cvsCtx.textBaseline = 'middle';
        cvsCtx.font = '700 400px Helvetica';
        cvsCtx.fillText('winter', width / 2, 200);
        this.path = this.path.filter(item => (!item.destroyed && item.render(), !item.destroyed));
        requestAnimationFrame(this._onEnterFrame);
    };
}

new Snowing(cvs_1);
new FogWindow(cvs_2);

/* page-2 */
const cvs_3 = document.querySelector('#cvs-3');
cvs_3.width = cvs_3.offsetWidth * window.devicePixelRatio;
cvs_3.height = cvs_3.offsetHeight * window.devicePixelRatio;

// 刮刮卡
class ScratchCard {
    cvs = null;
    cvsCtx = null;
    width = 0;
    height = 0;
    lastPoint = { x: 0, y: 0 };
    path = [];
    $img = null;

    constructor(cvs, img) {
        this.cvs = cvs;
        this.cvsCtx = cvs.getContext('2d');
        this.width = cvs.width;
        this.height = cvs.height;
        this.$img = document.createElement('img');
        this.$img.src = img;
        this.$img.addEventListener('load', this._onLoad);
    }

    _onLoad = () => {
        const {
            cvs,
            $img,
            width,
            height,
            $img: { naturalWidth: w, naturalHeight: h },
        } = this;
        const offCvs = (this.offCvs = document.createElement('canvas'));
        offCvs.width = width;
        offCvs.height = height;
        const offCvsCtx = offCvs.getContext('2d');
        let sWidth, sHeight, sx, sy;
        if (w / h > width / height) {
            sWidth = h * (width / height);
            sHeight = h;
            sx = (w - sWidth) / 2;
            sy = 0;
        } else {
            sWidth = w;
            sHeight = w * (height / width);
            sx = 0;
            sy = h - sHeight;
        }
        offCvsCtx.drawImage($img, sx, sy, sWidth, sHeight, 0, 0, width, height);

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
    };

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
        const { cvsCtx, width, height, offCvs } = this;
        cvsCtx.clearRect(0, 0, width, height);
        cvsCtx.fillStyle = '#000000';
        cvsCtx.textAlign = 'center';
        cvsCtx.textBaseline = 'middle';
        cvsCtx.font = '700 400px Helvetica';
        cvsCtx.fillText('coming', width / 2, 200);
        this.path = this.path.filter(item => (!item.destroyed && item.render(), !item.destroyed));
        cvsCtx.save();
        cvsCtx.globalCompositeOperation = 'source-in';
        cvsCtx.drawImage(offCvs, 0, 0, width, height);
        cvsCtx.restore();
        requestAnimationFrame(this._onEnterFrame);
    };
}

new ScratchCard(cvs_3, './bg-2.jpg');
