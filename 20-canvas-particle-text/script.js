const cvs = document.querySelector('#cvs');
cvs.width = cvs.offsetWidth * window.devicePixelRatio;
cvs.height = cvs.offsetHeight * window.devicePixelRatio;

/* 粒子 */
class Particle {
    cvsCtx = null; // canvas 绘图上下文
    radius = 0; // 粒子半径
    diameter = 0; // 粒子直径
    minX = 0; // 粒子分布最小坐标
    minY = 0; // 粒子分布最小坐标
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
        const { minX, maxX, diameter } = this;
        return (Math.floor((Math.random() * (maxX - minX) + minX) / diameter) + 0.5) * diameter;
    }

    get randomY() {
        const { minY, maxY, diameter } = this;
        return (Math.floor((Math.random() * (maxY - minY) + minY) / diameter) + 0.5) * diameter;
    }

    constructor({
        cvsCtx,
        radius,
        minX,
        minY,
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
        this.minX = minX;
        this.minY = minY;
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

    update({ random, delay, duration, color, alpha, x, y } = {}) {
        this.path.push({
            random: random === undefined ? this.random : random,
            delay: delay === undefined ? this.delay : delay,
            duration: duration === undefined ? this.duration : duration,
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
        const p = this._easeInOutQuad(Math.max(Math.min((Date.now() - startTime - delay) / duration, 1), 0));
        this.color = (toColor - fromColor) * p + fromColor;
        this.alpha = (toAlpha - fromAlpha) * p + fromAlpha;
        this.x = (toX - fromX) * p + fromX;
        this.y = (toY - fromY) * p + fromY;

        cvsCtx.beginPath();
        cvsCtx.fillStyle = `hsla(${this.color}, 100%, 50%, ${this.alpha})`;
        cvsCtx.arc(this.x, this.y, radius * 0.8, 0, Math.PI * 2, false);
        cvsCtx.fill();

        // 已运动到当前终点坐标
        if (p === 1) {
            if (this.path.length === 0) {
                if (this.random) {
                    this.update({ random: true });
                } else {
                    return;
                }
            }
            this.startTime = Date.now();
            const { random, delay, duration, color, alpha, x, y } = this.path.shift();
            this.fromColor = this.color;
            this.fromAlpha = this.alpha;
            this.fromX = this.x;
            this.fromY = this.y;
            this.random = random;
            this.delay = delay;
            this.duration = duration;
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
    text = []; // 文字轮播队列
    cvs = null; // 粒子画布
    cvsCtx = null; // 粒子画布绘图上下文
    textCvs = null; // 文本画布
    textCvsCtx = null; // 文本画布绘图上下文
    textData = null; // 文本画布的imageData
    cvsRatio = 10; // 粒子画布与文本画布边长之比
    _spreadTimer = null; // 粒子自动扩散延时器

    get randomText() {
        return new Date().toTimeString().match(/^.*(?=\sGMT)/g)[0];
    }

    get randomColor() {
        return Math.random() * 360;
    }

    get randomDelay() {
        return Math.random() * 1000;
    }

    get randomDuration() {
        return 1000 + Math.random() * 1000;
    }

    get randomAlpha() {
        return Math.random() > 0.9 ? 0.5 : 0;
    }

    constructor(cvs, text = '') {
        this.cvs = cvs;
        this.text.push(text || this.randomText);
        this.cvsCtx = cvs.getContext('2d');

        this.textCvs = document.createElement('canvas');
        this.textCvs.width = cvs.width / this.cvsRatio;
        this.textCvs.height = cvs.height / this.cvsRatio;
        this.textCvsCtx = this.textCvs.getContext('2d');

        this._initParticles();
        this._update();
        this._onEnterFrame();
    }

    _initParticles() {
        const {
            textCvs: { width, height },
            cvs: { width: maxX, height: maxY },
            cvsCtx,
            cvsRatio,
        } = this;
        const color = this.randomColor;
        for (let i = 0; i < (width * height) / 10; i++) {
            this.particles[i] = new Particle({
                cvsCtx,
                radius: cvsRatio / 2,
                minX: 0,
                minY: 0,
                maxX,
                maxY,
                delay: this.randomDelay,
                duration: this.randomDuration,
                color,
                alpha: this.randomAlpha,
            });
        }
    }

    updateText(text) {
        text.split(' ').forEach(item => {
            if (/[a-zA-Z]/.test(item)) {
                this.text.push(item);
            } else {
                this.text.push(...item.split(''));
            }
        });
    }

    _update() {
        const { particles, textCvsCtx: cvsCtx, cvsRatio } = this;
        const { width, height } = this.textCvs;

        cvsCtx.clearRect(0, 0, width, height);
        cvsCtx.fillStyle = '#000000';
        cvsCtx.font = `700 ${width / 6.4}px Helvetica`;
        cvsCtx.textAlign = 'center';
        cvsCtx.textBaseline = 'middle';
        cvsCtx.fillText(this.text.shift(), width / 2, height / 2);

        const textData = (this.textData = cvsCtx.getImageData(0, 0, width, height));

        // 组成文字的粒子
        const textParticle = [];
        for (let i = 0; i < textData.data.length; i += 4) {
            if (textData.data[i + 3] !== 0) {
                textParticle.push({ index: i / 4, alpha: textData.data[i + 3] / 255 });
            }
        }

        // 设置粒子运动目标
        const color = this.randomColor;
        for (let i = 0; i < particles.length; i++) {
            let option = {
                random: true,
                delay: this.randomDelay,
                duration: this.randomDuration,
                color,
                alpha: this.randomAlpha,
            };
            if (i < textParticle.length) {
                const { index, alpha } = textParticle[i];
                option.random = false;
                option.alpha = alpha;
                option.x = (index % textData.width) * cvsRatio;
                option.y = parseInt(index / textData.width) * cvsRatio;
            }
            particles[i].update(option);
        }

        // 一段时间后自动散开
        this._spreadTimer = setTimeout(() => {
            const color = this.randomColor;
            for (let i = 0; i < particles.length; i++) {
                particles[i].update({
                    random: true,
                    delay: this.randomDelay,
                    duration: this.randomDuration,
                    color,
                    alpha: this.randomAlpha,
                });
            }

            setTimeout(() => {
                this._spreadTimer = null;
                if (this.text.length === 0) {
                    this.text.push(this.randomText);
                }
                this._update();
            }, 3000);
        }, 6000);
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

const particleText = new ParticleText(cvs);

(function () {
    const inputContainer = document.querySelector('.input-container');
    const inputContent = inputContainer.querySelector('.input-content');
    const inputMask = inputContent.querySelector('.mask');
    const input = inputContent.querySelector('input');

    let inputContainerVisible = false;
    let inputContentVisible = false;

    window.addEventListener('keyup', function (e) {
        if (e.code === 'Enter' && !inputContainerVisible) {
            inputContainerVisible = true;
            inputContainer.style.display = 'block';
            inputContentVisible = true;
            inputContent.classList.add('show');
            input.focus();
        }
    });

    input.addEventListener('keyup', function (e) {
        if (e.code === 'Enter') {
            inputContentVisible = false;
            inputContent.classList.replace('show', 'hide');
            input.blur();
        }
    });

    input.addEventListener('blur', function (e) {
        if (input.value.trim()) {
            particleText.updateText(input.value.trim());
        }
    });

    inputMask.addEventListener('animationend', function (e) {
        if (!inputContentVisible) {
            inputContainerVisible = false;
            inputContainer.style.display = 'none';
            inputContent.classList.remove('hide');
            input.value = '';
        }
    });
})();
