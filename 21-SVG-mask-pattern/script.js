const ani_1 = document.querySelector('#ani-1');
const ani_2 = document.querySelector('#ani-2');
const C = 400; // 周期
const C_1 = C / 4; // 四分之一周期
const C_2 = C / 2; // 四分值二周期
const C_3 = C_1 * 3; // 四分之三周期
const C_num = 20; // 周期数量，波形平移距离为 C_num - 1 个周期的长度
const values_1 = [];
const values_2 = [];
for (let i = 0; i < 5; i++) {
    const t = i / 4; // 总进度
    const A = (i % 2) * 60; // 振幅
    const y = (Math.abs(i - 2) * C) / 2; // 纵坐标
    const startX = C - C_num * C + t * ((C_num - 1) * C); // 左侧起点横坐标
    const wave = [];
    for (let j = 0; j < C_num; j++) {
        const x = startX + C * j;
        wave[j] = `C${x},${y},${x + C_1},${y + A},${x + C_2},${y} C${x + C_2},${y},${x + C_3},${y - A},${x + C},${y}`;
    }
    values_1[i] = values_2[4 - i] = `M${startX},${y}${wave.join('')}L${C},${y}L${C},${y + C}L${startX},${y + C}`;
}
ani_1.setAttribute('values', values_1.join(';'));
ani_2.setAttribute('values', values_2.join(';'));
