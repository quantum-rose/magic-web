const mySwiper = new Swiper('.swiper-container', {
    direction: 'vertical', // 垂直切换选项
    mousewheel: true,
    pagination: {
        el: '.swiper-pagination',
    },
});

(function (document) {
    const $svg = document.querySelector('#svg');
    const $ripple = document.querySelector('.ripple');
    const $ripples = document.querySelector('#ripples');

    $svg.addEventListener('click', function (e) {
        const matrix = $svg.getScreenCTM().inverse();
        const screenPoint = $svg.createSVGPoint();
        screenPoint.x = e.clientX;
        screenPoint.y = e.clientY;
        const svgPoint = screenPoint.matrixTransform(matrix);

        const $newRipple = $ripple.cloneNode(true);
        $newRipple.setAttribute('transform', `translate(${svgPoint.x}, ${svgPoint.y})`);
        $ripples.appendChild($newRipple);

        const $animates = $newRipple.querySelectorAll('animate');
        let animationendCount = 0;
        const animationend = function () {
            if (++animationendCount == $animates.length) {
                $newRipple.remove();
            }
        };
        $animates.forEach(item => {
            item.onend = animationend;
            item.beginElement();
        });
    });
})(document);

const Wave = (function () {
    const radius = 256;
    const cvs = document.createElement('canvas');
    cvs.width = cvs.height = radius * 2;
    const cvsCtx = cvs.getContext('2d');

    cvsCtx.save();
    cvsCtx.translate(radius, radius);

    /* 绘制红绿相间的圆锥渐变，其实是4个线性渐变 */
    for (let i = 0, rad = 0; i < 4; i++) {
        cvsCtx.beginPath();
        cvsCtx.arc(0, 0, 128, rad, rad + Math.PI / 2, false);
        const x0 = radius * Math.cos(rad);
        const y0 = radius * Math.sin(rad);
        rad += Math.PI / 2;
        const x1 = radius * Math.cos(rad);
        const y1 = radius * Math.sin(rad);
        let f = cvsCtx.createLinearGradient(x0, y0, x1, y1);
        f.addColorStop(0, i % 2 ? '#f00' : '#0f0');
        f.addColorStop(1, i % 2 ? '#0f0' : '#f00');
        cvsCtx.strokeStyle = f;
        cvsCtx.lineWidth = radius;
        cvsCtx.stroke();
    }

    /* 绘制环形条纹 */
    const startRadius = 100;
    const endRadius = 250;
    const l = endRadius - startRadius;
    const f = cvsCtx.createRadialGradient(0, 0, startRadius, 0, 0, endRadius);
    f.addColorStop(0, 'rgba(127,127,127,1)');
    f.addColorStop(17 / l, 'rgba(115,115,115,.8)');
    f.addColorStop(25 / l, 'rgba(115,115,115,0.1)');
    f.addColorStop(28 / l, 'rgba(115,115,115,0.1)');
    f.addColorStop(37 / l, 'rgba(115,104,104,.8)');
    f.addColorStop(43 / l, 'rgba(115,104,104,1)');
    f.addColorStop(44 / l, 'rgba(127,127,127,1)');
    f.addColorStop(50 / l, 'rgba(127,127,127,.6)');
    f.addColorStop(54 / l, 'rgba(127,127,127,0)');
    f.addColorStop(61 / l, 'rgba(0,0,0,0)');
    f.addColorStop(67 / l, 'rgba(0,0,0,1)');
    f.addColorStop(78 / l, 'rgba(0,0,0,1)');
    f.addColorStop(88 / l, 'rgba(0,0,0,0)');
    f.addColorStop(100 / l, 'rgba(0,0,0,0)');
    f.addColorStop(108 / l, 'rgba(0,0,0,1)');
    f.addColorStop(117 / l, 'rgba(0,0,0,1)');
    f.addColorStop(136 / l, 'rgba(0,0,0,0)');
    f.addColorStop(1, 'rgba(0,0,0,0)');
    cvsCtx.beginPath();
    cvsCtx.arc(0, 0, radius, 0, Math.PI * 2);
    cvsCtx.fillStyle = f;
    cvsCtx.fill();
    cvsCtx.restore();
    return class Wave {
        static backgroundImage = cvs.toDataURL();

        constructor(elem) {
            this.elem = elem;
            this.id = 'wave' + Date.now();
            this.clicked = false;
            this.init();
        }

        init() {
            document.body.insertAdjacentHTML(
                'afterbegin',
                `<svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    style="position: absolute; height: 0; clip: rect(0 0 0 0);"
                >
                    <defs>
                        <filter id="${this.id}">
                            <feImage
                                x="0"
                                y="0"
                                width="0"
                                height="0"
                                result="img"
                                xlink:href="${Wave.backgroundImage}"
                            ></feImage>
                            <feDisplacementMap
                                in="SourceGraphic"
                                in2="img"
                                scale="0"
                                xChannelSelector="R"
                                yChannelSelector="G"
                                color-interpolation-filters="sRGB"
                            ></feDisplacementMap>
                            <feComposite operator="in" in2="img"></feComposite>
                            <feComposite in2="SourceGraphic"></feComposite>
                        </filter>
                    </defs>
                </svg>`
            );
            this.$feImage = document.querySelector(`#${this.id} feImage`);
            this.$feDisplacementMap = document.querySelector(`#${this.id} feDisplacementMap`);

            this.elem.addEventListener('click', e => {
                if (this.clicked) return;
                this.clicked = true;
                this.elem.style.filter = `url(#${this.id})`;
                let lastTime = 0;
                let percent = 0;
                const draw = () => {
                    if (Date.now() - lastTime > 16) {
                        lastTime = Date.now();
                        percent = Math.min(percent + 0.01, 1);
                        const size = 1000 * percent;
                        this.$feImage.setAttribute('x', e.offsetX - size / 2);
                        this.$feImage.setAttribute('y', e.offsetY - size / 2);
                        this.$feImage.setAttribute('width', size);
                        this.$feImage.setAttribute('height', size);
                        this.$feDisplacementMap.setAttribute('scale', 50 * (1 - percent));
                    }

                    if (percent !== 1) {
                        requestAnimationFrame(draw);
                    } else {
                        this.clicked = false;
                        this.elem.style.filter = '';
                    }
                };
                draw();
            });
        }
    };
})();

new Wave(document.querySelector('#pond'));
new Wave(document.querySelector('#box'));
