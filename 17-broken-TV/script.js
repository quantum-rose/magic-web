const $cvs = document.querySelector('#cvs');
const cvsCtx = $cvs.getContext('2d');

/**
 * 生成一个介于 start 和 end 之间的整数，闭区间
 */
function intRandom(start, end) {
    if (Object.prototype.toString.call(start) !== '[object Number]') throw new TypeError(`${start} is not a number`);
    if (Object.prototype.toString.call(end) !== '[object Number]') throw new TypeError(`${end} is not a number`);
    start = Math.floor(start);
    end = Math.floor(end) + 1;
    return Math.round(Math.random() * (end - start) + start);
}

let w = ($cvs.width = $cvs.offsetWidth * window.devicePixelRatio);
let h = ($cvs.height = $cvs.offsetHeight * window.devicePixelRatio);
let fontSize = w / 4;
let textOffset = w / 100;
let stripeOffset = 0;
let cutLine;

window.addEventListener('resize', function () {
    w = $cvs.width = $cvs.offsetWidth * window.devicePixelRatio;
    h = $cvs.height = $cvs.offsetHeight * window.devicePixelRatio;
    fontSize = w / 4;
    textOffset = w / 100;
});

function createCutLine() {
    cutLine = [0, h];
    for (let i = 0; i < 6; i++) {
        cutLine.push(intRandom(cutLine[0], cutLine[cutLine.length - 1]));
    }
    cutLine.sort((a, b) => a - b);
}

function drawNoise() {
    const imageData = cvsCtx.createImageData(w, h);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i + 1] = data[i + 2] = intRandom(0, 255);
        data[i + 3] = 255;
    }
    cvsCtx.putImageData(imageData, 0, 0);
}

function drawText() {
    cvsCtx.fillStyle = '#000000';
    cvsCtx.fillRect(0, 0, w, h);

    cvsCtx.fillStyle = '#ffffff';
    cvsCtx.font = `bold ${fontSize}px Helvetica`;
    cvsCtx.textAlign = 'center';
    cvsCtx.textBaseline = 'middle';

    createCutLine();
    for (let i = 0; i < cutLine.length - 1; i++) {
        cvsCtx.save();
        cvsCtx.beginPath();
        cvsCtx.rect(0, cutLine[i], w, cutLine[i + 1] - cutLine[i]);
        cvsCtx.clip();
        cvsCtx.fillText('NOISE', w / 2 + intRandom(-textOffset, textOffset), h / 2);
        cvsCtx.restore();
    }
}

function drawStripe() {
    cvsCtx.beginPath();
    const f = cvsCtx.createLinearGradient(0, -stripeOffset, 0, 2 * h - stripeOffset);
    for (let i = 0; i < 128; i += 2) {
        f.addColorStop(i / 128, 'rgba(255, 255, 255, 0.1)');
        f.addColorStop((i + 1) / 128, 'rgba(255, 255, 255, 0)');
    }
    cvsCtx.fillStyle = f;
    cvsCtx.fillRect(0, 0, w, h);
    stripeOffset = (stripeOffset + h / 128) % h;
}

let lastTime = 0;
let r = intRandom(1, 3);
requestAnimationFrame(function draw() {
    if (Date.now() - lastTime > 40) {
        lastTime = Date.now();
        cvsCtx.clearRect(0, 0, w, h);
        if (Math.floor(lastTime / r / 1000) % 2 === 0) {
            r = intRandom(1, 3);
            drawNoise();
        } else {
            drawText();
        }
        drawStripe();
    }
    requestAnimationFrame(draw);
});
