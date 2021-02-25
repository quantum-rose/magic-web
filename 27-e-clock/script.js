class View {
    static #numMap = {
        0: '.top.left,.top.center,.top.right,.bottom.right,.bottom.center,.bottom.left',
        1: '.top.right,.bottom.right',
        2: '.top.center,.top.right,.middle.center,.bottom.left,.bottom.center',
        3: '.top.center,.top.right,.middle.center,.bottom.right,.bottom.center',
        4: '.top.left,.top.right,.middle.center,.bottom.right',
        5: '.top.left,.top.center,.middle.center,.bottom.right,.bottom.center',
        6: '.top.left,.top.center,.middle.center,.bottom.right,.bottom.center,.bottom.left',
        7: '.top.center,.top.right,.bottom.right',
        8: '.top.left,.top.center,.top.right,.middle.center,.bottom.right,.bottom.center,.bottom.left',
        9: '.top.left,.top.center,.top.right,.middle.center,.bottom.right,.bottom.center',
    };

    $elm = null;
    $weeks = null;
    $numbers = null;
    $dots = null;
    $amPm = null;

    constructor() {
        this.$elm = document.querySelector('.e-clock');
        this.$weeks = this.$elm.querySelectorAll('.day');
        this.$numbers = this.$elm.querySelectorAll('.number');
        this.$dots = this.$elm.querySelectorAll('.dot');
        this.$amPm = this.$elm.querySelector('.am-pm');
    }

    /**
     * 冒号闪烁
     * @param {Boolean} flag
     */
    blinkDot(flag) {
        this.$dots.forEach(elm => {
            if (flag) {
                elm.classList.add('blink');
            } else {
                elm.classList.remove('blink');
            }
        });
    }

    /**
     * 显示星期
     * @param {Number} day 星期，星期日为0
     */
    renderWeek(day) {
        this.$weeks.forEach(($item, i) => {
            if (i === day) {
                $item.classList.add('active');
            } else {
                $item.classList.remove('active');
            }
        });
    }

    /**
     * 显示数字
     * @param {String} str 数字字符串，至多6位，多余的会被忽略
     */
    renderNum(str) {
        if (typeof str !== 'string') {
            str = str.toString();
        }

        for (let i = 0; i < str.length && i < 6; i++) {
            this.$numbers[i].querySelectorAll('.branch.active').forEach(elm => elm.classList.remove('active'));
            this.$numbers[i].querySelectorAll(View.#numMap[str[i]]).forEach(elm => elm.classList.add('active'));
        }
    }

    /**
     * 显示AM或PM
     * @param {Number} H 24小时制小时数
     */
    renderAmPm(H) {
        this.$amPm.innerText = H > 12 ? 'PM' : 'AM';
    }
}

class State {
    view = null;
    model = null;

    constructor(view, model) {
        console.log(view, model);
        this.model = model;
        this.view = view;
    }
}

class StateTime extends State {
    constructor(view, model) {
        super(view, model);
    }

    update() {
        this.view.renderWeek(this.model.day);
        this.view.renderNum(this.model.timeNum);
        this.view.renderAmPm(this.model.H);
    }
}

class Model {
    view = null;

    #stateMap = {
        0: null,
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null,
    };
    #state = 0;
    get state() {
        return this.#stateMap[this.#state];
    }

    #date = null;
    get date() {
        return this.#date;
    }
    set date(v) {
        if (!(v instanceof Date)) {
            v = new Date(v);
        }
        if (!this.#isValidDate(v)) {
            return;
        }
        this.#date = v;
    }

    #isValidDate = date => {
        return date instanceof Date && !isNaN(date.getTime());
    };

    hour12 = true;

    get day() {
        return this.date.getDay();
    }
    get H() {
        return this.date.getHours();
    }
    get HH() {
        return this.H.toString().padStart(2, '0');
    }
    get h() {
        return ((this.H - 1) % 12) + 1;
    }
    get hh() {
        return this.h.toString().padStart(2, '0');
    }
    get m() {
        return this.date.getMinutes();
    }
    get mm() {
        return this.m.toString().padStart(2, '0');
    }
    get s() {
        return this.date.getSeconds();
    }
    get ss() {
        return this.s.toString().padStart(2, '0');
    }
    get timeNum() {
        return (this.hour12 ? this.hh : this.HH) + this.mm + this.ss;
    }

    #alarmTime = '000000';
    set alarmTime(v) {
        this.#alarmTime = v;
    }
    get isTimeUp() {
        return this.#alarmTime === this.timeNum;
    }

    constructor(view) {
        this.view = view;
        this.#stateMap[0] = new StateTime(this.view, this);
    }
}

class Clock {
    view = null;
    model = null;

    constructor() {
        this.view = new View();
        this.model = new Model(this.view);

        setInterval(() => {
            this.model.date = new Date();
            this.model.state.update();
        }, 1000);
    }
}

const clock = new Clock();
