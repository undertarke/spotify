import { NextFunction, Router, Request, Response } from "express";
import songController from "../controller/SongController";
const SongRoute = Router()
import multer from 'multer'
import { join } from "path";
import { v4 as uuidv4 } from 'uuid';
import userService, { UserService } from "../services/UserService";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, join(process.cwd(), "/public/image"))
    },
    filename: function (req, file, cb) {
        var f = file.mimetype.split('/')[1]
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${file.fieldname}-${uniqueSuffix}.${f}`)
    }
})
const storageSongFile = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, join(process.cwd(), "/public/music"))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = uuidv4()
        cb(null, `music-${uniqueSuffix}`)
    }
})

async function isArtist(req: Request, res: Response, next: NextFunction) {
    var s = await userService.Get(req.cookies.id)
    if (s == undefined || s.Vertify == 0) {
        res.json({
            err: true,
            mess: "bạn không phải nghệ sĩ"
        })
        return
    }
    next()
}

const upload = multer({ storage: storage })
SongRoute.post("/Update", upload.single("avatar"), songController.Update)//0k
SongRoute.post("/Upload", isArtist, songController.Upload)//0k

const uploadSongFile = multer({ storage: storageSongFile })
SongRoute.post("/FileSong", isArtist, uploadSongFile.single("songfile"), songController.FileSong)//0k

SongRoute.post("/SongList", songController.SongList)//0k
SongRoute.post("/get", songController.GetSong)//0k
SongRoute.post("/NewUpdate", upload.single("avatar"), songController.NewUpdate)//0k
SongRoute.post("/newupload", songController.NewUpload)
SongRoute.post("/upStatus", songController.UpStatus)//0k
SongRoute.get("/valisong/:idpage", songController.GetValidateAll)

SongRoute.post("/NextSong", songController.NextSong)

//admin
SongRoute.post("/GetSongByGenre", songController.GetSongByGenre)//0k
export default SongRoute