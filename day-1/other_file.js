const num = 123;
// export default num; in ESM  echma script

const sum = (a, b) => a + b;
const sub = (a, b) => a - b;
const mult = (a, b) => a * b;
module.exports = {sub,sum,mult,arr:[1,2,3]}; //  CJS

