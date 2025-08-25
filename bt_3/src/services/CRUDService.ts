import bcrypt from "bcryptjs";
import db from "../models/index.js";
import { User } from "../models/user.js"; 
import type { Optional } from "sequelize";

const salt = bcrypt.genSaltSync(10);

// Định nghĩa type cho dữ liệu user tạo mới
interface UserInput extends Optional<User, "id"> {}

const hashUserPassword = async (password: string): Promise<string> => {
  return bcrypt.hashSync(password, salt);
};

const createNewUser = async (data: UserInput): Promise<string> => {
  try {
    const hashPasswordFromBcrypt = await hashUserPassword(data.password);
    await db.User.create({
      email: data.email,
      password: hashPasswordFromBcrypt,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      phoneNumber: data.phoneNumber,
      gender: data.gender === "1" ? true : false,
      roleId: data.roleId,
    });
    return "Create a new user succeed!";
  } catch (e) {
    console.error("Sequelize error:", e);
    throw e;
  }
};

const getFindAllUser = async (): Promise<User[]> => {
  try {
    const users = await db.User.findAll({ raw: true });
    return users;
  } catch (e) {
    console.error("Sequelize error:", e);
    throw e;
  }
};

const getUserInfoById = async (userId: number): Promise<User | null> => {
  try {
    const user = await db.User.findOne({
      where: { id: userId },
      raw: true,
    });
    return user;
  } catch (e) {
    console.error("Sequelize error:", e);
    throw e;
  }
};

const updateUserData = async (data: UserInput): Promise<User[] | void> => {
  try {
    const user = await db.User.findOne({ where: { id: data.id } });
    if (user) {
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.address = data.address;

      await user.save();

      const allUsers = await db.User.findAll();
      return allUsers;
    }
  } catch (e) {
    console.error("Sequelize error:", e);
    throw e;
  }
};

const deleteUserById = async (userId: number): Promise<void> => {
  try {
    const user = await db.User.findOne({ where: { id: userId } });
    if (user) {
      await user.destroy();
    }
  } catch (e) {
    console.error("Sequelize error:", e);
    throw e;
  }
};

export default {
  createNewUser,
  getFindAllUser,
  getUserInfoById,
  updateUserData,
  deleteUserById,
};
