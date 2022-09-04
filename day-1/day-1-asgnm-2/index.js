const fs = require("fs");
const argvs = process.argv;
const params = argvs.splice(2);
const operation = params[0];
const fileName = params[1];
const operator2 = params[2];
const operator3 = params[3];
if (operation === "read") {
  fs.readFile(fileName, "utf-8", (err, data) => {
    if (err) throw err;
    console.log(data);
  });
}
if (operation === "append") {
  fs.appendFile(fileName, operator2, (err, data) => {
    if (err) throw err;
    console.log("Data is appended");
  });
}
if (operation === "remove") {
  fs.rm(fileName, (err, data) => {
    if (err) throw err;
    console.log("File removed");
  });
}
if (operation === "create") {
  fs.appendFile(fileName, operator2, (err) => {
    if (err) throw err;
    console.log("file created successfully");
  });
}
if (operation === "rename") {
  fs.rename(fileName, operator2, (err) => {
    if (err) throw err;
    console.log(`${fileName} changed to ${operator2}`);
  });
}


if (operation === "list") {
  fs.readdir("../day-1-asgnm-2", (err, files) => {
    if(err)throw err;
    files.forEach((file)=>console.log(file));
  });
}
