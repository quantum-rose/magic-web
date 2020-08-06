const initialSlide = getQueryString('index'),
    mySwiper = new Swiper('.swiper-container', {
        initialSlide: isNaN(initialSlide) ? 0 : initialSlide,
        direction: 'vertical',
        mousewheel: true,
        pagination: {
            el: '.swiper-pagination',
        },
    });

function getQueryString(key) {
    const result = window.location.search.substring(1).match(new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i'));
    return result !== null ? decodeURI(result[2]) : null;
}
