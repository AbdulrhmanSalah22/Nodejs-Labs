const http = require("http");

//Dummy database
const users = [
    { id: 1, name: "Ahmed" },
    { id: 2, name: "Ali" },
    { id: 3, name: "Andrew" },
    { id: 4, name: "Merna" },
]

const server = http.createServer((req, res) => {
    const { method, url } = req
    if (method === "GET") {
        if (url === "/users") {
            res.write(JSON.stringify(users));
            return res.end();
        }
        if (url === "/") {
            res.write("welcome to the server");
            return res.end()
        }
    }
    if (method === "POST") {
        if (url === "/users") {
            req.on("data", (chunks) => {
                const user = JSON.parse(chunks);
                users.push(user);
            });
            req.on("end", ()=>{
                res.write(JSON.stringify(users));
                return res.end()
            })
        }
    }
    res.writeHead(404)
    res.write("NOT-FOUND");
    res.end()
});

server.listen(3000);