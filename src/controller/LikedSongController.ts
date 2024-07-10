import { Request, Response } from "express";
import likedSongService, { LikedSongService } from "../services/LikedSongService";
import LikedSongModel from "../model/LikedSongModel";

class LikedSongController {
    static likedSongService: LikedSongService = likedSongService
    constructor() {
    }

    async Add(req: Request, res: Response) {
        var id_user_liked = req.cookies.id
        var Id = req.body.Id
        var temp = new LikedSongModel()
        temp.Id = Id
        temp.id_user_liked = id_user_liked
        var check
        var get = await LikedSongController.likedSongService.Get(temp)
        

        if (get == undefined) {
            get = temp
            get.liked = 1
            check = await LikedSongController.likedSongService.Add(temp)
        }
        else {
            if (get.liked == 1) {
                get.liked = 0
            } else {
                get.liked = 1
            }

            check = await LikedSongController.likedSongService.Update(get)
        }


        res.json({
            err: check == undefined,
            liked: get.liked
        })
    }
    async Delete(req: Request, res: Response) {
        var id_user_liked = req.cookies.id
        var Id = req.body.Id
        var temp = new LikedSongModel()
        temp.Id = Id
        temp.id_user_liked = id_user_liked
        var check = await LikedSongController.likedSongService.Delete(temp)
        res.json({
            err: check == undefined
        })
    }
    async GetAll(req: Request, res: Response) {
        var id_user_liked = req.cookies.id
        var user_id = req.params.idartise
        var temp = new LikedSongModel()
        temp.user_id = user_id
        temp.id_user_liked = id_user_liked
        var check = await LikedSongController.likedSongService.GetAll(temp)

        res.json({
            err: check.length == 0,
            ls: check
        })
    }
    async GetAllLikedSong(req: Request, res: Response) {
        var id_user_liked = req.cookies.id
        var d = new LikedSongModel
        d.id_user_liked = id_user_liked
        var ls = await LikedSongController.likedSongService.GetAllLikedSong(d)
        res.json({
            err: false,
            ls: ls
        })
    }

}

var likedSongController = new LikedSongController()
export default likedSongController