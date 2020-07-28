Vue.use(window.VueAwesomeSwiper);

new Vue({
    el: '#app',
    data: {
        swiperOptions: {
            direction: 'vertical', // 垂直切换选项
            mousewheel: true,
            pagination: {
                el: '.swiper-pagination',
            },
            resistance: true,
            resistanceRatio: 0,
            noSwiping: true,
        },
        blur: 0,
        brightness: 1,
        contrast: 1,
        dropShadow: { x: 0, y: 0, blur: 0, color: '#ffffff' },
        grayscale: 0,
        hueRotate: 0,
        invert: 0,
        opacity: 1,
        saturate: 1,
        sepia: 0,
    },
    computed: {
        filterStyle() {
            const {
                blur,
                brightness,
                contrast,
                dropShadow,
                grayscale,
                hueRotate,
                invert,
                opacity,
                saturate,
                sepia,
            } = this;
            return `blur(${blur}px) brightness(${brightness}) contrast(${contrast}) drop-shadow(${dropShadow.x}px ${dropShadow.y}px ${dropShadow.blur}px ${dropShadow.color}) grayscale(${grayscale}) hue-rotate(${hueRotate}deg) invert(${invert}) opacity(${opacity}) saturate(${saturate}) sepia(${sepia})`;
        },
    },
});
