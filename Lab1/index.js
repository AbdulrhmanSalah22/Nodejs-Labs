const { readJson, writeJson } = require("./util");

const data = readJson("data.json");
console.log(data);

const [ , , action, arg1 , newName ] = process.argv;
const arg = parseInt(arg1);
switch (action) {
    case "delete":
    data.splice(arg,1);
    writeJson("data.json",data);
    console.log(data)
        break;
    case "edit":
    data[arg].name = newName;
    writeJson("data.json",data);
    console.log(data);
        break;
}

// const fs = require("fs");

// data = fs.readFileSync("data.json", "utf-8");
// // console.log(data);
// var js = JSON.parse(data);
// console.log(js);
// const [, , action, arg1, arg2] = process.argv;
// switch (action) {
//     case "read":
//         console.log(js);
//         break;
//     case "write":
//         const wr = js.push({ name: arg1, age: +arg2 });
//         fs.writeFileSync("data.json", JSON.stringify(wr));
//         break;
//     default:
//         break;
// }