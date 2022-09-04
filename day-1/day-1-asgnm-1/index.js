const argvs = process.argv;
const crypto = require("crypto");
// console.log(argvs);
// console.log(argvs.splice(2));
const argv = argvs.splice(2);
const operation = argv[0];
const operator1 = parseInt(argv[1]);
const operator2 = parseInt(argv[2]);
if(operation==="add"){
    console.log("Sum"+ " is " +(operator1+operator2));
}
if(operation==="sub"){
    console.log("Subtract"+" is "+(operator1-operator2));
}
if(operation==="mult"){
    console.log("Multiplication"+" is "+(operator1*operator2));
}
if(operation==="divide"){
    console.log("Divition"+" is "+(operator1/operator2));
}
if(operation==="sin"){
    console.log('sin'+" of "+(Math.sin(operator1)));
}
if(operation==="cos"){
    console.log("cos"+" of "+(Math.cos(operator1)));
}
if(operation==="tan"){
    console.log("tan"+" of "+(Math.tan(operator1)));
}
if(operation==="random"){
    console.log(`Random number of length ${operator1}`+" is "+crypto.randomBytes(operator1).toString('binary'));
}
