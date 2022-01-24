require("express-async-errors");
require("dotenv").config({ path: "./.env" })
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const planRouter = require("./routes/plan");
const userRouter = require("./routes/user");

const app = express();

//middleware
app.use(express.json());
// app.use(auth);
// app.use();
app.use("/auth", authRouter);

app.use("/user", userRouter);
app.use("/plan", planRouter);
// app.use("/plans", plansRouter)

// app.use("/plans", auth, plansRouter)

// const errorHandler = (func) => {
//     return (req, res, next) => {
//         try {
//             func(req, res, next)
//         } catch (error) {
//             next(error)
//         }
//     }
// }

// app.get("/", errorHandler((req, res) => {
//     // throw new Error("un-expected-error")
//     console.log(req.user);
//     if (req.user.isAdmin)
//         return res.json({ message: "hello-world" })
//     res.status(401).json({ message: "must be admin" })
// }))

//Error handling middleware by "express-async-errors" package
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message })
})

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("successfully connected to database");
    app.listen(3008, () => {
        console.log("listening on port 3005");
    })
}).catch(e => console.log(e.message))