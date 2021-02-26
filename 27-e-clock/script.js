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
    $screen = null;
    $weeks = null;
    $alarm = null;
    $numbers = null;
    $dots = null;
    $amPm = null;
    $btnCmd = null;
    $btnUp = null;
    $btnDown = null;

    constructor() {
        this.$elm = document.querySelector('.e-clock');
        this.$screen = this.$elm.querySelector('.screen');
        this.$weeks = this.$elm.querySelectorAll('.day');
        this.$alarm = this.$elm.querySelector('.icon-clock');
        this.$numbers = this.$elm.querySelectorAll('.number');
        this.$dots = this.$elm.querySelectorAll('.dot');
        this.$amPm = this.$elm.querySelector('.am-pm');
        this.$btnCmd = this.$elm.querySelector('.btn-cmd');
        this.$btnUp = this.$elm.querySelector('.btn-up');
        this.$btnDown = this.$elm.querySelector('.btn-down');
    }

    bindEvent({ onCmdClick, onUpClick, onDownClick }) {
        this.$btnCmd.addEventListener('click', onCmdClick);
        this.$btnUp.addEventListener('click', onUpClick);
        this.$btnDown.addEventListener('click', onDownClick);
    }

    /**
     * 显示星期
     * @param {Number} day 星期，星期日为0
     */
    #day = -1;
    renderWeek(day) {
        if (day !== this.#day) {
            this.#day = day;
            this.$weeks.forEach(($item, i) => {
                if (i === day) {
                    $item.classList.add('active');
                } else {
                    $item.classList.remove('active');
                }
            });
        }
    }

    /**
     * 显示闹钟图标
     * @param {Boolean} flag
     */
    #alarm = false;
    renderAlarm(flag) {
        if (flag !== this.#alarm) {
            this.#alarm = flag;
            if (flag) {
                this.$alarm.classList.add('active');
            } else {
                this.$alarm.classList.remove('active');
            }
        }
    }

    /**
     * 显示数字
     * @param {String} numStr 数字字符串，至多6位，多余的会被忽略
     */
    #numStr = '';
    renderNum(numStr) {
        if (numStr !== this.#numStr) {
            this.#numStr = numStr;
            for (let i = 0; i < numStr.length && i < 6; i++) {
                this.$numbers[i].querySelectorAll('.branch.active').forEach(elm => elm.classList.remove('active'));
                this.$numbers[i].querySelectorAll(View.#numMap[numStr[i]]).forEach(elm => elm.classList.add('active'));
            }
        }
    }

    /**
     * 显示AM或PM
     * @param {String} amPm
     */
    #amPm = '';
    renderAmPm(amPm) {
        if (amPm !== this.#amPm) {
            this.#amPm = amPm;
            this.$amPm.innerText = amPm;
        }
    }

    /**
     * 冒号闪烁
     * @param {Boolean} flag
     */
    #dotBlink = false;
    blinkDot(flag) {
        if (flag !== this.#dotBlink) {
            this.#dotBlink = flag;
            this.$dots.forEach(elm => {
                if (flag) {
                    elm.classList.add('blink');
                } else {
                    elm.classList.remove('blink');
                }
            });
        }
    }

    /**
     * 数字闪烁
     * @param {Number} startIdx 起始索引，包含
     * @param {Number} endIdx 结束索引，不包含
     */
    #numBlinkStartIdx = 0;
    #numBlinkEndIdx = 0;
    blinkNum([startIdx, endIdx]) {
        this.$numbers.forEach((elm, i) => {
            if (
                this.#checkRange(i, this.#numBlinkStartIdx, this.#numBlinkEndIdx) &&
                !this.#checkRange(i, startIdx, endIdx)
            ) {
                elm.classList.remove('blink');
            } else if (
                !this.#checkRange(i, this.#numBlinkStartIdx, this.#numBlinkEndIdx) &&
                this.#checkRange(i, startIdx, endIdx)
            ) {
                elm.classList.add('blink');
            }
        });
        this.#numBlinkStartIdx = startIdx;
        this.#numBlinkEndIdx = endIdx;
    }
    #checkRange = (target, startIdx, endIdx) => {
        return target >= startIdx && target < endIdx;
    };

    /**
     * 闹钟图标闪烁
     * @param {Boolean} flag
     */
    #alarmBlink = false;
    blinkAlarm(flag) {
        if (flag !== this.#alarmBlink) {
            this.#alarmBlink = flag;
            if (flag) {
                this.$alarm.classList.add('blink');
            } else {
                this.$alarm.classList.remove('blink');
            }
        }
    }

    /**
     * 屏幕闪烁
     * @param {Boolean} flag
     */
    #screenBlink;
    blinkScreen(flag) {
        if (flag !== this.#screenBlink) {
            this.#screenBlink = flag;
            if (flag) {
                this.$screen.classList.add('blink');
            } else {
                this.$screen.classList.remove('blink');
            }
        }
    }
}

