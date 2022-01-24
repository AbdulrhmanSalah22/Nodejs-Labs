const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const mongoose = require("mongoose")
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const { Plan , ValidatePlan } = require("../models/plan");
const { User } = require("../models/user")

const planRouter = express.Router()

planRouter.get("/",auth, async (req, res) => {
    const plans = await Plan.find(); /// Hereee !!!
    res.json(plans)
})

planRouter.get("/:id", auth ,async (req, res) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) return res.status(400).json({ message: "invalid id" })

    const p = await Plan.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "no user with the given id" })

    res.json(p)
})

planRouter.post("/",[auth,admin], async (req, res) => {
    const { error } = ValidatePlan(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message })

    const newPlan = new Plan(req.body)
    const result = await newPlan.save()
    res.json(result)
});

planRouter.put("/:id",[auth,admin], async (req, res) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) return res.status(400).json({ message: "invalid id" })

    const p = await User.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "no plan with the given id" })

    const { error } = validateUser(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message })

    // plan.name = req.body.name
    // plan.price = req.body.price

    user.set(req.body)
    await plan.save();
    res.json(plan)
})

planRouter.delete("/:id",[auth,admin], async (req, res) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) return res.status(400).json({ message: "invalid id" })

    const p = await User.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "no plan with the given id" })

    const result = await Plan.findByIdAndDelete(req.params.id);
    res.json(result)
})

planRouter.put("/sub/:id" ,async(req , res)=>{
    // console.log(req.body.newSub)
    const ValidPlanId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!ValidPlanId) return res.status(400).json({ message: "invalid id for Plan " })
    const isValidId = mongoose.Types.ObjectId.isValid(req.body.newSub);
    if (!isValidId) return res.status(400).json({ message: "invalid id for UserId" })

    const p = await Plan.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "no plan with the given id" })


    const user = await User.findById(req.body.newSub);
    if (!user) return res.status(404).json({ message: "no user with the given id" })
    // console.log(p)
    const s = mongoose.Types.ObjectId(req.body.newSub);

    p.users.push(s);

    console.log(s);
    // sub.users.push(req.params.userid);
    res.json(p);
})


planRouter.put("/unsub/:id" ,async(req , res)=>{
    const ValidPlanId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!ValidPlanId) return res.status(400).json({ message: "invalid id for Plan " })
    const isValidId = mongoose.Types.ObjectId.isValid(req.body.newSub);
    if (!isValidId) return res.status(400).json({ message: "invalid id for UserId" })

    const p = await Plan.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "no plan with the given id" })

    const user = await User.findById(req.body.newSub);
    if (!user) return res.status(404).json({ message: "no user with the given id" })
    
    const s = mongoose.Types.ObjectId(req.body.newSub);
    const e = p.users.indexOf(s)
    p.users.splice(e,1);
    res.json(p);
})

module.exports = planRouter ; 