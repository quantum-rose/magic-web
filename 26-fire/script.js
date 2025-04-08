function main() {
    var $fireBox = document.querySelector('#fireBox');
    var fireNum = Math.random() * 8 + 8;

    for (var i = 0; i < fireNum; i++) {
        var baseX = Math.random() * $fireBox.offsetWidth;
        var $fire = document.createElement('div');
        $fire.classList.add('fire');
        $fire.style.transform = 'translateX('.concat(baseX, 'px)');
        $fireBox.append($fire);
        var particleNum = Math.random() * 40 + 40;

        for (var j = 0; j < particleNum; j++) {
            var $particle = document.createElement('div');
            $particle.classList.add('particle');
            $particle.style.animationDelay = Math.random() * 2 - 1 + 's';
            var randomOffset = Math.random() < 0.3 ? Math.random() * 200 - 100 : Math.random() * 100 - 50;
            $particle.style.left = randomOffset + '%';
            $fire.append($particle);
            $particle.addEventListener('animationiteration', function () {
                var randomOffset = Math.random() < 0.3 ? Math.random() * 200 - 100 : Math.random() * 100 - 50;
                this.style.left = randomOffset + '%';
            });
        }
    }
}

main();
