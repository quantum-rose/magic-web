let zoom = 1;
const $scrollContainer = document.querySelector('.scroll-container');
$scrollContainer.scrollTop = $scrollContainer.scrollHeight - $scrollContainer.clientHeight;
$scrollContainer.addEventListener('scroll', function (e) {
    const { scrollTop, clientHeight, scrollHeight } = $scrollContainer;
    zoom = 1 / (1 + (1 - scrollTop / (scrollHeight - clientHeight)) * 8);
    w = $cvs.width = $cvs.offsetWidth * window.devicePixelRatio * zoom;
    h = $cvs.height = $cvs.offsetHeight * window.devicePixelRatio * zoom;
});
const $cvs = document.querySelector('#cvs');
let w = ($cvs.width = $cvs.offsetWidth * window.devicePixelRatio * zoom);
let h = ($cvs.height = $cvs.offsetHeight * window.devicePixelRatio * zoom);
const cvsCtx = $cvs.getContext('2d');

window.addEventListener('resize', function () {
    w = $cvs.width = $cvs.offsetWidth * window.devicePixelRatio * zoom;
    h = $cvs.height = $cvs.offsetHeight * window.devicePixelRatio * zoom;
});

import Vector2D from '../libs/Vector2D.js';

/**
 * 依次连接坐标点绘制折线
 * @param {Array[Array]} points 坐标点集合，每一项为长度2的数组，两项分别为x和y坐标
 * @param {CanvasRenderingContext2D} cvsCtx canvas 2d绘图上下文
 * @param {Object} param2 线条样式
 */
function draw(points, cvsCtx, { lineWidth = 1, strokeStyle = 'black', fillStyle = null, close = false } = {}) {
    cvsCtx.save();
    cvsCtx.lineWidth = lineWidth;
    cvsCtx.strokeStyle = strokeStyle;
    cvsCtx.beginPath();
    cvsCtx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
        cvsCtx.lineTo(points[i][0], points[i][1]);
    }
    if (close) cvsCtx.closePath();
    if (fillStyle) {
        cvsCtx.fillStyle = fillStyle;
        cvsCtx.fill();
    }
    cvsCtx.stroke();
    cvsCtx.restore();
}

/**
 * 构建曲线参数方程
 * @param {Function} func 该函数的第一个参数是t，约定返回值是长度为2的数组，数组的两个元素为一个点的x和y坐标
 * @return {Function} 构造出的曲线函数，前两个参数为t的取值范围，闭区间；第三个参数为区间内的采样点数量，值越大、曲线越平滑；返回值为一个对象，包括一个points数组，为所有采样点的坐标（共有采样点数量+1个坐标点），以及一个draw方法，同上面的draw函数
 */
function parametric(func) {
    return function (start, end, segments = 100, ...args) {
        const points = [];
        for (let i = 0; i <= segments; i++) {
            points[i] = func(((end - start) / segments) * i + start, ...args);
        }
        return {
            points,
            draw: draw.bind(null, points),
        };
    };
}

/**
 * 圆
 */
const arc = parametric((t, cx, cy, r) => [cx + r * Math.cos(t), cy + r * Math.sin(t)]);

/**
 * 圆心(0,0)半径100的圆
 */
const arc_0_0_100 = parametric(t => [100 * Math.cos(t), 100 * Math.sin(t)]);

/**
 * 椭圆
 */
const ellipse = parametric((t, cx, cy, rx, ry) => [cx + rx * Math.cos(t), cy + ry * Math.sin(t)]);

/**
 * 抛物线
 */
const parabola = parametric((t, x, y, p) => [x + 2 * p * t, y + 2 * p * t ** 2]);

/**
 * 双曲线
 */
const hyperbola = parametric((t, a, b) => [a * (1 / Math.cos(t)), b * Math.tan(t)]);

/**
 * 阿基米德螺线
 */
const helical = parametric((t, l) => [l * t * Math.cos(t), l * t * Math.sin(t)]);

/**
 * 四角星
 */
