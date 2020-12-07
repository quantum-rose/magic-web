const $cvs = document.querySelector('#cvs');
const $reset = document.querySelector('.reset');
const cvsCtx = $cvs.getContext('2d');
let w = ($cvs.width = $cvs.offsetWidth * window.devicePixelRatio);
let h = ($cvs.height = $cvs.offsetHeight * window.devicePixelRatio);
let offsetX = w / 2; // 画布坐标原点的偏移，初始为画布大小的一半，使得原点位于屏幕中心
let offsetY = h / 2;
let mouseX = 0; // 鼠标相对于画布原点的坐标
let mouseY = 0;
let zoom = 1; // 画布缩放倍数
let lastPoint = {
    x: 0,
    y: 0,
}; // 鼠标移动过程中上一个点的位置

/**
 * 监听窗口大小的改变，动态修改canvas的大小
 */
window.addEventListener('resize', function () {
    w = $cvs.width = $cvs.offsetWidth * window.devicePixelRatio;
    h = $cvs.height = $cvs.offsetHeight * window.devicePixelRatio;
    offsetX = w / 2;
    offsetY = h / 2;
});

/**
 * 绑定滚轮事件，处理兼容性问题
 * @param {Element} elem
 * @param {Function} callback
 */
function bindWheelEvent(elem, callback) {
    if (window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
        elem.addEventListener('DOMMouseScroll', wheel, false);
    } else {
        elem.addEventListener('mousewheel', wheel, false);
    }
    function wheel(e) {
        e.preventDefault();
        const dir = e.detail ? e.detail > 0 : e.wheelDelta < 0;
        callback(e, dir);
    }
}

/**
 * 根据滚轮滚动方向缩放画布，并且是以鼠标所在位置为中心进行缩放
 */
bindWheelEvent($cvs, function (e, dir) {
    mouseX = e.offsetX - offsetX;
    mouseY = offsetY - e.offsetY;

    /**
     * 设鼠标当前相对画布原点的坐标为 a(x, y)
     * 则画布缩放n倍后的坐标为 b(nx, ny)
     * 缩放后的水平偏移为 (n-1)x，竖直偏移为 (n-1)y
     * 将画布平移相同的距离，即可在视觉效果上实现以鼠标为中心的缩放
     * 因为在这个例子中，我将画布的纵轴上下翻转了
     * 所以 (n-1)y 小于0时平移的方向是向下的
     * 但画布的平移变换大于0才是向下的，两者的符号相反
     */
    if (dir && zoom > 0.1) {
        zoom *= 0.8;
        offsetX += mouseX * 0.2;
        offsetY -= mouseY * 0.2;
    }

    if (!dir && zoom < 100) {
        zoom *= 1.25;
        offsetX -= mouseX * 0.25;
        offsetY += mouseY * 0.25;
    }
});

function grabbing(e) {
    const { offsetX: x, offsetY: y } = e;
    offsetX += x - lastPoint.x;
    offsetY += y - lastPoint.y;
    lastPoint.x = x;
    lastPoint.y = y;
}
function removeEvent() {
    $cvs.removeEventListener('mousemove', grabbing);
    $cvs.removeEventListener('mouseleave', removeEvent);
}
function grab(e) {
    lastPoint.x = e.offsetX;
    lastPoint.y = e.offsetY;
    $cvs.addEventListener('mousemove', grabbing);
    $cvs.addEventListener('mouseleave', removeEvent);
}
$cvs.addEventListener('mousedown', grab);
$cvs.addEventListener('mouseup', removeEvent);

$reset.addEventListener('click', function () {
    offsetX = w / 2;
    offsetY = h / 2;
    zoom = 1;
});

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
    cvsCtx.transform(zoom, 0, 0, -zoom, offsetX, offsetY);

    const per = (Date.now() % 2500) / 2500;
    const firstPer = Math.min(per / 0.5, 1);
    const secondPer = Math.max((per - 0.5) / 0.5, 0);
    const offset = Math.PI * 2 * ((Date.now() % 3000) / 3000);

    arc(0, Math.PI * 2, 60, -800, 800, 200).draw(cvsCtx);
    arc(secondPer * Math.PI * 2 + offset, firstPer * Math.PI * 2 + offset, 60, 800, 800, 200).draw(cvsCtx, {
        lineWidth: 30,
        strokeStyle: '#007bff',
    });

    arc_0_0_100(0, Math.PI * 2).draw(cvsCtx);

    ellipse(0, Math.PI * 2, 60, -800, -800, 300, 200).draw(cvsCtx);
    ellipse(secondPer * Math.PI * 2 + offset, firstPer * Math.PI * 2 + offset, 60, 800, -800, 300, 50).draw(cvsCtx);

    parabola(-10, 10, 800, 0, 0, 100).draw(cvsCtx);

    helical(0, 50, 800, 10).draw(cvsCtx, { strokeStyle: 'red' });

    star(0, Math.PI * 2, 100, 400).draw(cvsCtx, { strokeStyle: 'blue' });

    {
        const p0 = new Vector2D(-1200, 0);
        const p1 = new Vector2D(-800, 0);
        p1.rotate(Math.PI / 4);
        const p2 = new Vector2D(-750, 0);
        quadricBezier(0, 1, 100, p0, p1, p2).draw(cvsCtx);
    }

    {
        const p0 = new Vector2D(600, 0);
        const p1 = new Vector2D(1100, 0);
        p1.rotate(Math.PI / -4);
        const p2 = new Vector2D(1200, 0);
        p2.rotate(Math.PI / 4);
        const p3 = new Vector2D(1250, 0);
        cubicBezier(0, 1, 100, p0, p1, p2, p3).draw(cvsCtx);
    }

    cvsCtx.restore();

    requestAnimationFrame(render);
});
