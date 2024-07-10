import { Router } from "express";
import playListController from "../controller/PlayListController";
import multer from "multer";
import { join } from "path";


const PlayListRouteAdmin = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, join(process.cwd(), "/public/playlist"))
    },
    filename: function (req, file, cb) {
        var f = file.mimetype.split('/')[1]
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `playlist-${file.fieldname}-${uniqueSuffix}.${f}`)
    }
})

const upload = multer({ storage: storage })
PlayListRouteAdmin.post("/AddNewPlayList", upload.single("avatar"), playListController.AddPlayListByAdmin)//0k
PlayListRouteAdmin.get("/playListDetailAdmin/:idplaylist", playListController.PlayListDetailAdmin)//0k
PlayListRouteAdmin.post("/UpdatePlayList", upload.single("avatar"), playListController.UpdatePlayListDetailAdmin)//0k
export default PlayListRouteAdmin