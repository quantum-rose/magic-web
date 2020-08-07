const $pupils = document.querySelectorAll('.pupil');
let w = document.body.offsetWidth;
let h = document.body.offsetHeight;
let cx = w / 2;
let cy = h - w * 0.2 * 0.9;
let translateX = 0;
let translateY = 0;

window.addEventListener('resize', function () {
    w = document.body.offsetWidth;
    h = document.body.offsetHeight;
    cx = w / 2;
    cy = h - w * 0.18;
});

window.addEventListener('mousemove', function (e) {
    translateX = ((e.clientX - cx) / (w / 2)) * 25;
    translateY = ((e.clientY - cy) / (h / 2)) * 25;
    $pupils.forEach(elem => {
        elem.style.transform = `translate3d(${translateX}%, ${translateY}%, 0)`;
    });
});
