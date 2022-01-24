const mongoose = require("mongoose");
const Joi = require("joi");

const planSchema = new mongoose.Schema({
    name: String,
    price: Number,
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            index: true
        }
    ]
});
const JoiSchema = Joi.object({
    name : Joi.string().required(),
    price : Joi.number().required(),
    users: Joi.any()
    
})

const ValidatePlan = (requestBody) => {
    return JoiSchema.validate(requestBody)
  }


const Plan = mongoose.model("plan", planSchema);

module.exports = { Plan , ValidatePlan};
