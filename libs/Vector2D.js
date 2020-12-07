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
