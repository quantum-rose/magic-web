function wave(elem) {
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

    const id = 'wave' + Date.now();
    document.body.insertAdjacentHTML(
        'afterbegin',
        `<svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            style="position: absolute; height: 0; clip: rect(0 0 0 0);"
        >
            <defs>
                <filter id="${id}">
                    <feImage
                        x="0"
                        y="0"
                        width="512"
                        height="512"
                        result="img"
                        xlink:href="${cvs.toDataURL()}"
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

    const $feImage = document.querySelector(`#${id} feImage`);
    const $feDisplacementMap = document.querySelector(`#${id} feDisplacementMap`);

    let clicked = false;
    elem.addEventListener('click', function (e) {
        if (clicked) return;
        clicked = true;
        elem.style.filter = `url(#${id})`;
        let lastTime = 0;
        let percent = 0;
        requestAnimationFrame(function draw() {
            if (Date.now() - lastTime > 16) {
                lastTime = Date.now();
                percent = Math.min(percent + 0.01, 1);
                const size = 1000 * percent;
                $feImage.setAttribute('x', e.layerX - size / 2);
                $feImage.setAttribute('y', e.layerY - size / 2);
                $feImage.setAttribute('width', size);
                $feImage.setAttribute('height', size);
                $feDisplacementMap.setAttribute('scale', 50 * (1 - percent));
            }

            if (percent !== 1) {
                requestAnimationFrame(draw);
            } else {
                clicked = false;
                elem.style.filter = '';
            }
        });
    });
}

wave(document.querySelector('#pond'));
wave(document.querySelector('#box'));
