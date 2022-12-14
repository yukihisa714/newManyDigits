const st = Date.now();

const n = 5;

const MAGIC_NUMS = [
    new ManyInteger(1, "13591409"),
    new ManyInteger(1, "545140134"),
    new ManyInteger(1, "640320"),
]

const a1s = [];
for (let i = 0; i <= n * 2; i++) {
    a1s[i] = minus1Exponentiation(i);
}
console.log(a1s);

const a2s = [];
for (let i = 0; i <= n * 2; i++) {
    let p = new ManyInteger(1, "1");
    for (let j = 6 * i; j > 3 * i; j--) {
        p = p.multiplication(new ManyInteger(1, String(j)));
    }
    a2s[i] = p;
}
console.log(a2s);

const a3s = [];
for (let i = 0; i <= n * 2; i++) {
    a3s[i] = MAGIC_NUMS[0].addition(MAGIC_NUMS[1].multiplication(new ManyInteger(1, String(i))));
}
console.log(a3s);

const as = [];
for (let i = 0; i <= n * 2; i++) {
    as[i] = a1s[i].multiplication(a2s[i].multiplication(a3s[i]));
}
console.log(as);


const factorials = [new ManyInteger(1, "1")];
for (let i = 1; i <= n * 2; i++) {
    factorials[i] = factorials[i - 1].multiplication(new ManyInteger(1, String(i)));
}
console.log(factorials);

let factorialsSum = new ManyInteger(1, "1");
factorials.forEach((e) => {
    factorialsSum = factorialsSum.multiplication(e);
});

const b1s = factorials.map(e => e.plusExponentiation(3));
console.log(b1s);
const b2s = [];
for (let i = 0; i <= n * 2; i++) {
    b2s[i] = MAGIC_NUMS[2].plusExponentiation(3 * i + 1);
}
console.log(b2s);

const bs = [];
for (let i = 0; i <= n * 2; i++) {
    bs[i] = b1s[i].multiplication(b2s[i]);
}
console.log(bs);

const B1 = factorialsSum.plusExponentiation(3);
console.log(B1);

const B2 = MAGIC_NUMS[2].plusExponentiation(6 * (n ** 2) + 5 * n + 1);
console.log(B2);

const tmpTime1 = Date.now();
const B = B1.multiplication(B2);
console.log(B, Date.now() - tmpTime1);


const bunbos = [];
for (let i = 0; i <= n * 2; i++) {
    const p = B.division(bs[i]);
    // const p1 = (factorialsSum.division(factorials[i])).plusExponentiation(3);
    // const p2 = MAGIC_NUMS[2].plusExponentiation(6 * (n ** 2) + 5 * n - 3 * i);
    // const p = p1.multiplication(p2);
    console.log(B, bs[i], p, i);
    bunbos[i] = as[i].multiplication(p);
}
console.log(bunbos);

let bunbo = new ManyInteger(0, "0");
bunbos.forEach(e => {
    bunbo = bunbo.addition(e);
})
console.log(bunbo);

bunbo = bunbo.multiplication(new ManyInteger(1, "3"));
console.log(bunbo);
bunbo = bunbo.division(new ManyInteger(1, "2"));
// console.log(bunbo);
// bunbo = bunbo.division(B);

let newBunbo = new ManyNumer(1, bunbo.integerStr, "0");
let newB = new ManyNumer(1, B.integerStr, "0");

newBunbo = newBunbo.division(newB, 5000);

const resultElm = document.getElementById("result");
resultElm.innerText = newBunbo.integerStr;

console.log(newBunbo);

const ed = Date.now();
console.log(`${ed - st} ms`);