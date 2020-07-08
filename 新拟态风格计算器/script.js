import 'https://cdn.staticfile.org/vue/2.6.11/vue.js';

new Vue({
    el: '#calculator',
    data: {
        result: '0',
    },
    methods: {
        clear() {
            this.result = '0';
        },
        toggleSign() {
            this.result += '* -1';
            this.calculate();
        },
        percentage() {},
        append(character) {
            let lastWord = this.result.slice(-1);
            if (/[0-9]/.test(character)) {
                if (lastWord !== '0') {
                    this.result += character;
                } else {
                    this.result = '' + character;
                }
            } else {
                if (/\+|-|×|÷|\./.test(lastWord)) {
                    if (lastWord !== character) {
                        this.result = this.result.slice(0, -1) + character;
                    }
                } else {
                    this.result += character;
                }
            }
        },
        calculate() {
            this.result = new Function(`return ${this.result.replace('×', '*').replace('÷', '/')}`)() + '';
        },
    },
});
