const data = [
        {
            per: 30 / 360,
            fill: '#37c',
        },
        {
            per: 35 / 360,
            fill: '#3c7',
        },
        {
            per: 45 / 360,
            fill: 'orange',
        },
        {
            per: 90 / 360,
            fill: '#f73',
        },
    ],
    $pieConicGradient = document.querySelector('.pie-conic-gradient'),
    $pieSvgPath = document.querySelector('.pie-svg-path'),
    $pieCanvas = document.querySelector('.pie-canvas');

class PieConicGradient {
    elem = null;
    data = [];
    constructor(elem, data) {
        this.elem = elem;
        this.data = data;
        this.elem.style.borderRadius = '50%';
        this.elem.style.backgroundColor = '#ccc';
        this._render();
    }
    _render() {
        let gradientArr = [],
            θ = 0; // 饼图起始位置，圆锥渐变 top 方向为 0deg，right 方向为 90deg
        this.data.forEach(item => {
            gradientArr.push(`${item.fill} ${θ}deg, ${item.fill} ${(θ += 360 * item.per)}deg`);
        });
        this.elem.style.backgroundImage = `conic-gradient(${gradientArr.join(',')}, rgba(0, 0, 0, 0) ${θ}deg)`;
    }
}
new PieConicGradient($pieConicGradient, data);

class PieSvgPath {
    elem = null;
    data = [];
    constructor(elem, data) {
        this.elem = elem;
        this.data = data;
        this.elem.setAttribute('viewBox', '0 0 100 100');
        this._render();
    }
    _render() {
        let pathArr = [`<circle cx="50" cy="50" r="50" fill="#ccc" />`],
            θ = -Math.PI / 2, // 饼图起始位置，x 轴正方向为 0，y 轴正方向为 π/2
            x = 50,
            y = 0;
        this.data.forEach(item => {
            θ += Math.PI * 2 * item.per;
            let θper = Math.PI * 2 * item.per,
                endX = Math.cos(θ) * 50 + 50,
                endY = Math.sin(θ) * 50 + 50;
            pathArr.push(
                `<path d="M 50 50 L ${x} ${y} A 50 50 0 ${θper > Math.PI ? 1 : 0} 1 ${endX} ${endY}" fill="${
                    item.fill
                }" />`
            );
            x = endX;
            y = endY;
        });
        this.elem.innerHTML = pathArr.join('');
    }
}
new PieSvgPath($pieSvgPath, data);

class PieCanvas {
    elem = null;
    cvsCtx = null;
    data = [];
    constructor(elem, data) {
        this.elem = elem;
        this.cvsCtx = this.elem.getContext('2d');
        this.data = data;

        this.elem.width = this.elem.height = this.elem.offsetWidth * window.devicePixelRatio;
        this._render();
    }
    _render() {
        let cvsCtx = this.cvsCtx,
            halfCvsSize = this.elem.width / 2,
            θ = -Math.PI / 2; // 饼图起始位置，x 轴正方向为 0，y 轴正方向为 π/2
        cvsCtx.beginPath();
        cvsCtx.fillStyle = '#ccc';
        cvsCtx.arc(halfCvsSize, halfCvsSize, halfCvsSize, 0, Math.PI * 2, false);
        cvsCtx.fill();
        this.data.forEach(item => {
            cvsCtx.beginPath();
            cvsCtx.fillStyle = item.fill;
            cvsCtx.moveTo(halfCvsSize, halfCvsSize);
            cvsCtx.arc(halfCvsSize, halfCvsSize, halfCvsSize, θ, (θ += Math.PI * 2 * item.per), false);
            cvsCtx.closePath();
            cvsCtx.fill();
        });
    }
}
new PieCanvas($pieCanvas, data);
