const $cvs = document.querySelector('#cvs');

/* 粒子 */
class Particle {
    cvsCtx = null;
    r = Math.random() + 0.75;
    x = 0; // 横坐标
    y = 0; // 纵坐标
    vx = 0; // 水平速度
    vy = 0; // 垂直速度
    ax = 0; // 水平加速度
    ay = 0; // 垂直加速度
    color = '';
    lifetime = 1;
    duration = 0;
    alpha = 1;

    constructor({ cvsCtx, x, y, vx, vy, ax, ay, color, lifetime = 1 }) {
        this.cvsCtx = cvsCtx;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.ax = ax;
        this.ay = ay;
        this.color = color.join(',');
        this.lifetime = lifetime;
    }

    render(t) {
        const { cvsCtx, r, vx, vy, ax, ay, color, lifetime } = this;
        this.duration += t;
        this.alpha = (1 - Math.min(this.duration / lifetime, 1)) ** 0.5;
        this.vx += ax * t;
        this.vy += ay * t;
        this.x += vx * t;
        this.y += vy * t;
        cvsCtx.beginPath();
        cvsCtx.fillStyle = `rgba(${color},${this.alpha})`;
        cvsCtx.arc(this.x, this.y, r, 0, Math.PI * 2, false);
        cvsCtx.fill();
        cvsCtx.closePath();
    }
}

class ParticleLoading {
    cvs = null;
    cvsCtx = null;
    width = 0;
    height = 0;
    lastTime = 0;
    lastPercent = 0;
    percent = 0;
    particles = [];

    get v() {
        return this.width / 4;
    }
    get w() {
        return this.width * 0.8;
    }
    get h() {
        return this.width * 0.04;
    }
    get x() {
        return this.width * 0.1;
    }
    get y() {
        return (this.height - this.h) * 0.5;
    }

    constructor() {
        this.cvs = cvs;
        this.cvsCtx = cvs.getContext('2d');
        this.width = this.cvs.width = cvs.offsetWidth * window.devicePixelRatio;
        this.height = this.cvs.height = cvs.offsetHeight * window.devicePixelRatio;
        this.lastTime = Date.now();
        this._init();
        this._onEnterFrame();
    }

    update(percent) {
        this.lastPercent = this.percent;
        this.percent = percent;
    }

    _init() {
        window.addEventListener('resize', () => {
            this.width = this.cvs.width = cvs.offsetWidth * window.devicePixelRatio;
            this.height = this.cvs.height = cvs.offsetHeight * window.devicePixelRatio;
        });
    }

    _onEnterFrame = () => {
        const { cvsCtx, width, height, w, h, x, y, v, percent, lastPercent } = this;
        const t = (Date.now() - this.lastTime) / 1000;
        this.lastTime = Date.now();

        cvsCtx.clearRect(0, 0, width, height);
        cvsCtx.fillStyle = '#000000';
        cvsCtx.fillRect(0, 0, width, height);
        cvsCtx.fillStyle = '#333333';
        cvsCtx.fillRect(x, y, w, h);
        const f = cvsCtx.createLinearGradient(x, y, x + w, y);
        f.addColorStop(0, 'rgba(255,0,0,1)');
        f.addColorStop(0.25, 'rgba(255,255,0,1');
        f.addColorStop(0.5, 'rgba(0,255,0,1');
        f.addColorStop(0.75, 'rgba(0,255,255,1');
        f.addColorStop(1, 'rgba(0,0,255,1');
        cvsCtx.fillStyle = f;
        cvsCtx.fillRect(x, y, w * percent, h);

        this.particles = this.particles.filter(item => (item.render(t), item.alpha > 0));
        for (let i = 0; i < (percent - lastPercent) * 5 * width; i++) {
            const rad = (Math.random() / 3 - 1) * Math.PI;
            this.particles.push(
                new Particle({
                    cvsCtx,
                    x: x + w * percent + 2 - Math.random() * 4,
                    y: y + Math.random() * h * 0.5,
                    vx: Math.cos(rad) * v * (0.5 + Math.random()),
                    vy: Math.sin(rad) * v,
                    ax: 0,
                    ay: v * 1.5,
                    color: this._color(percent),
                })
            );
        }

        requestAnimationFrame(this._onEnterFrame);
    };

    _color(p) {
        let r, g, b;
        if (p < 0.25) {
            r = 255;
            g = 255 * (p / 0.25);
            b = 0;
        } else if (p < 0.5) {
            r = 255 * (1 - (p - 0.25) / 0.25);
            g = 255;
            b = 0;
        } else if (p < 0.75) {
            r = 0;
            g = 255;
            b = 255 * ((p - 0.5) / 0.25);
        } else {
            r = 0;
            g = 255 * (1 - (p - 0.75) / 0.25);
            b = 255;
        }
        return [r, g, b];
    }
}

const loading = new ParticleLoading(cvs);
let lastTime = Date.now();
let percent = 0;
let hidden = false;
let pause = false;
let speed = 0.0001;
requestAnimationFrame(function draw() {
    const t = Date.now() - lastTime;
    if (!hidden && !pause) {
        percent = (percent + speed * t) % 1;
    }
    loading.update(percent);
    lastTime += t;
    requestAnimationFrame(draw);
});

document.addEventListener('visibilitychange', e => {
    setTimeout(() => {
        hidden = document.hidden;
    }, 0);
});
$cvs.addEventListener('click', e => {
    pause = !pause;
});

const $range = document.querySelector('#range');
const $number = document.querySelector('#number');
$range.addEventListener('input', function (e) {
    $number.innerText = (this.value - 0).toFixed(2) + '% / s';
    speed = this.value / 100000;
});
