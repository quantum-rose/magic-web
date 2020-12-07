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
