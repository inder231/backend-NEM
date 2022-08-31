const {sum,sub,mult,arr} = require("./other_file");
const isEven = require("is-even");
// name does not matter we can use 'num' or "sum" also.
console.log(sum(1,2));
console.log(sub(1,2));
console.log(mult(3,3));
console.log(isEven(5));

// inbuild modules of node also called api's

const os = require('os')
console.log(os.version());
console.log(os.type());
console.log(os.uptime());
const f = require("fs");
f.readFile("./example.txt",{encoding:"utf-8"},(err,data)=>{
    if(err){
        console.log(err,"err");
    }else{
        console.log(data,"data");
    }
})