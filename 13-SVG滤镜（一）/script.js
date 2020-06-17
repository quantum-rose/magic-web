const mySwiper = new Swiper('.swiper-container', {
    initialSlide: 2,
    direction: 'vertical',
    mousewheel: true,
    pagination: {
        el: '.swiper-pagination',
    },
});

const $gaussianBlur = document.querySelector('#GaussianBlur');

let stdDeviation = 0;
requestAnimationFrame(function draw() {
    stdDeviation = (stdDeviation + 0.0078125) % 1;
    $gaussianBlur.firstElementChild.setAttribute('stdDeviation', stdDeviation ** 2 * 6);
    requestAnimationFrame(draw);
});
