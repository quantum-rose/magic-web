import Vue from 'https://cdn.staticfile.org/vue/2.6.11/vue.esm.browser.js';

new Vue({
    el: '#calculator',
    data: {
        expression: '0',
        isCalculated: false,
    },
    computed: {
        result() {
            return this.error
                ? '不能除以0'
                : this.expression.replace(/\d+(\.\d*)?/g, match =>
                      match.replace(/(?<=^\d+)(?=(\d{3})+(\.\d*)?$)/g, ',')
                  );
        },
        error() {
            return /Infinity|NaN/.test(this.expression);
        },
    },
    methods: {
        clear() {
            this.expression = '0';
        },
        toggleSign() {
            if (/\d/.test(this.expression.slice(-1))) {
                this.expression = this.expression
                    .replace(/((?<=[×÷])|\+|-|^)\d+(\.\d*)?$|[+\-]?\d(\.\d+)?e-?\d+$/, match =>
                        this.computer(match + '*-1').replace(/^(?=\d)/, '+')
                    )
                    .replace(/(^|(?<=[×÷]))\+/, '');
            }
        },
        percentage() {
            if (/\d/.test(this.expression.slice(-1))) {
                this.expression = this.expression.replace(/(?<=[+\-×÷]|^)\d+(\.\d*)?$|\d(\.\d+)?e-?\d+$/, match =>
                    this.computer(match + '*0.01')
                );
            }
        },
        append(character) {
            this.error && this.clear();
            if (character === 0) {
                if (!/(^|[+\-×÷])0$/.test(this.expression)) {
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
            } else if (character === '.') {
                if (/(^|[+\-×÷])\d+$/.test(this.expression)) {
                    this.isCalculated = false;
                    this.expression += '.';
                } else if (/[+\-×÷]/.test(this.expression.slice(-1))) {
                    this.expression += '0.';
                }
            }
        },
        calculate() {
            if (/[\d.]/.test(this.expression.slice(-1))) {
                this.expression = this.computer(this.expression);
                this.isCalculated = true;
            }
        },
        computer(expression) {
            return new Function(`return ${expression.replace(/×/g, '*').replace(/÷/g, '/')}`)().toFixed(10) - 0 + '';
        },
    },
});
