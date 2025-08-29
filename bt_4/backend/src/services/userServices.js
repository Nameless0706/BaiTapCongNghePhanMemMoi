require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { name } = require("ejs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const createUserService = async (name, email, password) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      console.log(">>> User already exists");
      return null;
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let result = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      role: "User",
    });

    return result;
  } catch (error) {
    console.log(">>> Error createUserService: ", error);
    throw error;
  }
};

const loginService = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return {
          EC: 2,
          EM: "Wrong email or password",
        };
      } else {
        const payload = {
          email: user.email,
          name: user.name,
        };

        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        return {
          EC: 0,
          accessToken: accessToken,
          EM: "Login success",
          user: {
            email: user.email,
            name: user.name,
            role: user.role,
          },
        };
      }
    } else {
      return {
        EC: 1,
        EM: "User not found",
      };
    }
  } catch (error) {
    console.log(">>> Error loginService: ", error);
    throw error;
  }
};

const getUserService = async () => {
  try {
    const users = await User.find({}).select("-password -__v");
    return users;
  } catch (error) {
    console.log(">>> Error getUserService: ", error);
    throw error;
  }
};

module.exports = {
  createUserService,
  loginService,
  getUserService,
};
