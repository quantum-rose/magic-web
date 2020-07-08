const cvs = document.querySelector('#cvs'),
    cvsCtx = cvs.getContext('2d');

cvsCtx.save();
cvsCtx.translate(256, 256);

cvsCtx.beginPath();
cvsCtx.lineWidth = 20;
var f = cvsCtx.createLinearGradient(256, 0, 0, 256);
f.addColorStop(0, '#f00');
f.addColorStop(1, '#0f0');
cvsCtx.strokeStyle = f;
cvsCtx.arc(0, 0, 200, 0, Math.PI / 2, false);
cvsCtx.stroke();

cvsCtx.beginPath();
cvsCtx.lineWidth = 20;
var f = cvsCtx.createLinearGradient(0, 256, -256, 0);
f.addColorStop(0, '#0f0');
f.addColorStop(1, '#f00');
cvsCtx.strokeStyle = f;
cvsCtx.arc(0, 0, 200, Math.PI / 2, Math.PI, false);
cvsCtx.stroke();

cvsCtx.beginPath();
cvsCtx.lineWidth = 20;
var f = cvsCtx.createLinearGradient(-256, 0, 0, -256);
f.addColorStop(0, '#f00');
f.addColorStop(1, '#0f0');
cvsCtx.strokeStyle = f;
cvsCtx.arc(0, 0, 200, Math.PI, Math.PI * 1.5, false);
cvsCtx.stroke();

cvsCtx.beginPath();
cvsCtx.lineWidth = 20;
var f = cvsCtx.createLinearGradient(0, -256, 256, 0);
f.addColorStop(0, '#0f0');
f.addColorStop(1, '#f00');
cvsCtx.strokeStyle = f;
cvsCtx.arc(0, 0, 200, Math.PI * 1.5, Math.PI * 2, false);
cvsCtx.stroke();

cvsCtx.restore();
