import { Router } from "express";
import notificationController from "../controller/NotificationController";

const NotificationRoute = Router()

NotificationRoute.post("/all", notificationController.GetAll)//0k
NotificationRoute.post("/delete", notificationController.Delete)//0k

export default NotificationRoute