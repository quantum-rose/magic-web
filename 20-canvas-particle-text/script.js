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
    diameter = 0; // 粒子直径
    maxX = 0; // 粒子分布最大坐标
    maxY = 0; // 粒子分布最大坐标

    color = 0; // 粒子当前色值
    alpha = 1; // 粒子透明度
    x = 0; // 粒子当前坐标
    y = 0; // 粒子当前坐标

    path = []; // 粒子的运动路径队列
    random = true; // 是否是自由粒子（不参与组成文字）
    delay = 0; // 粒子动画启动延时
    duration = 1000; // 粒子动画持续时间
    fromColor = 0; // 粒子运动起始色值
    toColor = 0; // 粒子运动结束色值
    fromAlpha = 0; // 粒子运动起始透明度
    toAlpha = 0; // 粒子运动结束透明度
    fromX = 0; // 粒子运动起始坐标
    fromY = 0; // 粒子运动起始坐标
    toX = 0; // 粒子运动结束坐标
    toY = 0; // 粒子运动结束坐标
    startTime = 0;

    get randomX() {
        const { maxX, diameter } = this;
        return (Math.floor((maxX * Math.random()) / diameter) + 0.5) * diameter;
    }

    get randomY() {
        const { maxY, diameter } = this;
        return (Math.floor((maxY * Math.random()) / diameter) + 0.5) * diameter;
    }

    constructor({
        cvsCtx,
        radius,
        maxX,
        maxY,
        color = 0,
        alpha = 1,
        random = true,
        delay = 0,
        duration = 1000,
    }) {
        this.cvsCtx = cvsCtx;
        this.radius = radius;
        this.diameter = radius * 2;
        this.maxX = maxX;
        this.maxY = maxY;

        this.color = this.fromColor = this.toColor = color;
        this.alpha = this.fromAlpha = this.toAlpha = alpha;
        this.x = this.fromX = this.toX = this.randomX;
        this.y = this.fromY = this.toY = this.randomY;

        this.random = random;
        this.delay = delay;
        this.duration = duration;
    }

    update({ random, delay, color, alpha, x, y } = {}) {
        this.path.push({
            random: random === undefined ? this.random : random,
            delay: delay === undefined ? this.delay : delay,
            color: color === undefined ? this.color : color,
            alpha: alpha === undefined ? this.alpha : alpha,
            x: x === undefined ? this.randomX : x + this.radius,
            y: y === undefined ? this.randomY : y + this.radius,
        });
    }

    render() {
        const {
            startTime,
            delay,
            duration,
            fromColor,
            toColor,
            fromAlpha,
            toAlpha,
            fromX,
            toX,
            fromY,
            toY,
            cvsCtx,
            radius,
        } = this;
        const p = this._easeInOutQuad(
            Math.max(
                Math.min((Date.now() - startTime - delay) / duration, 1),
                0
            )
        );
        this.x = (toX - fromX) * p + fromX;
        this.y = (toY - fromY) * p + fromY;
        this.color = (toColor - fromColor) * p + fromColor;
        this.alpha = (toAlpha - fromAlpha) * p + fromAlpha;

        cvsCtx.beginPath();
        cvsCtx.fillStyle = `hsla(${this.color}, 100%, 50%, ${this.alpha})`;
        cvsCtx.arc(this.x, this.y, radius * 0.8, 0, Math.PI * 2, false);
        cvsCtx.fill();

        // 已运动到当前终点坐标
        if (p === 1) {
            if (this.path.length === 0) {
                if (this.random) {
                    this.update({
                        random: true,
                        delay: Math.random() * 1000,
                    });
                } else {
                    return;
                }
            }
            this.startTime = Date.now();
            const { random, delay, color, alpha, x, y } = this.path.shift();
            this.fromColor = this.color;
            this.fromAlpha = this.alpha;
            this.fromX = this.x;
            this.fromY = this.y;
            this.random = random;
            this.delay = delay;
            this.toColor = color;
            this.toAlpha = alpha;
            this.toX = x;
            this.toY = y;
        }
    }

    _easeInOutQuad(x) {
        return x < 0.5 ? 2 * x ** 2 : 1 - (2 - 2 * x) ** 2 / 2;
    }
}

/* 粒子文本 */
class ParticleText {
    particles = []; // 所有粒子
    text = ''; // 当前显示的文字
    cvs = null; // 粒子画布
    cvsCtx = null; // 粒子画布绘图上下文
    textCvs = null; // 文本画布
    textCvsCtx = null; // 文本画布绘图上下文
    textData = null; // 文本画布的imageData
    cvsRatio = 10; // 粒子画布与文本画布边长之比

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
        const color = Math.random() * 360;
        for (let i = 0; i < (width * height) / 10; i++) {
            this.particles[i] = new Particle({
                cvsCtx,
                radius: cvsRatio / 2,
                maxX,
                maxY,
                delay: Math.random() * 1000,
                color,
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

            // 组成文字的粒子
            const textParticle = [];
            for (let i = 0; i < textData.data.length; i += 4) {
                if (textData.data[i + 3] !== 0) {
                    textParticle.push({
                        index: i / 4,
                        alpha: textData.data[i + 3] / 255,
                    });
                }
            }

            const color = Math.random() * 360;
            for (let i = 0; i < particles.length; i++) {
                let option = {
                    random: true,
                    delay: Math.random() * 1000,
                    color,
                    alpha: 1,
                };
                if (i < textParticle.length) {
                    const { index, alpha } = textParticle[i];
                    option.random = false;
                    option.alpha = alpha;
                    option.x = (index % textData.width) * this.cvsRatio;
                    option.y = parseInt(index / textData.width) * this.cvsRatio;
                }
                particles[i].update(option);
            }

            // 一段时间后自动散开
            setTimeout(() => {
                const color = Math.random() * 360;
                for (let i = 0; i < particles.length; i++) {
                    particles[i].update({
                        random: true,
                        color,
                        alpha: 1,
                    });
                }
            }, 5000);
        }
    }

    _onEnterFrame() {
        const { particles, cvs, cvsCtx } = this;
        cvsCtx.clearRect(0, 0, cvs.width, cvs.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].render();
        }
        requestAnimationFrame(this._onEnterFrame.bind(this));
    }
}

const particleText = new ParticleText(
    cvs,
    // '88:88:88'
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
