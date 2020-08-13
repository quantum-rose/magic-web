const $canvas = document.getElementById('wave'),
    cvsCtx = $canvas.getContext('2d'),
    PI_1_2 = Math.PI / 2,
    PI_2 = Math.PI * 2;

let cvsSize = $canvas.offsetWidth * window.devicePixelRatio,
    cvsHalfSize = cvsSize / 2,
    cvsQuarterSize = cvsSize / 4,
    outlineWidth = cvsSize / 20,
    circleRadius = cvsHalfSize - outlineWidth / 2,
    clipCircleRadius = cvsHalfSize - outlineWidth,
    clipCircleDiameter = clipCircleRadius * 2,
    waveBottomRight = outlineWidth + clipCircleDiameter,
    A = circleRadius / 6, // 振幅，最大为半径的六分之一
    ω = Math.PI / circleRadius, // 角速度，此时周期为2R，在圆内最宽处刚好显示一个完整的周期
    φ = Math.PI / 240, // 每16ms波形的相位变化差值
    percent = 0,
    isStaticRoundedRect = false,
    isDynamicRoundedRect = false,
    isDynamicInsetRoundedRect = false,
    lastTime = 0;

$canvas.width = $canvas.height = cvsSize;

CanvasRenderingContext2D.prototype.roundedRect_arcTo = function (x, y, width, height, radius) {
    cvsCtx.moveTo(x + radius, y);
    cvsCtx.lineTo(x + width - radius, y);
    cvsCtx.arcTo(x + width, y, x + width, y + radius, radius);
    cvsCtx.lineTo(x + width, y + height - radius);
    cvsCtx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    cvsCtx.lineTo(x + radius, y + height);
    cvsCtx.arcTo(x, y + height, x, y + height - radius, radius);
    cvsCtx.lineTo(x, y + radius);
    cvsCtx.arcTo(x, y, x + radius, y, radius);
};

CanvasRenderingContext2D.prototype.roundedRect_arc = function (x, y, width, height, radius, inset = false, per = 1) {
    inset = !!inset;
    per = between01(isNaN(per) ? 1 : per);

    const l = width * 2 + height * 2 - radius * 8 + Math.PI * radius * 2;
    const w = width - radius * 2;
    const pw = w / l;
    const h = height - radius * 2;
    const ph = h / l;
    const arc = (Math.PI * radius * 2) / 4;
    const parc = arc / l;

    cvsCtx.moveTo(x + radius, y);
    cvsCtx.lineTo(x + radius + w * between01(per / pw), y);

    if (per <= pw) return;

    if (inset) {
        cvsCtx.arc(x + width, y, radius, Math.PI, (Math.PI / 2) * (2 - between01((per - pw) / parc)), true);
    } else {
        cvsCtx.arc(
            x + width - radius,
            y + radius,
            radius,
            Math.PI / -2,
            (Math.PI / -2) * (1 - between01((per - pw) / parc)),
            false
        );
    }

    if (per <= pw + parc) return;

    cvsCtx.lineTo(x + width, y + radius + h * between01((per - pw - parc) / ph));

    if (per <= pw + parc + ph) return;

    if (inset) {
        cvsCtx.arc(
            x + width,
            y + height,
            radius,
            Math.PI / -2,
            (Math.PI / -2) * (1 + between01((per - pw - parc - ph) / parc)),
            true
        );
    } else {
        cvsCtx.arc(
            x + width - radius,
            y + height - radius,
            radius,
            0,
            (Math.PI / 2) * between01((per - pw - parc - ph) / parc),
            false
        );
    }

    if (per <= pw + ph + 2 * parc) return;

    cvsCtx.lineTo(x + radius + w * (1 - between01((per - pw - ph - 2 * parc) / pw)), y + height);

    if (per <= pw + parc + ph + parc + pw) return;

    if (inset) {
        cvsCtx.arc(x, y + height, radius, 0, (Math.PI / -2) * between01((per - 2 * (pw + parc) - ph) / parc), true);
    } else {
        cvsCtx.arc(
            x + radius,
            y + height - radius,
            radius,
            Math.PI / 2,
            (Math.PI / 2) * (1 + between01((per - 2 * (pw + parc) - ph) / parc)),
            false
        );
    }

    if (per <= 2 * pw + ph + 3 * parc) return;

    cvsCtx.lineTo(x, y + radius + h * (1 - between01((per - 2 * pw - ph - 3 * parc) / ph)));

    if (per <= 2 * (pw + parc + ph) + parc) return;

    if (inset) {
        cvsCtx.arc(
            x,
            y,
            radius,
            Math.PI / 2,
            (Math.PI / 2) * (1 - between01((per - 2 * (pw + ph) - 3 * parc) / parc)),
            true
        );
    } else {
        cvsCtx.arc(
            x + radius,
            y + radius,
            radius,
            Math.PI,
            (Math.PI / 2) * (2 + between01((per - 2 * (pw + ph) - 3 * parc) / parc)),
            false
        );
    }
};

