// @ts-check

class ManyNumer {
    /**
     * 
     * @param {Number} sign 符号 1 / -1
     * @param {String} integer 整数部分
     * @param {String} decimal 少数部分
     */
    constructor(sign, integer, decimal) {
        this.sign = sign;
        this.integer = [...integer].map(Number);
        this.decimal = [...decimal].map(Number);
    }

    /**
     * 0を挿入する
     * @param {Array} array 増やす配列
     * @param {Number}  length 目指す長さ
     * @param {Number}  position  0:最初, 1:最後
     * @returns {Array} 0が増えた配列
     */
    insert0(array, length, position) {
        const resultArr = array.slice();
        while (resultArr.length < length) {
            resultArr.splice(array.length * position, 0, 0);
        }
        return resultArr;
    }

    delete0(integer, decimal) {
        let deletedInteger = integer;
        let deletedDecimal = decimal;

        while (deletedInteger[0] === "0") {
            deletedInteger = deletedInteger.slice(1);
        }
        if (!deletedInteger) deletedInteger = "0";

        while (deletedDecimal[deletedDecimal.length - 1] === "0") {
            deletedDecimal = deletedDecimal.slice(0, -1);
        }
        if (!deletedDecimal) deletedDecimal = "0";

        return { integer: deletedInteger, decimal: deletedDecimal };
    }

    /**
     * 加算 (符号は問わない)
     * @param {Object} number 足す数
     * @returns {Object} 計算結果
     */
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
        // console.log(arr1, arr2);

        const sympleResultArr = arr1.slice();
        for (let i = 0; i < arr1.length; i++) {
            sympleResultArr[i] += arr2[i];
        }
        // 繰り上がりが入るために一番左に一桁増やす
        sympleResultArr.unshift(0);

        let resultSign = 0;
        for (const e of sympleResultArr) {
            if (e) {
                resultSign = Math.sign(e);
                break;
            }
        }

        let resultArr = [];
        for (let i = sympleResultArr.length - 1; i >= 0; i--) {
            if (Math.sign(-sympleResultArr[i]) === resultSign) {
                sympleResultArr[i - 1] -= resultSign;
            }
            if (sympleResultArr[i] >= 10) {
                sympleResultArr[i - 1]++;
            }
            resultArr[i] = (10 + sympleResultArr[i] * resultSign) % 10;
        }

        const reusltStr = resultArr.join("");
        const reusltInteger = reusltStr.slice(0, integerLen + 1);
        const resultDecimal = reusltStr.slice(integerLen + 1);

        const deleted = this.delete0(reusltInteger, resultDecimal);

        console.log(`${deleted.integer}.${deleted.decimal}`);

        return new ManyNumer(resultSign, reusltInteger, resultDecimal);
    }

    /**
     * 乗算 (符号は問わない)
     * @param {Object} number 掛ける数
     * @returns {Object} 計算結果
     */
    multiplication(number) {
        const arr1 = this.integer.concat(this.decimal);
        const arr2 = number.integer.concat(number.decimal);
        const resultSign = this.sign * number.sign;

        let resultsArr = [];
        for (let i = 0; i < arr2.length; i++) {
            resultsArr[i] = Array(i).fill(0);
            let moveUp = 0;
            for (let i2 = arr1.length - 1; i2 >= 0; i2--) {
                const p = arr1[i2] * arr2[arr2.length - 1 - i] + moveUp;
                moveUp = Math.floor(p / 10);
                resultsArr[i].unshift(p % 10);
            }
            resultsArr[i].unshift(moveUp);
            resultsArr[i] = Array(arr2.length - i - 1).fill(0).concat(resultsArr[i]);
        }

        const resultArr = [];
        let moveUP2 = 0;
        for (let digit = resultsArr[0].length - 1; digit >= 0; digit--) {
            let p = 0;
            for (let step = 0; step < resultsArr.length; step++) {
                p += resultsArr[step][digit];
            }
            p += moveUP2;
            moveUP2 = Math.floor(p / 10);
            resultArr.unshift(p % 10);
        }
        resultArr.unshift(moveUP2);

        const reusltStr = resultArr.join("");
        const decimalLen = this.decimal.length + number.decimal.length;
        const reusltInteger = reusltStr.slice(0, reusltStr.length - decimalLen);
        const resultDecimal = reusltStr.slice(reusltStr.length - decimalLen);

        const deleted = this.delete0(reusltInteger, resultDecimal);

        console.log(`${deleted.integer}.${deleted.decimal}`);

        return new ManyNumer(resultSign, deleted.integer, deleted.decimal);

    }
}

let a = new ManyNumer(1, "423", "456");
let b = new ManyNumer(-1, "423", "456");
let c = new ManyNumer(-1, "413", "546");
let d = new ManyNumer(-1, "0", "0894376");
let e = new ManyNumer(1, "897897897", "0");
let f = new ManyNumer(1, "577", "320");
let g = new ManyNumer(1,
    "7952078402674219742079451078765413612378972813950162840926470834620927894015720",
    "230846578230475234896718307465189737482013768305763822849738902577529398707852"
);
let h = new ManyNumer(1,
    "542309658304439026785909480127931380712839721642735100120237861045681304628947",
    "3349027820145891230456913438916051824701560123650182534901001387495108356438902"
);
let j = new ManyNumer(1,
    "30124678120935612089356401349853458917340651983217343061892706182973810389751063751",
    "128037713891185712838102356892347236182372394756310511000012837189376510825891"
);