class State {
    view = null;
    model = null;

    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    update({ day, alarm, num, amPm, blinkDot, blinkNum, blinkAlarm, blinkScreen }) {
        this.view.renderWeek(day);
        this.view.renderAlarm(alarm);
        this.view.renderNum(num);
        this.view.renderAmPm(amPm);
        requestAnimationFrame(() => {
            this.view.blinkDot(blinkDot);
            this.view.blinkNum(blinkNum);
            this.view.blinkAlarm(blinkAlarm);
            this.view.blinkScreen(blinkScreen);
        });
    }
    enter() {
        this.view.blinkDot(false);
        this.view.blinkNum([0, 0]);
        this.view.blinkAlarm(false);
        this.view.blinkScreen(false);
        this.update();
    }
    exit() {}
    handleCmdClick() {}
    handleUpClick() {}
    handleDownClick() {}
}

class StateTime extends State {
    name = 'time';

    constructor(view, model) {
        super(view, model);
    }

    update() {
        if (this.model.isTimeUp) {
            this.model.changeState('alarm');
        } else {
            super.update({
                day: this.model.day,
                alarm: this.model.isAlarmSet,
                num: this.model.timeNum,
                amPm: this.model.amPm,
                blinkDot: true,
                blinkNum: [0, 0],
                blinkAlarm: false,
                blinkScreen: false,
            });
        }
    }

    handleCmdClick() {
        this.model.changeState('setAlarm');
    }

    handleUpClick() {
        this.model.changeState('date');
    }

    handleDownClick() {
        this.model.changeState('date');
    }
}

class StateDate extends State {
    name = 'date';

    constructor(view, model) {
        super(view, model);
    }

    update() {
        if (this.model.isTimeUp) {
            this.model.changeState('alarm');
        } else {
            super.update({
                day: this.model.day,
                alarm: this.model.isAlarmSet,
                num: this.model.dateNum,
                amPm: this.model.amPm,
                blinkDot: false,
                blinkNum: [0, 0],
                blinkAlarm: false,
                blinkScreen: false,
            });
        }
    }

    #timerCountdown = null;

    enter() {
        super.enter();
        if (this.#timerCountdown === null) {
            this.#timerCountdown = setTimeout(() => {
                this.model.changeState('time');
                clearTimeout(this.#timerCountdown);
                this.#timerCountdown = null;
            }, 3000);
        }
    }

    exit() {
        if (this.#timerCountdown !== null) {
            clearTimeout(this.#timerCountdown);
            this.#timerCountdown = null;
        }
    }

    handleCmdClick() {
        this.model.changeState('setAlarm');
    }

    handleUpClick() {
        this.model.changeState('time');
    }

    handleDownClick() {
        this.model.changeState('time');
    }
}

class StateSetAlarm extends State {
    name = 'setAlarm';

    constructor(view, model) {
        super(view, model);
    }

    update() {
        if (this.model.isTimeUp) {
            this.model.changeState('alarm');
        } else {
            super.update({
                day: this.model.day,
                alarm: true,
                num: this.model.tempAlarmTime,
                amPm: this.model.amPm,
                blinkDot: true,
                blinkNum: [0, 6],
                blinkAlarm: true,
                blinkScreen: false,
            });
        }
    }

