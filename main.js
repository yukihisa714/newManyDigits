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
    compare(number) {
        const integerLen = Math.max(this.integer.length, number.integer.length);
        const decimalLen = Math.max(this.decimal.length, number.decimal.length);
        const integer1 = this.insert0(this.integer, integerLen, 0);
        const integer2 = this.insert0(number.integer, integerLen, 0);
        const decimal1 = this.insert0(this.decimal, decimalLen, 1);
        const decimal2 = this.insert0(number.decimal, decimalLen, 1);
        let arr1 = integer1.concat(decimal1);
        let arr2 = integer2.concat(decimal2);
        arr1 = arr1.map(e => e *= this.sign);
        arr2 = arr2.map(e => e *= number.sign);
        console.log(arr1, arr2);
        for (let i = 0; i < arr1.length; i++) {
            const p = arr1[i] - arr2[i];
            if (p) return Math.sign(p);
        }
        return 0;
    }
    addition(number) {
        const integerLen = Math.max(this.integer.length, number.integer.length);
        const decimalLen = Math.max(this.decimal.length, number.decimal.length);
        const integer1 = this.insert0(this.integer, integerLen, 0);
        const integer2 = this.insert0(number.integer, integerLen, 0);
        const decimal1 = this.insert0(this.decimal, decimalLen, 1);
        const decimal2 = this.insert0(number.decimal, decimalLen, 1);
        let arr1 = integer1.concat(decimal1);
        let arr2 = integer2.concat(decimal2);
        arr1 = arr1.map(e => e *= this.sign);
        arr2 = arr2.map(e => e *= number.sign);
        console.log(arr1, arr2);
        const resultArr = arr1.slice();
        for (let i = 0; i < arr1.length; i++) {
            resultArr[i] += arr2[i];
        }
        console.log(resultArr);
    }
}

let a = new ManyNumer(1, 423, 456);
// a.insert0(a.integer, 10, 1);

let b = new ManyNumer(-1, 0, 0894376);
let c = new ManyNumer(1, 897897897, 0);


// console.log(a.integer, b.decimal);
// console.log(b.integer, b.decimal);
// console.log(c.integer, c.decimal);