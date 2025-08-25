import type { Request, Response } from "express";
import db from "../models/index.js"; 
import CRUDService from "../services/CRUDService.js";

const getHomePage = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await db.User.findAll();
    console.log("----------------");
    console.log(data);
    console.log("----------------");

    res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
};

const getAboutPage = (req: Request, res: Response): void => {
  res.render("test/about.ejs");
};

const getCRUD = (req: Request, res: Response): void => {
  res.render("crud.ejs");
};

const getFindAllCRUD = async (req: Request, res: Response): Promise<void> => {
  const data = await CRUDService.getFindAllUser();
  console.log("----------------");
  console.log(data);
  console.log("----------------");

  res.render("users/findAllUser.ejs", {
    datalist: data,
  });
};

const postCRUD = async (req: Request, res: Response): Promise<void> => {
  const message = await CRUDService.createNewUser(req.body);
  console.log(message);
  res.send("post crud from server");
};

const getEditCRUD = async (req: Request, res: Response): Promise<void> => {
  const userId = req.query.id as string;
  if (userId) {
    const userData = await CRUDService.getUserInfoById(userId);
    if (userData) {
      res.render("users/editCRUD.ejs", {
        data: userData,
      });
    } else {
      res.send("User not found!");
    }
  } else {
    res.send("User not found!");
  }
};

const putCRUD = async (req: Request, res: Response): Promise<void> => {
  const data = req.body;
  const data1 = await CRUDService.updateUser(data);
  res.render("users/findAllUser.ejs", {
    datalist: data1,
  });
};

const deleteCRUD = async (req: Request, res: Response): Promise<void> => {
  const id = req.query.id as string;
  if (id) {
    await CRUDService.deleteUserById(id);
    res.send("Delete the user succeed!");
  } else {
    res.send("User not found!");
  }
};

export default {
  getHomePage,
  getAboutPage,
  getCRUD,
  postCRUD,
  getFindAllCRUD,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
};
