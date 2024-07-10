import { Router } from "express";
import userController from "../controller/UserController";
const UserRouteAdmin = Router()


UserRouteAdmin.post("/userlist", userController.GetAllUserAdmin)//0k
UserRouteAdmin.post("/addE", userController.AddEAdmin)//0k
UserRouteAdmin.post("/getE", userController.GetAllEAdmin)//0k
UserRouteAdmin.post("/deE", userController.DeleteEAdmin)//0k

UserRouteAdmin.get("/edit/:id", userController.GetEditUser)//0k
UserRouteAdmin.post("/edit", userController.PostEditUser)//0k
UserRouteAdmin.post("/VertifyArtist", userController.VertifyArtist)//OK
export default UserRouteAdmin