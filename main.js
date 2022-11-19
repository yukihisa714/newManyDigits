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
     * @param {Number} length 目指す長さ
     * @param {Number} position 0:最初, 1:最後
     */
    insert0(array, length, position) {
        while (array.length < length) {
            array.splice(array.length * position, 0, 0);
        }
    }
    compareAbsolute(number) {

    }
    addition(number) {

    }
}

let a = new ManyNumer(1, 123, 456);
a.insert0(a.integer, 10, 1);

let b = new ManyNumer(1, 0, 123456);
let c = new ManyNumer(1, 123456, 0);


console.log(a.integer, b.decimal);
console.log(b.integer, b.decimal);
console.log(c.integer, c.decimal);