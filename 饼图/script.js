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
    $pieTransform = document.querySelector('.pie-transform'),
    $pieSvgPath = document.querySelector('.pie-svg-path');

class PieTransform {
    elem = null;
    data = [];
    constructor(elem, data) {
        this.elem = elem;
        this.data = data;
        this.elem.style.borderRadius = '50%';
        this.elem.style.overflow = 'hidden';
        this.elem.style.backgroundColor = '#ccc';
        this._render();
    }
    _render() {
        let pieArr = [],
            deg = -90;
        this.data.forEach(item => {
            pieArr.push(
                `<div style="background-color: ${item.fill}; width: 1000%; height: 1000%; transform-origin: 0 0; transform: rotate(${deg}deg) skew(60deg)" ></div>`
            );
        });
        this.elem.innerHTML = pieArr.join('');
    }
}

new PieTransform($pieTransform, data);

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
            θ = -Math.PI / 2, // 饼图起始位置，x轴正方向为 0，y轴正方向为 π/2
            x = 50,
            y = 0;
        this.data.forEach(item => {
            pathArr.push(`<path d="M 50 50 L ${x} ${y} A 50 50 0 0 1 `);
            θ += Math.PI * 2 * item.per;
            x = Math.cos(θ) * 50 + 50;
            y = Math.sin(θ) * 50 + 50;
            pathArr.push(`${x} ${y}" fill="${item.fill}" />`);
        });
        this.elem.innerHTML = pathArr.join('');
    }
}

new PieSvgPath($pieSvgPath, data);
