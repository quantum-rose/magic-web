const cvs = document.querySelector('#cvs');

/* 粒子 */
class Particle {
    cvsCtx = null;
    r = 1; // 半径
    x = 0; // 横坐标
    y = 0; // 纵坐标
    vx = 0; // 水平速度
    vy = 0; // 垂直速度
    ax = 0; // 水平加速度
    ay = 0; // 垂直加速度
    lastTime = 0;
    isMouse = false;

    constructor({ isMouse = false, cvsCtx, x, y, vx, vy }) {
        this.isMouse = isMouse;
        this.cvsCtx = cvsCtx;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.lastTime = Date.now();
    }

    render() {
        if (!this.isMouse) {
            const { cvsCtx, r, vx, vy, ax, ay, lastTime } = this;
            const t = (Date.now() - lastTime) / 1000;
            this.x += vx * t + ax * t ** 2 * 0.5;
            this.y += vy * t + ay * t ** 2 * 0.5;
            // this.vx += ax * t;
            // this.vy += ay * t;
            cvsCtx.beginPath();
            cvsCtx.fillStyle = 'rgba(255,255,255,1)';
            cvsCtx.arc(this.x, this.y, r, 0, Math.PI * 2, false);
            cvsCtx.fill();
            cvsCtx.closePath();
        }
        this.lastTime = Date.now();
    }
}

/* 粒子网格 */
class ParticleGrid {
    cvs = null;
    cvsCtx = null;
    width = 0;
    height = 0;
    speed = 100;
    connectDistance = 200;
    particles = [];
    flag = false;

    get total() {
        return (this.width * this.height) ** 0.5 * 0.24;
    }

    get randomParticle() {
        const { cvsCtx, width, height, speed, connectDistance } = this;
        let x, y, rad;
        const i = Math.floor(Math.random() * 4);
        switch (i) {
            case 0:
                rad = Math.random() * Math.PI;
                x = Math.random() * (width + 2 * connectDistance) - connectDistance;
                y = -connectDistance;
                break;
            case 1:
                rad = (Math.random() + 0.5) * Math.PI;
                x = width + connectDistance;
                y = Math.random() * (height + 2 * connectDistance) - connectDistance;
                break;
            case 2:
                rad = (Math.random() - 1) * Math.PI;
                x = Math.random() * (width + 2 * connectDistance) - connectDistance;
                y = height + connectDistance;
                break;
            case 3:
                rad = (Math.random() - 0.5) * Math.PI;
                x = -connectDistance;
                y = Math.random() * (height + 2 * connectDistance) - connectDistance;
                break;
        }
        return new Particle({
            cvsCtx,
            x,
            y,
            vx: Math.cos(rad) * speed,
            vy: Math.sin(rad) * speed,
        });
    }

    constructor(cvs) {
        this.cvs = cvs;
        this.cvsCtx = cvs.getContext('2d');
        this.width = this.cvs.width = 2560;
        this.height = this.cvs.height = 1440;
        this.width = this.cvs.width = cvs.offsetWidth * window.devicePixelRatio;
        this.height = this.cvs.height = cvs.offsetHeight * window.devicePixelRatio;
        window.addEventListener('resize', () => {
            this.width = this.cvs.width = cvs.offsetWidth * window.devicePixelRatio;
            this.height = this.cvs.height = cvs.offsetHeight * window.devicePixelRatio;
        });
        this._init();
        this._onEnterFrame();
    }

    _init() {
        const { cvs, cvsCtx, width, height, speed, connectDistance } = this;
        this.particles[0] = new Particle({
            cvsCtx,
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
        });
        for (let i = 1; i < this.total; i++) {
            const rad = (Math.random() * 2 - 1) * Math.PI;
            this.particles[i] = new Particle({
                cvsCtx,
                x: Math.random() * (width + 2 * connectDistance) - connectDistance,
                y: Math.random() * (height + 2 * connectDistance) - connectDistance,
                vx: Math.cos(rad) * speed,
                vy: Math.sin(rad) * speed,
            });
        }
        cvs.addEventListener('mousemove', this._onMouseMove);
        cvs.addEventListener('click', this._onClick);
    }

    _onEnterFrame = () => {
        const { cvsCtx, width, height, connectDistance } = this;
        cvsCtx.clearRect(0, 0, width, height);
        cvsCtx.fillStyle = '#000000';
        cvsCtx.fillRect(0, 0, width, height);
        this.particles = this.particles.filter(item => {
            const { x, y } = item;
            const alive =
                x >= -connectDistance &&
                y >= -connectDistance &&
                x <= width + connectDistance &&
                y <= height + connectDistance;
            return alive && item.render(), alive;
        });
        for (let i = 0; i < this.total - this.particles.length; i++) {
            this.particles.push(this.randomParticle);
        }
        this._interact();
        requestAnimationFrame(this._onEnterFrame);
    };

    _interact() {
        const { cvsCtx, particles, connectDistance, flag } = this;
        const l = particles.length;
        for (let i = 0; i < l - 1; i++) {
            const a = particles[i];
            for (let j = i + 1; j < l; j++) {
                const b = particles[j];
                const d = ((a.x - b.x) ** 2 + (a.y - b.y) ** 2) ** 0.5;

                if (a.isMouse) {
                    const r = flag ? connectDistance : connectDistance * 0.6;
                    if (d <= r * (flag ? 1 : 2)) {
                        const c = flag ? 40000 : 20000;
                        const rad = Math.atan2(a.y - b.y, a.x - b.x);
                        b.ax = Math.cos(rad) * c * ((d - r) / r);
                        b.ay = Math.sin(rad) * c * ((d - r) / r);
                    } else {
                        b.ax = 0;
                        b.ay = 0;
                    }
                }

                /* 连线 */
                if (d <= connectDistance) {
                    cvsCtx.beginPath();
                    cvsCtx.lineWidth = 1;
                    cvsCtx.lineCap = 'round';
                    cvsCtx.strokeStyle = `rgba(255,255,255,${1 - d / connectDistance})`;
                    cvsCtx.moveTo(a.x, a.y);
                    cvsCtx.lineTo(b.x, b.y);
                    cvsCtx.stroke();
                    cvsCtx.closePath();
                }
            }
        }
    }

    _onMouseMove = e => {
        const { offsetX: x, offsetY: y } = e;
        const {
            width,
            height,
            cvs: { offsetWidth: w, offsetHeight: h },
        } = this;
        const mouse = this.particles[0];
        mouse.isMouse = true;
        mouse.x = x * (width / w);
        mouse.y = y * (height / h);
    };

    _onClick = e => {
        this.flag = !this.flag;
    };
}

new ParticleGrid(cvs);
