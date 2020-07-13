const cvs = document.querySelector('#cvs'),
    cvsCtx = cvs.getContext('2d'),
    $waveImg = document.querySelector('#wave-img');

function drawWaveImg(cvsCtx, waveLength) {
    cvsCtx.save();
    cvsCtx.translate(306, 306);
}

drawWaveImg(cvsCtx);

cvsCtx.beginPath();
cvsCtx.lineWidth = 256;
var f = cvsCtx.createLinearGradient(256, 0, 0, 256);
f.addColorStop(0, '#0f0');
f.addColorStop(1, '#f00');
cvsCtx.strokeStyle = f;
cvsCtx.arc(0, 0, 128, 0, Math.PI / 2, false);
cvsCtx.stroke();

cvsCtx.beginPath();
cvsCtx.lineWidth = 256;
var f = cvsCtx.createLinearGradient(0, 256, -256, 0);
f.addColorStop(0, '#f00');
f.addColorStop(1, '#0f0');
cvsCtx.strokeStyle = f;
cvsCtx.arc(0, 0, 128, Math.PI / 2, Math.PI, false);
cvsCtx.stroke();

cvsCtx.beginPath();
cvsCtx.lineWidth = 256;
var f = cvsCtx.createLinearGradient(-256, 0, 0, -256);
f.addColorStop(0, '#0f0');
f.addColorStop(1, '#f00');
cvsCtx.strokeStyle = f;
cvsCtx.arc(0, 0, 128, Math.PI, Math.PI * 1.5, false);
cvsCtx.stroke();

cvsCtx.beginPath();
cvsCtx.lineWidth = 256;
var f = cvsCtx.createLinearGradient(0, -256, 256, 0);
f.addColorStop(0, '#f00');
f.addColorStop(1, '#0f0');
cvsCtx.strokeStyle = f;
cvsCtx.arc(0, 0, 128, Math.PI * 1.5, Math.PI * 2, false);
cvsCtx.stroke();

const o = 150;
var f = cvsCtx.createRadialGradient(0, 0, 100, 0, 0, 250);
f.addColorStop(0, 'rgba(127,127,127,1)');
f.addColorStop(17 / o, 'rgba(115,115,115,.8)');
f.addColorStop(25 / o, 'rgba(115,115,115,0.1)');
f.addColorStop(28 / o, 'rgba(115,115,115,0.1)');
f.addColorStop(37 / o, 'rgba(115,104,104,.8)');
f.addColorStop(43 / o, 'rgba(115,104,104,1)');
f.addColorStop(44 / o, 'rgba(127,127,127,1)');
f.addColorStop(50 / o, 'rgba(127,127,127,.6)');
f.addColorStop(54 / o, 'rgba(127,127,127,0)');
f.addColorStop(61 / o, 'rgba(0,0,0,0)');
f.addColorStop(67 / o, 'rgba(0,0,0,1)');
f.addColorStop(78 / o, 'rgba(0,0,0,1)');
f.addColorStop(88 / o, 'rgba(0,0,0,0)');
f.addColorStop(100 / o, 'rgba(0,0,0,0)');
f.addColorStop(108 / o, 'rgba(0,0,0,1)');
f.addColorStop(117 / o, 'rgba(0,0,0,1)');
f.addColorStop(136 / o, 'rgba(0,0,0,0)');
f.addColorStop(1, 'rgba(0,0,0,0)');
cvsCtx.beginPath();
cvsCtx.arc(0, 0, 256, 0, Math.PI * 2);
cvsCtx.fillStyle = f;
cvsCtx.fill();

cvsCtx.restore();

$waveImg.setAttribute('xlink:href', cvs.toDataURL());
