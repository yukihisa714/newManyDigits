// @ts-nocheck

class ManyInteger {
    constructor(sign, integer) {
        this.sign = sign;
        if (Number(integer) === 0) this.sign = 0;
        this.integerStr = integer;
        this.integer = [...integer].map(Number);
    }

    /**
     * 配列の頭に0を入れて長さを揃える
     * @param {Array} arr1 一つ目
     * @param {Array} arr2 二つ目
     * @returns 
     */
    insert0(arr1, arr2) {
        const array1 = arr1.slice();
        const array2 = arr2.slice();
        const arrLen = Math.max(array1.length, array2.length);
        while (array1.length < arrLen) {
            array1.unshift(0);
        }
        while (array2.length < arrLen) {
            array2.unshift(0);
        }
        return { array1, array2 };
    }

    delete0(arr) {
        const deleted = arr.slice();
        while (deleted[0] === 0) {
            deleted.shift();
        }
        if (!deleted.length) deleted.push(0);
        return deleted;
    }

    addition(number) {
        const inserted0 = this.insert0(this.integer, number.integer);
        const arr1 = inserted0.array1.map(e => e *= this.sign);
        const arr2 = inserted0.array2.map(e => e *= number.sign);
        const sympleResultArr = arr1.map((e, i) => e += arr2[i]);

        // 繰り上がりが入るために一番左に一桁増やす
        sympleResultArr.unshift(0);

        // 配列の頭から見て初めて出てきた0じゃない数字の符号が計算結果の符号
        // NaNにも対応させるためビット演算を使用する
        const resultSign = Math.sign(sympleResultArr.find(e => e) << 1);

        const resultArr = [];
        for (let i = sympleResultArr.length - 1; i >= 0; i--) {
            if (Math.sign(-sympleResultArr[i]) === resultSign) {
                sympleResultArr[i - 1] -= resultSign;
            }
            else if (Math.abs(sympleResultArr[i]) >= 10) {
                sympleResultArr[i - 1] += resultSign;
            }
            resultArr[i] = (10 + sympleResultArr[i] * resultSign) % 10;
        }

        const deletedArr = this.delete0(resultArr);
        const reusltStr = deletedArr.join("");

        return new ManyInteger(resultSign, reusltStr);
    }

    multiplication(number) {
        const arr1 = this.integer;
        const arr2 = number.integer;
        const resultSign = this.sign * number.sign;

        const resultsArr = [];
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

        const deletedArr = this.delete0(resultArr);
        const reusltStr = deletedArr.join("");
        // console.log(reusltStr);

        return new ManyInteger(resultSign, reusltStr);
    }

    factorial() {
        let arr = new ManyInteger(this.sign, this.integerStr);
        const max = Number(arr.integerStr);
        const minus1 = new ManyInteger(-1, "1");
        // console.log(arr, max, minus1);

        let result = new ManyInteger(1, "1");
        for (let i = 1; i < max; i++) {
            result = result.multiplication(arr);
            arr = arr.addition(minus1);
            // console.log(result, arr);
        }
        return result;
    }

    plusExponentiation(n) {
        let arr = new ManyInteger(1, "1");
        const arr2 = new ManyInteger(1, this.integerStr);
        for (let i = 0; i < n; i++) {
            arr = arr.multiplication(arr2);
        }
        return arr;
    }


    division(number) {
        // const st = Date.now();
        const resultSign = this.sign * number.sign;
        const numLen = number.integer.length;
        const p1 = this.integer.length === numLen ?
            new ManyInteger(1, "0" + this.integerStr)
            : new ManyInteger(1, this.integerStr);
        const minusNumber = new ManyInteger(-1, number.integerStr);

        const resultArr = [];
        let tmpArr = p1.integer.splice(0, numLen);
        while (p1.integer.length) {
            tmpArr.push(p1.integer.splice(0, 1)[0]);
            {
                let tmpInteger = new ManyInteger(1, tmpArr.join(""));
                let p = 0;
                while (true) {
                    const pp = tmpInteger.addition(minusNumber);
                    if (0 <= pp.sign) {
                        tmpInteger = pp;
                        p++;
                    }
                    if (pp.sign <= 0) {
                        resultArr.push(p);
                        break;
                    }
                }
                tmpArr = tmpInteger.integer.slice();
            }

            while (tmpArr.length < numLen) {
                tmpArr.unshift(0);
            }
            while (tmpArr.length > numLen) {
                tmpArr.shift();
            }
        }

        if (!resultArr.length) resultArr[0] = 0;

        // const ed = Date.now();
        // console.log(ed - st);
        return new ManyInteger(resultSign, resultArr.join(""));
    }


    root(digit) {
        let arr1 = this.integer;
        let len1 = Math.ceil(arr1.length / 2);
        let str1 = "1" + "0".repeat(len1 - 1);
        let num1 = new ManyInteger(1, str1);

    }
}

function minus1Exponentiation(n) {
    return new ManyInteger((-1) ** (n % 2), "1");
}

let pa = new ManyInteger(-1, "895623");
let pb = new ManyInteger(1, "298364");
let pc = new ManyInteger(1, "134");
let pd = new ManyInteger(-1, "298364");
let pe = new ManyInteger(0, "0");
let pg = [
    new ManyInteger(1, "134"),
    new ManyInteger(1, "268"),
    new ManyInteger(1, "938"),
    new ManyInteger(1, "1072"),
    new ManyInteger(1, "1340"),
    new ManyInteger(1, "11122"),
    new ManyInteger(1, "13400"),
    new ManyInteger(1, "13534"),
    new ManyInteger(1, "72283218"),
    new ManyInteger(1, "1213310236"),
    new ManyInteger(1, "1340000000134"),
    new ManyInteger(1, "1222977397446848"),
    new ManyInteger(1, "1988360333122163298702744246541041152"),
    new ManyInteger(1, "3953576814333680203592857907682293280424654067010614221127148312157487104"),
]

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

        // 配列の頭から見て初めてきた0じゃない数字の符号が計算結果の符号
        // NaNにも対応させるためビット演算を使用する
        const resultSign = (Math.sign(sympleResultArr.find(e => e)) << 1) / 2;

        let resultArr = [];
        for (let i = sympleResultArr.length - 1; i >= 0; i--) {
            if (Math.sign(-sympleResultArr[i]) === resultSign) {
                sympleResultArr[i - 1] -= resultSign;
            }
            if (Math.abs(sympleResultArr[i]) >= 10) {
                sympleResultArr[i - 1] += resultSign;
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

    division(number, digit) {
        let decimalLen1 = this.decimal.length;
        let decimalLen2 = number.decimal.length;

        let tmp1 = decimalLen1 - decimalLen2;
        let tmp2 = digit - tmp1;

        if (tmp2 < 0) tmp2 = 0;

        let newDigits = Array(tmp2).fill(0);
        const arr1 = this.integer.concat(this.decimal).concat(newDigits);
        const arr2 = number.integer.concat(number.decimal);
        console.log(arr1, arr2);

        let manyInteger1 = new ManyInteger(this.sign, arr1.join(""));
        let manyInteger2 = new ManyInteger(number.sign, arr2.join(""));

        let result1 = manyInteger1.division(manyInteger2);
        console.log(result1);

        return result1;
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