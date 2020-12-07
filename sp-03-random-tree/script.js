class Vector2D {
    constructor(x = 1, y = 0) {
        this.x = x;
        this.y = y;
    }
    /**
     * 向量的模，向量的长度值
     */
    set norm(val) {}
    get norm() {
        return Math.hypot(this.x, this.y);
    }
    /**
     * 方向，弧度值，向量到 x 轴正方向的角度，y 轴正方向为90度
     */
    set dir(val) {}
    get dir() {
        return Math.atan2(this.y, this.x);
    }
    /**
     * 复制向量
     */
    copy() {
        return new Vector2D(this.x, this.y);
    }
    /**
     * 向量加法
     * @param {Vector2D} vec 向量
     */
    add(vec) {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }
    /**
     * 向量减法
     * @param {Vector2D} vec 向量
     */
    sub(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    }
    /**
     * 点积
     * @param {Vector2D} vec 向量
     */
    dot(vec) {
        return this.x * vec.x + this.y * vec.y;
    }
    /**
     * 叉积
     * @param {Vector2D} vec 向量
     */
    cross(vec) {
        return this.x * vec.y - this.y * vec.x;
    }
    /**
     * 向量缩放
     * @param {Number} s 缩放倍数
     */
    scale(s) {
        this.x *= s;
        this.y *= s;
        return this;
    }
    /**
     * 向量旋转，从 x 轴正方向到 y 轴正方向的旋转为正值
     * @param {Number} rad 弧度
     */
    rotate(rad) {
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const { x, y } = this;
        this.x = cos * x + sin * y;
        this.y = -sin * x + cos * y;
        return this;
    }
    /**
     * 化为单位向量
     */
    normalize() {
        return this.scale(1 / this.norm);
    }
}

const cvs = document.querySelector('#tree'),
    cvsCtx = cvs.getContext('2d');

cvs.width = cvs.offsetWidth * window.devicePixelRatio;
cvs.height = cvs.offsetHeight * window.devicePixelRatio;
cvs.style.width = cvs.offsetWidth + 'px';
cvs.style.height = cvs.offsetHeight + 'px';

cvsCtx.transform(1, 0, 0, -1, cvs.width / 2, cvs.height);

function drawBranch(cvsCtx, totalLength, start, end, lineWidth, strokeStyle, callback) {
    const deltaX = end.x - start.x;
    const deltaY = end.y - start.y;
    let length = 0;
    let lastTime = 0;

    requestAnimationFrame(function draw() {
        if (Date.now() - lastTime > 16) {
            lastTime = Date.now();
            length += 10;
            length > totalLength && (length = totalLength);
            const progress = length / totalLength;

            cvsCtx.beginPath();
            cvsCtx.strokeStyle = strokeStyle;
            cvsCtx.lineWidth = lineWidth;
            cvsCtx.lineCap = 'round';
            cvsCtx.moveTo(start.x, start.y);
            cvsCtx.lineTo(start.x + deltaX * progress, start.y + deltaY * progress);
            cvsCtx.stroke();
        }
        if (length !== totalLength) {
            requestAnimationFrame(draw);
        } else {
            callback();
        }
    });
}

function drawTree(cvsCtx, start, length, width, dir, bias) {
    const end = new Vector2D().scale(length).rotate(dir).add(start);

    drawBranch(cvsCtx, length, start, end, width, '#000', function () {
        if (width >= 1) {
            drawTree(
                cvsCtx,
                end,
                length * 0.8,
                width * 0.8,
                dir + Math.PI * 0.125 + bias * (0.5 - Math.random()),
                bias * 0.9
            );
            drawTree(
                cvsCtx,
                end,
                length * 0.8,
                width * 0.8,
                dir - Math.PI * 0.125 + bias * (0.5 - Math.random()),
                bias * 0.9
            );
        }

        if (width < 5 && Math.random() < 0.2) {
            cvsCtx.save();
            cvsCtx.strokeStyle = '#c72c35';
            cvsCtx.lineWidth = Math.random() * 10 + 3;
            cvsCtx.lineCap = 'round';
            cvsCtx.beginPath();
            cvsCtx.moveTo(end.x, end.y - 1);
            cvsCtx.lineTo(end.x, end.y + 1);
            cvsCtx.stroke();
            cvsCtx.restore();
        }
    });
}

drawTree(
    cvsCtx,
    new Vector2D(0, 0),
    Math.min(cvs.width, cvs.height) * 0.2,
    Math.min(cvs.width, cvs.height) * 0.02,
    Math.PI * -0.5 + (0.5 - Math.random()),
    Math.PI / 3
);
