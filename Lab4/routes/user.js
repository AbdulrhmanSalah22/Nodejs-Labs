const express = require("express");
const { User, validateUser } = require("../models/user");
const mongoose = require("mongoose");

const userRouter = express.Router()

userRouter.get("/", async (req, res) => {
    const users = await User.find()
    res.json(users)
})

userRouter.get("/:id", async (req, res) => {
    // try {
    //     const user = await User.findById(req.params.id);
    //     res.json(user)
    // } catch ({ message }) {
    //     res.status(400).json({ message })
    // }
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) return res.status(400).json({ message: "invalid id" })
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "no user with the given id" })
    res.json(user)
})

userRouter.post("/", async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message })
    try {
        const newUser = new User(req.body)
        const result = await newUser.save()
        res.json(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

userRouter.put("/:id", async (req, res) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) return res.status(400).json({ message: "invalid id" })

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "no user with the given id" })

    const { error } = validateUser(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message })

    // user.name = req.body.name
    // user.email = req.body.email
    // user.password = req.body.password
    // user.isAdmin = req.body.isAdmin
    // user.age = req.body.age

    user.set(req.body)

    await user.save();
    res.json(user)
})

userRouter.delete("/:id", async (req, res) => {
    const result = await User.findByIdAndDelete(req.params.id);
    res.json(result)
})

module.exports = userRouter;