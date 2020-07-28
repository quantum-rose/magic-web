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
            noSwipingSelector: 'input',
        },
        blur: 0,
        brightness: 1,
        contrast: 1,
        dropShadow: { x: 0, y: 0, blur: 0, color: '#000000' },
    },
    computed: {
        filterStyle() {
            return `blur(${this.blur}px) brightness(${this.brightness}) contrast(${this.contrast})`;
        },
    },
});