const star = parametric((t, l) => [l * Math.cos(t) ** 3, l * Math.sin(t) ** 3]);

/**
 * 二次贝塞尔曲线
 */
const quadricBezier = parametric((t, p0, p1, p2) => [
    (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * p1.x + t ** 2 * p2.x,
    (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * p1.y + t ** 2 * p2.y,
]);

/**
 * 三次贝塞尔曲线
 */
const cubicBezier = parametric((t, p0, p1, p2, p3) => [
    (1 - t) ** 3 * p0.x + 3 * (1 - t) ** 2 * t * p1.x + 3 * (1 - t) * t ** 2 * p2.x + t ** 3 * p3.x,
    (1 - t) ** 3 * p0.y + 3 * (1 - t) ** 2 * t * p1.y + 3 * (1 - t) * t ** 2 * p2.y + t ** 3 * p3.y,
]);

requestAnimationFrame(function render() {
    cvsCtx.clearRect(0, 0, w, h);
    cvsCtx.save();
    cvsCtx.transform(1, 0, 0, -1, w / 2, h / 2);

    const per = (Date.now() % 2500) / 2500;
    const firstPer = Math.min(per / 0.5, 1);
    const secondPer = Math.max((per - 0.5) / 0.5, 0);

    const offset = Math.PI * 2 * ((Date.now() % 3000) / 3000);

    arc(0, Math.PI * 2, 60, -200, 200, 200).draw(cvsCtx);
    arc(secondPer * Math.PI * 2 + offset, firstPer * Math.PI * 2 + offset, 60, 200, 200, 200).draw(cvsCtx, {
        lineWidth: 30,
        strokeStyle: '#007bff',
    });

    arc_0_0_100(0, Math.PI * 2).draw(cvsCtx);

    ellipse(0, Math.PI * 2, 60, -200, -200, 300, 200).draw(cvsCtx);
    ellipse(secondPer * Math.PI * 2 + offset, firstPer * Math.PI * 2 + offset, 60, 200, -200, 300, 50).draw(cvsCtx);

    parabola(-4, 4, 80, 0, 0, 100).draw(cvsCtx);

    hyperbola(-Math.PI + 0.000001, Math.PI - 0.000001, 80, 150, 100).draw(cvsCtx, {
        lineWidth: 5,
    });

    helical(0, 50, 600, 10).draw(cvsCtx, { strokeStyle: 'red' });

    star(0, Math.PI * 2, 100, 400).draw(cvsCtx, { strokeStyle: 'blue' });

    {
        const p0 = new Vector2D(0, 0);
        const p1 = new Vector2D(800, 0);
        p1.rotate(Date.now() / 300);
        const p2 = new Vector2D(300, 0);
        const count = 30;
        for (let i = 0; i < count; i++) {
            // 绘制30条从圆心出发，旋转不同角度的二阶贝塞尔曲线
            p1.rotate((2 / count) * Math.PI);
            p2.rotate((2 / count) * Math.PI);
            quadricBezier(0, 1, 100, p0, p1, p2).draw(cvsCtx, {
                lineWidth: 2,
                strokeStyle: `hsl(${(360 * i) / count}, 100%, 50%)`,
            });
        }
    }

    {
        const p0 = new Vector2D(0, 0);
        const p1 = new Vector2D(350, 0);
        p1.rotate(Date.now() / 300);
        const p2 = new Vector2D(400, 0);
        p2.rotate(Date.now() / -500);
        const p3 = new Vector2D(450, 0);
        const count = 30;
        for (let i = 0; i < count; i++) {
            p1.rotate((2 / count) * Math.PI);
            p2.rotate((2 / count) * Math.PI);
            p3.rotate((2 / count) * Math.PI);
            cubicBezier(0, 1, 100, p0, p1, p2, p3).draw(cvsCtx, {
                lineWidth: 2,
                strokeStyle: `hsl(${(360 * i) / count}, 100%, 50%)`,
            });
        }
    }

    cvsCtx.restore();

    requestAnimationFrame(render);
});
