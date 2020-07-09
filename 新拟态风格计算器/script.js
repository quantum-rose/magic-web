import 'https://cdn.staticfile.org/vue/2.6.11/vue.js';

new Vue({
    el: '#calculator',
    data: {
        expression: '0',
        isCalculated: false,
    },
    computed: {
        result() {
            return this.expression === 'Infinity'
                ? '不能除以0'
                : this.expression.replace(/\d+(\.\d*)?/g, match =>
                      match.replace(/(?<=^\d+)(?=(\d{3})+$|(\d{3})+\.)/g, ',')
                  );
        },
    },
    methods: {
        clear() {
            this.expression = '0';
        },
        toggleSign() {
            if (/\d/.test(this.expression.slice(-1))) {
                this.expression = this.expression.replace(/\d+(\.\d*)?$/g, match => (match * -1).toFixed(10) - 0 + '');
            }
        },
        percentage() {
            if (/\d/.test(this.expression.slice(-1))) {
                this.expression = this.expression.replace(
                    /\d+(\.\d*)?$/g,
                    match => (match * 0.01).toFixed(10) - 0 + ''
                );
            }
        },
        append(character) {
            this.expression === 'Infinity' && this.clear();
            if (character === 0) {
                if (!/^0$|[+\-×÷]0$/.test(this.expression)) {
                    this.expression += '0';
                }
            } else if (/[1-9]/.test(character)) {
                if (this.expression === '0' || this.isCalculated) {
                    this.expression = character + '';
                    this.isCalculated = false;
                } else {
                    this.expression += character;
                }
            } else if (/[+\-×÷]/.test(character)) {
                this.isCalculated = false;
                if (/[+\-×÷]/.test(this.expression.slice(-1))) {
                    this.expression = this.expression.slice(0, -1) + character;
                } else {
                    this.expression += character;
                }
            } else {
                if (/^\d+$|[+\-×÷]\d+$/.test(this.expression)) {
                    this.isCalculated = false;
                    this.expression += '.';
                } else if (/[+\-×÷]/.test(this.expression.slice(-1))) {
                    this.expression += '0.';
                }
            }
        },
        calculate() {
            if (/[\d.]/.test(this.expression.slice(-1))) {
                this.expression = eval(this.expression.replace(/×/g, '*').replace(/÷/g, '/')).toFixed(10) - 0 + '';
                this.isCalculated = true;
            }
        },
    },
});
