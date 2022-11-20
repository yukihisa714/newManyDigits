class ManyNumer {
    /**
     * 
     * @param {Number} sign 符号 1 / -1
     * @param {Number} integer 整数部分
     * @param {Number} decimal 少数部分
     */
    constructor(sign, integer, decimal) {
        this.sign = sign;
        this.integer = [...String(integer)].map(Number);
        this.decimal = [...String(decimal)].map(Number);
    }
    /**
     * 0を挿入する
     * @param {Array} array 増やす配列
     * @param {Number}  length 目指す長さ
     * @param {Number}  position  0:最初, 1:最後
     * @returns {Array} 0が増えた配列
     */
    insert0(array, length, position) {
        let resultArr = array.slice();
        while (resultArr.length < length) {
            resultArr.splice(array.length * position, 0, 0);
        }
        return resultArr;
    }
    compareAbsolute(number) {
        const integerLen = Math.max(this.integer.length, number.integer.length);
        const decimalLen = Math.max(this.decimal.length, number.decimal.length);
        const integer1 = this.insert0(this.integer, integerLen, 0);
        const integer2 = this.insert0(number.integer, integerLen, 0);
        const decimal1 = this.insert0(this.decimal, decimalLen, 1);
        const decimal2 = this.insert0(number.decimal, decimalLen, 1);
        for (let i = 0; i < integerLen; i++) {
            const p = integer1[i] - integer2[i];
            if (p) return Math.sign(p);
        }
        for (let i = 0; i < decimalLen; i++) {
            const p = decimal1[i] - decimal2[i];
            if (p) return Math.sign(p);
        }
        return 0;
    }
    addition(number) {

    }
}

let a = new ManyNumer(1, 123, 456);
// a.insert0(a.integer, 10, 1);

let b = new ManyNumer(1, 0, 123456);
let c = new ManyNumer(1, 123456, 0);


// console.log(a.integer, b.decimal);
// console.log(b.integer, b.decimal);
// console.log(c.integer, c.decimal);