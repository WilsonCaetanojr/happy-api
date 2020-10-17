import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/upload";
import OrphanagesController from "./controllers/OrphanagesController";

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/orphanages", OrphanagesController.index);
routes.post("/orphanages", OrphanagesController.create);
routes.get(
  "/orphanages/detail/:id",
  upload.array("images"),
  OrphanagesController.show
);

export default routes;
