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

export default parametric;
