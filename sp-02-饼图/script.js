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
    $pieSvgDash = document.querySelector('.pie-svg-dash'),
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
    update(data) {
        this.data = data;
        this._render();
    }
}
const pieConicGradient = new PieConicGradient($pieConicGradient, data);

class PieSvgPath {
    elem = null;
    data = [];
    pies = [];
    constructor(elem, data) {
        this.elem = elem;
        this.data = data;
        this.elem.setAttribute('viewBox', '0 0 100 100');
        this.elem.innerHTML = `<circle cx="50" cy="50" r="50" fill="#ccc" />`;
        this._render();
    }
    _render() {
        let θ = -Math.PI / 2, // 饼图起始位置，x 轴正方向为 0，y 轴正方向为 π/2
            x = 50,
            y = 0,
            pie = null,
            θper = 0,
            endX = 0,
            endY = 0;
        this.pies.length = this.data.length;
        this.data.forEach((item, i) => {
            if (!this.pies[i]) {
                this.pies[i] = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                this.elem.appendChild(this.pies[i]);
            }
            θ += Math.PI * 2 * item.per;
            θper = Math.PI * 2 * item.per;
            endX = Math.cos(θ) * 50 + 50;
            endY = Math.sin(θ) * 50 + 50;
            pie = this.pies[i];
            pie.setAttribute('d', `M 50 50 L ${x} ${y} A 50 50 0 ${θper > Math.PI ? 1 : 0} 1 ${endX} ${endY} Z`);
            pie.setAttribute('fill', item.fill);
            x = endX;
            y = endY;
        });
    }
    update(data) {
        this.data = data;
        this._render();
    }
}
const pieSvgPath = new PieSvgPath($pieSvgPath, data);

class PieSvgDash {
    elem = null;
    data = [];
    pies = [];
    constructor(elem, data) {
        this.elem = elem;
        this.data = data;
        this.elem.setAttribute('viewBox', '0 0 100 100');
        this.elem.innerHTML = `<circle cx="50" cy="50" r="25" stroke-width="50" stroke="#ccc" />`;
        this._render();
    }
    _render() {
        let C = Math.PI * 2 * 25,
            length = 0,
            lengthPer = 0,
            pie = null;
        this.pies.length = this.data.length;
        this.data.forEach((item, i) => {
            if (!this.pies[i]) {
                this.pies[i] = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                this.elem.appendChild(this.pies[i]);
            }
            lengthPer = C * item.per;
            pie = this.pies[i];
            pie.setAttribute('cx', 50);
            pie.setAttribute('cy', 50);
            pie.setAttribute('r', 25);
            pie.setAttribute('stroke', item.fill);
            pie.setAttribute('stroke-width', 50);
            pie.setAttribute('stroke-dasharray', `0 ${length} ${lengthPer} ${C}`);
            pie.setAttribute('fill-opacity', 0);
            pie.setAttribute('transform', 'rotate(-90, 50, 50)');
            length += lengthPer;
        });
    }
    update(data) {
        this.data = data;
        this._render();
    }
}
const pieSvgDash = new PieSvgDash($pieSvgDash, data);

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
        window.addEventListener('resize', () => {
            this.elem.width = this.elem.height = this.elem.offsetWidth * window.devicePixelRatio;
            this._render();
        });
    }
    _render() {
        let cvsCtx = this.cvsCtx,
            halfCvsSize = this.elem.width / 2,
            θ = -Math.PI / 2; // 饼图起始位置，x 轴正方向为 0，y 轴正方向为 π/2
        cvsCtx.clearRect(0, 0, this.elem.width, this.elem.height);
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
    update(data) {
        this.data = data;
        this._render();
    }
}
const pieCanvas = new PieCanvas($pieCanvas, data);

(function () {
    let $playPause = document.querySelector('#play-pause'),
        lastTime = 0,
        percent = 0;
    requestAnimationFrame(function update() {
        if (Date.now() - lastTime > 16 && $playPause.checked) {
            lastTime = Date.now();
            percent = (percent + 0.005) % 1;
            data[0].per = (20 / 360) * percent;
            data[1].per = (50 / 360) * percent;
            data[2].per = (100 / 360) * percent;
            data[3].per = (190 / 360) * percent;
            pieConicGradient.update(data);
            pieSvgPath.update(data);
            pieSvgDash.update(data);
            pieCanvas.update(data);
        }
        requestAnimationFrame(update);
    });
})();
