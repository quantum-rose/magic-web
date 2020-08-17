const cvs = document.querySelector('#cvs');
cvs.width = cvs.offsetWidth * window.devicePixelRatio;
cvs.height = cvs.offsetHeight * window.devicePixelRatio;
window.addEventListener('resize', function () {
    cvs.width = cvs.offsetWidth * window.devicePixelRatio;
    cvs.height = cvs.offsetHeight * window.devicePixelRatio;
});

class ParticleText {
    particles = [];
    text = '';
    textCvs = null; // 文本画布
    textData = null; // 文本画布的imageData

    constructor(cvs, text = '23:59:59') {
        this.cvs = cvs;
        this.cvsCtx = cvs.getContext('2d');

        this.textCvs = document.createElement('canvas');
        this.textCvs.width = cvs.width / 6;
        this.textCvs.height = cvs.height / 6;
        this.textCvsCtx = this.textCvs.getContext('2d');

        this._initParticles();
        this.updateText(text);
        this._onEnterFrame();
    }

    _initParticles() {
        const { width, height } = this.textCvs;
        for (let i = 0; i < (width * height) / 10; i++) {
            this.particles[i] = {
                x: Math.floor(width * Math.random()) * 6 + 3,
                y: Math.floor(height * Math.random()) * 6 + 3,
                fromX: 0,
                fromY: 0,
                toX: 0,
                toY: 0,
                color: `hsl(180, 100%, ${Math.random() * 50 + 25}%)`,
            };
        }
    }

    /**
     * 更新要显示的文字
     * @param {String} text 显示的文字
     */
    updateText(text) {
        if (text !== this.text) {
            this.text = text;

            const { particles, textCvsCtx: cvsCtx } = this;
            const { width, height } = this.textCvs;

            cvsCtx.clearRect(0, 0, width, height);
            cvsCtx.fillStyle = '#000000';
            cvsCtx.font = `bold ${width / 6}px Helvetica`;
            cvsCtx.textAlign = 'center';
            cvsCtx.textBaseline = 'middle';
            cvsCtx.fillText(text, width / 2, height / 2);

            const textData = (this.textData = cvsCtx.getImageData(0, 0, width, height));

            for (let i = 0, j = Date.now() % particles.length, k = 0; k < particles.length; i += 4) {
                if (i < textData.data.length) {
                    if (textData.data[i + 3] > 127) {
                        particles[j].fromX = particles[j].x;
                        particles[j].fromY = particles[j].y;
                        particles[j].toX = ((i / 4) % textData.width) * 6 + 3;
                        particles[j].toY = Math.floor(i / 4 / textData.width) * 6 + 3;
                        j = (j + 1) % particles.length;
                        k++;
                    }
                } else {
                    particles[j].fromX = particles[j].x;
                    particles[j].fromY = particles[j].y;
                    particles[j].toX = Math.floor(width * Math.random()) * 6 + 3;
                    particles[j].toY = Math.floor(height * Math.random()) * 6 + 3;
                    j = (j + 1) % particles.length;
                    k++;
                }
            }

            this.p = 0;
        }
    }

    p = 0;

    _onEnterFrame() {
        const { particles, cvs, cvsCtx } = this;

        cvsCtx.clearRect(0, 0, cvs.width, cvs.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].x = (particles[i].toX - particles[i].fromX) * this.p + particles[i].fromX;
            particles[i].y = (particles[i].toY - particles[i].fromY) * this.p + particles[i].fromY;

            cvsCtx.beginPath();
            cvsCtx.fillStyle = particles[i].color;
            cvsCtx.arc(particles[i].x, particles[i].y, 2, 0, Math.PI * 2, false);
            cvsCtx.fill();
        }

        this.p += 0.08;
        if (this.p > 1) {
            this.p = 1;
        }

        requestAnimationFrame(this._onEnterFrame.bind(this));
    }
}

const particleText = new ParticleText(cvs, new Date().toTimeString().match(/^.*(?=GMT)/g)[0]);

requestAnimationFrame(function draw() {
    if (particleText.text !== new Date().toTimeString().match(/^.*(?=GMT)/g)[0]) {
        particleText.updateText(new Date().toTimeString().match(/^.*(?=GMT)/g)[0]);
    }
    requestAnimationFrame(draw);
});
