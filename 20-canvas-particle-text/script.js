const cvs = document.querySelector('#cvs');
cvs.width = cvs.offsetWidth * window.devicePixelRatio;
cvs.height = cvs.offsetHeight * window.devicePixelRatio;
window.addEventListener('resize', function () {
    cvs.width = cvs.offsetWidth * window.devicePixelRatio;
    cvs.height = cvs.offsetHeight * window.devicePixelRatio;
});

/* 粒子 */
class Particle {
    radius = 10;
    fromX = 0;
    fromY = 0;
    toX = 0;
    toY = 0;
    delay = 0;
    duration = 1000;
    startTime = 0;
    random = true;

    constructor({ cvsCtx, maxX, maxY, delay = 0, random = true }) {
        this.cvsCtx = cvsCtx;
        this.maxX = maxX;
        this.maxY = maxY;
        this.delay = delay;
        this.random = random;
        this.x = (Math.floor(maxX * Math.random()) + 0.5) * this.radius;
        this.y = (Math.floor(maxY * Math.random()) + 0.5) * this.radius;
        this.color = `hsl(180, 100%, ${Math.random() * 50 + 25}%)`;
    }

    reset({ random = true, delay, toX, toY } = {}) {
        this.startTime = Date.now();
        this.random = random || false;
        this.fromX = this.x;
        this.fromY = this.y;
        this.toX = toX || (Math.floor(this.maxX * Math.random()) + 0.5) * this.radius;
        this.toY = toY || (Math.floor(this.maxY * Math.random()) + 0.5) * this.radius;
        this.delay = delay || this.delay;
    }

    render() {
        const { startTime, delay, duration, fromX, toX, fromY, toY, cvsCtx, color, radius, random } = this;
        const p = Math.max(0, Math.min(1, (Date.now() - startTime - delay) / duration));
        this.x = (toX - fromX) * this._easeInOutQuad(p) + fromX;
        this.y = (toY - fromY) * this._easeInOutQuad(p) + fromY;
        cvsCtx.beginPath();
        cvsCtx.fillStyle = color;
        cvsCtx.arc(this.x, this.y, radius * 0.4, 0, Math.PI * 2, false);
        cvsCtx.fill();

        if (random && p >= 1) {
            this.reset();
        }
    }

    _easeInOutQuad(x) {
        return x < 0.5 ? 2 * x ** 2 : 1 - (2 - 2 * x) ** 2 / 2;
    }
}

/* 粒子文本 */
class ParticleText {
    particles = [];
    text = '';
    textCvs = null; // 文本画布
    textData = null; // 文本画布的imageData

    constructor(cvs, text = '23:59:59') {
        this.cvs = cvs;
        this.cvsCtx = cvs.getContext('2d');

        this.textCvs = document.createElement('canvas');
        this.textCvs.width = cvs.width / 10;
        this.textCvs.height = cvs.height / 10;
        this.textCvsCtx = this.textCvs.getContext('2d');

        this._initParticles();
        this.updateText(text);
        this._onEnterFrame();
    }

    _initParticles() {
        const { width, height } = this.textCvs;
        for (let i = 0; i < (width * height) / 10; i++) {
            this.particles[i] = new Particle({
                cvsCtx: this.cvsCtx,
                maxX: width,
                maxY: height,
                delay: Math.random() * 1000,
            });
        }
    }

    /**
     * 更新要显示的文字
     * @param {String} text 显示的文字
     */
    updateText(text) {
        if (text !== this.text) {
            this.text = text;

            const { particles, textCvsCtx: cvsCtx } = this;
            const { width, height } = this.textCvs;

            cvsCtx.clearRect(0, 0, width, height);
            cvsCtx.fillStyle = '#000000';
            cvsCtx.font = `bold ${width / 5}px Helvetica`;
            cvsCtx.textAlign = 'center';
            cvsCtx.textBaseline = 'middle';
            cvsCtx.fillText(text, width / 2, height / 2);

            const textData = (this.textData = cvsCtx.getImageData(0, 0, width, height));

            for (let i = 0, j = 0; j < particles.length; i += 4) {
                if (i < textData.data.length && textData.data[i + 3] <= 127) {
                    continue;
                }
                if (i < textData.data.length) {
                    particles[j].reset({
                        random: false,
                        toX: ((i / 4) % textData.width) * 10 + 5,
                        toY: Math.floor(i / 4 / textData.width) * 10 + 5,
                    });
                } else {
                    particles[j].reset();
                }
                j++;
            }
        }
    }

    _onEnterFrame() {
        const { particles, cvs, cvsCtx } = this;
        cvsCtx.clearRect(0, 0, cvs.width, cvs.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].render(this.p);
        }
        requestAnimationFrame(this._onEnterFrame.bind(this));
    }
}

const particleText = new ParticleText(cvs, new Date().toTimeString().match(/^.*(?=GMT)/g)[0]);
let lastTime = Date.now();
let flag = false;
requestAnimationFrame(function draw() {
    if (Date.now() - lastTime > 4000) {
        lastTime = Date.now();
        // if (flag) {
        //     flag = false;
        //     particleText.updateText(new Date().toTimeString().match(/^.*(?=GMT)/g)[0]);
        // } else {
        flag = true;
        particleText.updateText('');
        // }
    }
    requestAnimationFrame(draw);
});
