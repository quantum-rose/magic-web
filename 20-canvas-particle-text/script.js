const cvs = document.querySelector('#cvs');
cvs.width = cvs.offsetWidth * window.devicePixelRatio;
cvs.height = cvs.offsetHeight * window.devicePixelRatio;
window.addEventListener('resize', function () {
    cvs.width = cvs.offsetWidth * window.devicePixelRatio;
    cvs.height = cvs.offsetHeight * window.devicePixelRatio;
});

/* 粒子 */
class Particle {
    cvsCtx = null; // canvas 绘图上下文
    radius = 0; // 粒子半径
    maxX = 0; // 粒子分布最大坐标
    maxY = 0; // 粒子分布最大坐标

    x = 0; // 粒子当前坐标
    y = 0; // 粒子当前坐标
    color = 'rgba(0, 0, 0, 0)'; // 粒子颜色

    path = []; // 粒子的运动路径队列
    random = true; // 是否是自由粒子（不参与组成文字）
    delay = 0; // 粒子动画启动延时
    duration = 3000; // 粒子动画持续时间
    fromX = 0; // 粒子运动起始坐标
    fromY = 0; // 粒子运动起始坐标
    toX = 0; // 粒子运动结束坐标
    toY = 0; // 粒子运动结束坐标
    startTime = 0;

    constructor({
        cvsCtx,
        radius,
        maxX,
        maxY,
        random = true,
        delay = 0,
        duration = 1000,
    }) {
        this.cvsCtx = cvsCtx;
        this.radius = radius;
        this.diameter = radius * 2;
        this.maxX = maxX;
        this.maxY = maxY;

        this.x = this.fromX = this.toX = this._randomX();
        this.y = this.fromY = this.toY = this._randomY();
        this.color = `hsl(180, 100%, ${Math.random() * 50 + 25}%)`;

        this.random = random;
        this.delay = delay;
        this.duration = duration;
    }

    reset({ random, delay, toX, toY }) {
        this.path.push({
            random: random === undefined ? this.random : random,
            delay: delay === undefined ? this.delay : delay,
            x: toX === undefined ? this._randomX() : toX + this.radius,
            y: toY === undefined ? this._randomY() : toY + this.radius,
        });
    }

    render() {
        const {
            startTime,
            delay,
            duration,
            fromX,
            toX,
            fromY,
            toY,
            cvsCtx,
            color,
            radius,
            random,
        } = this;
        const p = Math.max(
            0,
            Math.min(1, (Date.now() - startTime - delay) / duration)
        );
        this.x = (toX - fromX) * this._easeInOutQuad(p) + fromX;
        this.y = (toY - fromY) * this._easeInOutQuad(p) + fromY;
        cvsCtx.beginPath();
        cvsCtx.fillStyle = color;
        cvsCtx.arc(this.x, this.y, radius * 0.8, 0, Math.PI * 2, false);
        cvsCtx.fill();

        // 已运动到当前终点坐标
        if (this.x === this.toX && this.y === this.toY) {
            if (this.path.length === 0) {
                if (random) {
                    this.reset({
                        random: true,
                        delay: Math.random() * 1000,
                    });
                } else {
                    return;
                }
            }
            this.startTime = Date.now();
            const end = this.path.shift();
            this.fromX = this.x;
            this.fromY = this.y;
            this.random = end.random;
            this.delay = end.delay;
            this.toX = end.x;
            this.toY = end.y;
        }
    }

    _randomX() {
        const { maxX, diameter } = this;
        return (Math.floor((maxX * Math.random()) / diameter) + 0.5) * diameter;
    }

    _randomY() {
        const { maxY, diameter } = this;
        return (Math.floor((maxY * Math.random()) / diameter) + 0.5) * diameter;
    }

    _easeInOutQuad(x) {
        return x < 0.5 ? 2 * x ** 2 : 1 - (2 - 2 * x) ** 2 / 2;
    }
}

/* 粒子文本 */
class ParticleText {
    particles = [];
    text = '';
    cvs = null;
    cvsCtx = null;
    textCvs = null; // 文本画布
    textData = null; // 文本画布的imageData
    cvsRatio = 10;

    constructor(cvs, text = '23:59:59') {
        this.cvs = cvs;
        this.cvsCtx = cvs.getContext('2d');

        this.textCvs = document.createElement('canvas');
        this.textCvs.width = cvs.width / this.cvsRatio;
        this.textCvs.height = cvs.height / this.cvsRatio;
        this.textCvsCtx = this.textCvs.getContext('2d');

        this._initParticles();
        this.updateText(text);
        this._onEnterFrame();
    }

    _initParticles() {
        const {
            textCvs: { width, height },
            cvs: { width: maxX, height: maxY },
            cvsCtx,
            cvsRatio,
        } = this;
        for (let i = 0; i < (width * height) / 10; i++) {
            const delay = Math.random() * 1000;
            this.particles[i] = new Particle({
                cvsCtx,
                radius: cvsRatio / 2,
                maxX,
                maxY,
                delay,
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
            cvsCtx.font = `700 ${width / 6}px Helvetica`;
            cvsCtx.textAlign = 'center';
            cvsCtx.textBaseline = 'middle';
            cvsCtx.fillText(text, width / 2, height / 2);

            const textData = (this.textData = cvsCtx.getImageData(
                0,
                0,
                width,
                height
            ));

            const textParticle = [];
            for (let i = 0; i < textData.data.length; i += 4) {
                if (textData.data[i + 3] !== 0) {
                    textParticle.push(i);
                }
            }

            for (let i = 0; i < particles.length; i++) {
                let opt = { delay: Math.random() * 1000 };
                if (i < textParticle.length) {
                    const index = textParticle[i];
                    opt.random = false;
                    opt.toX = ((index / 4) % textData.width) * this.cvsRatio;
                    opt.toY =
                        Math.floor(index / 4 / textData.width) * this.cvsRatio;
                } else {
                    opt.random = true;
                }
                particles[i].reset(opt);
            }

            setTimeout(() => {
                for (let i = 0; i < particles.length; i++) {
                    particles[i].reset({
                        random: true,
                    });
                }
            }, 5000);
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

const particleText = new ParticleText(
    cvs,
    new Date().toTimeString().match(/^.*(?=GMT)/g)[0]
);

let lastTime = Date.now();
requestAnimationFrame(function draw() {
    if (Date.now() - lastTime > 7000) {
        lastTime = Date.now();
        particleText.updateText(
            new Date().toTimeString().match(/^.*(?=GMT)/g)[0]
        );
    }
    requestAnimationFrame(draw);
});
