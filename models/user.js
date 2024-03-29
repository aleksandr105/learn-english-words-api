const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

// eslint-disable-next-line no-useless-escape
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: emailRegex,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: "",
    },
    statistic: {
      type: {
        correctAnswers: {
          type: Number,
          default: 0,
        },
        incorrectAnswers: {
          type: Number,
          default: 0,
        },
      },
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
  language: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().required(),
  language: Joi.string(),
});

const resendSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
});

const statisticSchema = Joi.object({
  answer: Joi.string().valid("correct", "incorrect").required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  registerSchema,
  loginSchema,
  resendSchema,
  statisticSchema,
};
