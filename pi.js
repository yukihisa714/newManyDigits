let n = 10;

const MAGIC_NUMS = [
    new ManyInteger(1, "13591409"),
    new ManyInteger(1, "545140134"),
    new ManyInteger(1, "640320"),
]

let a1s = [];
for (let i = 0; i <= n * 2; i++) {
    a1s[i] = minus1Exponentiation(i);
}
// console.log(a1s);

let a2s = [];
for (let i = 0; i <= n * 2; i++) {
    let p = new ManyInteger(1, "1");
    for (let j = 6 * i; j > 3 * i; j--) {
        p = p.multiplication(new ManyInteger(1, String(j)));
    }
    a2s[i] = p;
}
// console.log(a2s);

let a3s = [];
for (let i = 0; i <= n * 2; i++) {
    a3s[i] = MAGIC_NUMS[0].addition(MAGIC_NUMS[1].multiplication(new ManyInteger(1, String(i))));
}
// console.log(a3s);

let as = [];
for (let i = 0; i <= n * 2; i++) {
    as[i] = a1s[i].multiplication(a2s[i].multiplication(a3s[i]));
}
console.log(as);


let factorials = [new ManyInteger(1, "1")];
for (let i = 1; i <= n * 2; i++) {
    factorials[i] = factorials[i - 1].multiplication(new ManyInteger(1, String(i)));
}
// console.log(factorials);

let factorialsSum = new ManyInteger(1, "1");
factorials.forEach((e) => {
    factorialsSum = factorialsSum.multiplication(e);
});

let b1s = factorials.map(e => e.plusExponentiation(3));
// console.log(b1s);
let b2s = [];
for (let i = 0; i <= n * 2; i++) {
    b2s[i] = MAGIC_NUMS[2].plusExponentiation(3 * i + 1);
}
// console.log(b2s);

let bs = [];
for (let i = 0; i <= n * 2; i++) {
    bs[i] = b1s[i].multiplication(b2s[i]);
}

const Bs = [
    factorialsSum.plusExponentiation(3),
    MAGIC_NUMS[2].plusExponentiation(6 * (n ** 2) + 5 * n + 1),
]

const B = Bs[0].multiplication(Bs[1]);


// console.log(bs);
// console.log(Bs[0]);
// console.log(Bs[1]);
console.log(B);


let bunbos = [];
for (let i = 0; i <= n * 2; i++) {
    let p = B.division(bs[i]);
    console.log(B, bs[i], p, i);
    bunbos[i] = as[i].multiplication(p);
}
console.log(bunbos);

let bunbo = new ManyInteger(1, "0");
bunbos.forEach(e => {
    bunbo = bunbo.addition(e);
})
// console.log(bunbo);

bunbo = bunbo.multiplication(new ManyInteger(1, "3"));
// console.log(bunbo);
bunbo = bunbo.division(new ManyInteger(1, "2"));
// console.log(bunbo);
bunbo = bunbo.division(B);

console.log(bunbo);