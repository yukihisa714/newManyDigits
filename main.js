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
    addition(number) {
        const integerLen = Math.max(this.integer.length, number.integer.length);
        const decimalLen = Math.max(this.decimal.length, number.decimal.length);
        const integer1 = this.insert0(this.integer, integerLen, 0);
        const integer2 = this.insert0(number.integer, integerLen, 0);
        const decimal1 = this.insert0(this.decimal, decimalLen, 1);
        const decimal2 = this.insert0(number.decimal, decimalLen, 1);
        let arr1 = integer1.concat(decimal1);
        let arr2 = integer2.concat(decimal2);
        // const tmpFunc = (tmp, tmp2, tmp3) => { console.log(tmp, tmp2, tmp3) }; 実験
        arr1 = arr1.map(e => e *= this.sign);
        arr2 = arr2.map(e => e *= number.sign);
        console.log(arr1, arr2);

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
        // console.log(resultSign);

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
        // console.log(reusltStr);
        let reusltInteger = reusltStr.slice(0, integerLen + 1);
        let resultDecimal = reusltStr.slice(integerLen + 1);

        while (reusltInteger[0] === "0") {
            reusltInteger = reusltInteger.slice(1);
        }
        if (!reusltInteger) reusltInteger = "0";
        while (resultDecimal[resultDecimal.length - 1] === "0") {
            resultDecimal = resultDecimal.slice(0, -1);
        }
        if (!resultDecimal) resultDecimal = "0";
        console.log(`${reusltInteger}.${resultDecimal}`);

        return new ManyNumer(resultSign, reusltInteger, resultDecimal);
    }

    multiplication(number) {
        let arr1 = this.integer.concat(this.decimal);
        let arr2 = number.integer.concat(number.decimal);
        let resultsArr = [];
        for (let i = 0; i < arr2.length; i++) {
            resultsArr[i] = Array(i).fill(0);
            let moveUp = 0;
            for (let i2 = arr1.length - 1; i2--) {
                const p = arr1[i2] * arr2[arr2.length - 1 - i] + moveUp;
                moveUp = Math.floor(p / 10);
                resultsArr[i].push(p % 10);
            }
            resultsArr[i].push(moveUp);
            resultsArr[i] = resultsArr[i].concat(Array(arr2.length - i - 1).fill(0));
        }
        console.log(resultsArr);
    }
}

let a = new ManyNumer(1, "423", "456");
let b = new ManyNumer(-1, "423", "456");
let c = new ManyNumer(-1, "413", "546");
let d = new ManyNumer(-1, "0", "0894376");
let e = new ManyNumer(1, "897897897", "0");
let f = new ManyNumer(1, "577", "320");
let g = new ManyNumer(1, "079520784026742197420794510787654120927894015720", "2308465782304752348967107852");
let h = new ManyNumer(1, "542309658304439026785909461045681304628947", "3349027820145891230456913456438902");