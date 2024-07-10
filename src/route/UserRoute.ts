import { Router } from "express";
import userController from "../controller/UserController";
import multer from "multer";
import { join } from "path";


const UserRoute = Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, join(process.cwd(), "/public/avatar"))
    },
    filename: function (req, file, cb) {
        var f = file.mimetype.split('/')[1]
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${file.fieldname}-${uniqueSuffix}.${f}`)
    }
})

const upload = multer({ storage: storage })

UserRoute.get("/signin", userController.SignIn)
UserRoute.get("/", userController.Get)//0k
UserRoute.get("/artist", (req, res) => {
    userController.getAllArtist(req, res)
})//0k
UserRoute.get("/artisepage/:artisepage", userController.getArtisePage)//0k
UserRoute.post("/update", upload.single("avatar"), userController.update)
export default UserRoute 