    handleCmdClick() {
        this.model.changeState('setAlarmHour');
    }

    handleUpClick() {
        this.model.changeState('time');
    }

    handleDownClick() {
        this.model.closeAlarm();
        this.model.changeState('time');
    }
}

class StateSetAlarmHour extends State {
    name = 'setAlarmHour';

    constructor(view, model) {
        super(view, model);
    }

    update() {
        if (this.model.isTimeUp) {
            this.model.resetAlarm();
            this.model.changeState('alarm');
        } else {
            super.update({
                day: this.model.day,
                alarm: true,
                num: this.model.tempAlarmTime,
                amPm: this.model.amPm,
                blinkDot: true,
                blinkNum: [0, 2],
                blinkAlarm: true,
                blinkScreen: false,
            });
        }
    }

    handleCmdClick() {
        this.model.changeState('setAlarmMinute');
    }

    handleUpClick() {
        this.model.addAlarmHour();
        this.update();
    }

    handleDownClick() {
        this.model.subAlarmHour();
        this.update();
    }
}

class StateSetAlarmMinute extends State {
    name = 'setAlarmMinute';

    constructor(view, model) {
        super(view, model);
    }

    update() {
        if (this.model.isTimeUp) {
            this.model.resetAlarm();
            this.model.changeState('alarm');
        } else {
            super.update({
                day: this.model.day,
                alarm: true,
                num: this.model.tempAlarmTime,
                amPm: this.model.amPm,
                blinkDot: true,
                blinkNum: [2, 4],
                blinkAlarm: true,
                blinkScreen: false,
            });
        }
    }

    handleCmdClick() {
        this.model.changeState('setAlarmSecond');
    }

    handleUpClick() {
        this.model.addAlarmMinute();
        this.update();
    }

    handleDownClick() {
        this.model.subAlarmMinute();
        this.update();
    }
}

class StateSetAlarmSecond extends State {
    name = 'setAlarmSecond';

    constructor(view, model) {
        super(view, model);
    }

    update() {
        if (this.model.isTimeUp) {
            this.model.resetAlarm();
            this.model.changeState('alarm');
        } else {
            super.update({
                day: this.model.day,
                alarm: true,
                num: this.model.tempAlarmTime,
                amPm: this.model.amPm,
                blinkDot: true,
                blinkNum: [4, 6],
                blinkAlarm: true,
                blinkScreen: false,
            });
        }
    }

    handleCmdClick() {
        this.model.setAlarm();
        this.model.changeState('time');
    }

    handleUpClick() {
        this.model.addAlarmSecond();
        this.update();
    }

    handleDownClick() {
        this.model.subAlarmSecond();
        this.update();
    }
}

class StateAlarm extends State {
    name = 'alarm';

    constructor(view, model) {
        super(view, model);
    }

    update() {
        super.update({
            day: this.model.day,
            alarm: true,
            num: this.model.timeNum,
            amPm: this.model.amPm,
            blinkDot: true,
            blinkNum: [0, 0],
            blinkAlarm: true,
            blinkScreen: true,
        });
    }

    #timerCountdown = null;

    enter() {
        super.enter();
        if (this.#timerCountdown === null) {
            this.#timerCountdown = setTimeout(() => {
                this.model.changeState('time');
                clearTimeout(this.#timerCountdown);
                this.#timerCountdown = null;
            }, 60000);
        }
    }

    exit() {
        if (this.#timerCountdown !== null) {
            clearTimeout(this.#timerCountdown);
            this.#timerCountdown = null;
        }
    }

    handleCmdClick() {
        this.model.changeState('time');
    }

    handleUpClick() {
        this.model.changeState('time');
    }

    handleDownClick() {
        this.model.changeState('time');
    }
}

class Model {
    view = null;

    #stateMap = {};
    #stateName = 'time';
    get currentState() {
        return this.#stateMap[this.#stateName];
    }

