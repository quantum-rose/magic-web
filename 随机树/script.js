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

cvsCtx.transform(1, 0, 0, -1, cvs.width / 2, cvs.height);

function drawTree(cvsCtx, start, length, width, dir) {
    const vec = new Vector2D().scale(length).rotate(dir).add(start);
    cvsCtx.beginPath();
    cvsCtx.strokeStyle = '#fff';
    cvsCtx.lineWidth = width;
    cvsCtx.moveTo(start.x, start.y);
    console.log(start.x, start.y);
    cvsCtx.lineTo(vec.x, vec.y);
    console.log(vec.x, vec.y);
    cvsCtx.stroke();

    if (width >= 1) {
        drawTree(cvsCtx, vec, length * 0.8, width * 0.8, dir + Math.PI / 8);
        drawTree(cvsCtx, vec, length * 0.8, width * 0.8, dir + Math.PI / -8);
    }
}

drawTree(cvsCtx, new Vector2D(0, 0), cvs.width / 10, 10, -Math.PI / 2);
