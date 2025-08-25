import express from "express";
import type { Application, Router, Request, Response } from "express";
import homeController from "../controller/homeController.js";

const router: Router = express.Router();

const initWebRoutes = (app: Application) => {
  // cách 1
  router.get("/", (req: Request, res: Response) => {
    return res.send("Huỳnh Quốc Thắng - 2210423");
  });

  // cách 2: gọi hàm trong controller
  router.get("/home", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.getFindAllCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  return app.use("/", router);
};

export default initWebRoutes;