    changeState(v) {
        this.currentState.exit();
        this.#stateName = v;
        this.currentState.enter();
    }

    onCmdClick = () => {
        this.currentState.handleCmdClick();
    };

    onUpClick = () => {
        this.currentState.handleUpClick();
    };

    onDownClick = () => {
        this.currentState.handleDownClick();
    };

    constructor(view) {
        this.view = view;
        this.view.bindEvent({
            onCmdClick: this.onCmdClick,
            onUpClick: this.onUpClick,
            onDownClick: this.onDownClick,
        });
        [
            new StateTime(this.view, this),
            new StateDate(this.view, this),
            new StateSetAlarm(this.view, this),
            new StateSetAlarmHour(this.view, this),
            new StateSetAlarmMinute(this.view, this),
            new StateSetAlarmSecond(this.view, this),
            new StateAlarm(this.view, this),
        ].forEach(state => {
            this.#stateMap[state.name] = state;
        });
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

    update() {
        this.date = new Date();
        this.currentState.update();
    }

    hour12 = false;

    get YYYY() {
        return this.date.getFullYear();
    }
    get YY() {
        return (this.YYYY % 100).toString().padStart(2, 0);
    }
    get M() {
        return this.date.getMonth() + 1;
    }
    get MM() {
        return this.M.toString().padStart(2, '0');
    }
    get D() {
        return this.date.getDate();
    }
    get DD() {
        return this.D.toString().padStart(2, '0');
    }
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
    get dateNum() {
        return this.YY + this.MM + this.DD;
    }
    get amPm() {
        return this.H >= 12 ? 'PM' : 'AM';
    }

    #tempAlarmTime = [0, 0, 0];
    get tempAlarmTime() {
        return this.#tempAlarmTime.map(item => item.toString().padStart(2, '0')).join('');
    }

    get alarmHour() {
        return this.#tempAlarmTime[0];
    }
    #setAlarmHour = v => {
        this.#tempAlarmTime[0] = (v + 24) % 24;
    };
    addAlarmHour() {
        this.#setAlarmHour(this.alarmHour + 1);
    }
    subAlarmHour() {
        this.#setAlarmHour(this.alarmHour - 1);
    }

    get alarmMinute() {
        return this.#tempAlarmTime[1];
    }
    #setAlarmMinute = v => {
        this.#tempAlarmTime[1] = (v + 60) % 60;
    };
    addAlarmMinute() {
        this.#setAlarmMinute(this.alarmMinute + 1);
    }
    subAlarmMinute() {
        this.#setAlarmMinute(this.alarmMinute - 1);
    }

    get alarmSecond() {
        return this.#tempAlarmTime[2];
    }
    #setAlarmSecond = v => {
        this.#tempAlarmTime[2] = (v + 60) % 60;
    };
    addAlarmSecond() {
        this.#setAlarmSecond(this.alarmSecond + 1);
    }
    subAlarmSecond() {
        this.#setAlarmSecond(this.alarmSecond - 1);
    }

    #alarmTime = [88, 88, 88];
    get alarmTime() {
        return this.#alarmTime.map(item => item.toString().padStart(2, '0')).join('');
    }
    get isAlarmSet() {
        return this.alarmTime !== '888888';
    }
    get isTimeUp() {
        return this.alarmTime === this.timeNum;
    }

    setAlarm() {
        this.#alarmTime = [...this.#tempAlarmTime];
    }

    resetAlarm() {
        if (this.isAlarmSet) {
            this.#tempAlarmTime = [...this.#alarmTime];
        }
    }

    closeAlarm() {
        this.#alarmTime = [88, 88, 88];
    }
}

class Clock {
    view = null;
    model = null;

    constructor() {
        this.view = new View();
        this.model = new Model(this.view);

        this.interval();
    }

    #lastTime = 0;
    interval = () => {
        const lastTime = Date.now();
        if (lastTime - this.#lastTime >= 1000) {
            this.#lastTime = lastTime;
            this.model.update();
        }
        requestAnimationFrame(this.interval);
    };
}

const clock = new Clock();
