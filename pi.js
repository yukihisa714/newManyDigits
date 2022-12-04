let n = 5;

const MAGIC_NUMS = [
    new ManyInteger(1, "13591409"),
    new ManyInteger(1, "545140134"),
    new ManyInteger(1, "640320"),
]

let factorials = [new ManyInteger(1, "1")];
for (let i = 1; i <= n * 2; i++) {
    factorials[i] = factorials[i - 1].multiplication(new ManyInteger(1, String(i)));
}
console.log(factorials);

let factorialsSum = new ManyInteger(1, "1");
factorials.forEach((e) => {
    factorialsSum = factorialsSum.multiplication(e);
});


const Bs = [
    factorialsSum,
    MAGIC_NUMS[2].plusExponentiation(6 * (n ** 2) + 5 * n + 1),
]

const B = Bs[0].multiplication(Bs[1]);

console.log(Bs[0]);
console.log(Bs[1]);
console.log(B);