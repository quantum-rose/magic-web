const getQueryString = function (key) {
    const result = window.location.search.substring(1).match(new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i'));
    return result !== null ? decodeURI(result[2]) : null;
};
const initialSlide = getQueryString('index');

Vue.use(window.VueAwesomeSwiper);

new Vue({
    el: '#app',
    data: {
        swiperOptions: {
            initialSlide: isNaN(initialSlide) ? 0 : initialSlide,
            direction: 'vertical',
            mousewheel: true,
            pagination: {
                el: '.swiper-pagination',
            },
            resistance: true,
            resistanceRatio: 0,
            noSwiping: true,
        },
        filterRange: [
            {
                label: '高斯模糊',
                value: 0,
                mix: 0,
                max: 20,
                step: 1,
                code: 'blur',
                unit: 'px',
            },
            {
                label: '亮度',
                value: 1,
                mix: 0,
                max: 2,
                step: 0.01,
                code: 'brightness',
                unit: '',
            },
            {
                label: '对比度',
                value: 1,
                mix: 0,
                max: 6,
                step: 0.01,
                code: 'contrast',
                unit: '',
            },
            {
                label: '灰度',
                value: 0,
                mix: 0,
                max: 1,
                step: 0.01,
                code: 'grayscale',
                unit: '',
            },
            {
                label: '色相旋转',
                value: 0,
                mix: 0,
                max: 360,
                step: 1,
                code: 'hue-rotate',
                unit: 'deg',
            },
            {
                label: '反色',
                value: 0,
                mix: 0,
                max: 1,
                step: 0.01,
                code: 'invert',
                unit: '',
            },
            {
                label: '透明度',
                value: 1,
                mix: 0,
                max: 1,
                step: 0.01,
                code: 'opacity',
                unit: '',
            },
            {
                label: '饱和度',
                value: 1,
                mix: 0,
                max: 20,
                step: 0.01,
                code: 'saturate',
                unit: '',
            },
            {
                label: '泛黄',
                value: 0,
                mix: 0,
                max: 1,
                step: 0.01,
                code: 'sepia',
                unit: '',
            },
        ],
        dropShadow: { x: 0, y: 0, blur: 0, color: '#ffffff' },
        blendModeRadio: [
            {
                label: '正常',
                value: 'normal',
            },
            {
                label: '正片叠底',
                value: 'multiply',
            },
            {
                label: '滤色',
                value: 'screen',
            },
            {
                label: '叠加',
                value: 'overlay',
            },
            {
                label: '变暗',
                value: 'darken',
            },
            {
                label: '变亮',
                value: 'lighten',
            },
            {
                label: '颜色减淡',
                value: 'color-dodge',
            },
            {
                label: '颜色加深',
                value: 'color-burn',
            },
            {
                label: '强光',
                value: 'hard-light',
            },
            {
                label: '柔光',
                value: 'soft-light',
            },
            {
                label: '差值',
                value: 'difference',
            },
            {
                label: '排除',
                value: 'exclusion',
            },
            {
                label: '色相',
                value: 'hue',
            },
            {
                label: '饱和度',
                value: 'saturation',
            },
            {
                label: '颜色',
                value: 'color',
            },
            {
                label: '明度',
                value: 'luminosity',
            },
        ],
        blendMode: 'normal',
    },
    computed: {
        filterCode() {
            return this.filterRange.map(item => item.code + '(' + item.value + item.unit + ')');
        },
        filterStyle() {
            const { x, y, blur, color } = this.dropShadow;
            return this.filterCode.join(' ') + ` drop-shadow(${x}px ${y}px ${blur}px ${color})`;
        },
    },
    methods: {},
});