function drawRoundedRect(x, y, width, height, radius, per) {
    cvsCtx.save();

    if (isStaticRoundedRect) {
        cvsCtx.beginPath();
        cvsCtx.roundedRect_arcTo(x, y, width, height, radius);
        cvsCtx.strokeStyle = '#70dfc0';
        cvsCtx.lineWidth = outlineWidth;
        cvsCtx.stroke();
    }

    if (isDynamicRoundedRect) {
        cvsCtx.beginPath();
        cvsCtx.roundedRect_arc(x, y, width, height, radius, false, per);
        cvsCtx.strokeStyle = '#3f7173';
        cvsCtx.lineWidth = outlineWidth / 2;
        cvsCtx.stroke();
    }

    if (isDynamicInsetRoundedRect) {
        cvsCtx.beginPath();
        cvsCtx.roundedRect_arc(
            outlineWidth / 4,
            outlineWidth / 4,
            cvsSize - outlineWidth / 2,
            cvsSize - outlineWidth / 2,
            radius * 2 - outlineWidth / 4,
            true,
            per
        );
        cvsCtx.strokeStyle = '#d5f6ec';
        cvsCtx.lineWidth = outlineWidth / 2;
        cvsCtx.stroke();
    }

    cvsCtx.restore();
}

draw();

function draw() {
    if (Date.now() - lastTime > 16) {
        lastTime = Date.now();

        cvsCtx.clearRect(0, 0, cvsSize, cvsSize);
        // percent = 0.5;
        percent = (percent + 0.00390625) % 1;

        renderWave(percent);
        renderOutline(percent);
        renderText(percent);

        drawRoundedRect(cvsQuarterSize, cvsQuarterSize, cvsHalfSize, cvsHalfSize, cvsQuarterSize * percent, percent);
    }
    requestAnimationFrame(draw);
}

function renderOutline(per) {
    cvsCtx.save();
    cvsCtx.beginPath();
    cvsCtx.arc(cvsHalfSize, cvsHalfSize, circleRadius, -PI_1_2, PI_2 * per - PI_1_2, false);
    cvsCtx.strokeStyle = '#70dfc0';
    cvsCtx.lineWidth = outlineWidth;
    cvsCtx.stroke();
    cvsCtx.restore();
}

function renderWave(per) {
    cvsCtx.save();
    setCircleClip();
    drawWave(per);
    cvsCtx.restore();
}

function setCircleClip() {
    cvsCtx.beginPath();
    cvsCtx.arc(cvsHalfSize, cvsHalfSize, clipCircleRadius, 0, PI_2, false);
    cvsCtx.clip();
}

function drawWave(per) {
    let p = 1 - per,
        fi = lastTime * φ;
    cvsCtx.beginPath();
    cvsCtx.moveTo(outlineWidth, p ** 0.5 * A * Math.sin(fi) + p * clipCircleDiameter + outlineWidth);
    for (let i = 1; i <= clipCircleDiameter; i++) {
        cvsCtx.lineTo(i + outlineWidth, p ** 0.5 * A * Math.sin(ω * i + fi) + p * clipCircleDiameter + outlineWidth);
    }
    cvsCtx.lineTo(waveBottomRight, waveBottomRight);
    cvsCtx.lineTo(outlineWidth, waveBottomRight);
    cvsCtx.closePath();
    let fill = cvsCtx.createLinearGradient(outlineWidth, outlineWidth, outlineWidth, waveBottomRight);
    fill.addColorStop(0, 'rgba(10, 12, 32, 0.5)');
    fill.addColorStop(0.5, `rgba(${44 - per * 34}, ${75 - per * 63}, ${80 - per * 48}, 0.5)`);
    fill.addColorStop(1, `rgba(${77 - per * 67}, ${146 - per * 134}, ${134 - per * 102}, 0.5)`);
    cvsCtx.fillStyle = fill;
    cvsCtx.fill();
}

function renderText(per) {
    cvsCtx.save();
    cvsCtx.textAlign = 'center';
    cvsCtx.textBaseline = 'middle';
    cvsCtx.font = cvsSize / 8 + 'px impact';
    cvsCtx.fillStyle = '#70dfc0';
    cvsCtx.fillText(Math.floor(per * 100) + '%', cvsHalfSize, cvsHalfSize);
    cvsCtx.restore();
}

window.onresize = function () {
    cvsSize = $canvas.offsetWidth;
    cvsHalfSize = cvsSize / 2;
    cvsQuarterSize = cvsSize / 4;
    outlineWidth = cvsSize / 20;
    circleRadius = cvsHalfSize - outlineWidth / 2;
    A = circleRadius / 6;
    ω = Math.PI / circleRadius;
    $canvas.width = $canvas.height = cvsSize;
};

function between01(n) {
    return Math.min(Math.max(n, 0), 1);
}

document.querySelector('#staticRoundedRect').addEventListener('input', function () {
    isStaticRoundedRect = this.checked;
});

document.querySelector('#dynamicRoundedRect').addEventListener('input', function () {
    isDynamicRoundedRect = this.checked;
});

document.querySelector('#dynamicInsetRoundedRect').addEventListener('input', function () {
    isDynamicInsetRoundedRect = this.checked;
});
