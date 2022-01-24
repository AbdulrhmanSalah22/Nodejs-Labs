const fs = require("fs")

const readJson = (path) => JSON.parse(fs.readFileSync(path, "utf-8"));

const writeJson = (path, data) => fs.writeFileSync(path, JSON.stringify(data))

module.exports = {
    readJson,
    writeJson
}