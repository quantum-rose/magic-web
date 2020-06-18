const initialSlide = getQueryString('index'),
    mySwiper = new Swiper('.swiper-container', {
        initialSlide: isNaN(initialSlide) ? 0 : initialSlide,
        direction: 'vertical',
        mousewheel: true,
        pagination: {
            el: '.swiper-pagination',
        },
    }),
    $gaussianBlur = document.querySelector('#GaussianBlur');

let stdDeviation = 0;
requestAnimationFrame(function draw() {
    stdDeviation = (stdDeviation + 0.0078125) % 1;
    $gaussianBlur.firstElementChild.setAttribute('stdDeviation', stdDeviation ** 2 * 6);
    requestAnimationFrame(draw);
});

function getQueryString(key) {
    const result = window.location.search.substring(1).match(new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i'));
    return result !== null ? decodeURI(result[2]) : null;
}
