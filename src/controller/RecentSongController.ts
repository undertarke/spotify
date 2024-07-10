import { Request, Response } from "express";
import recentSongService, { RecentSongService } from "../services/RecentSongService";

class RecentSongController {
    static recentSong: RecentSongService = recentSongService
    constructor() {

    }

    async GetAllByidUser(req: Request, res: Response) {
        var id = req.cookies.id
        var ls = await RecentSongController.recentSong.GetAllByidUser(id)
        res.json({
            err: false,
            ls: ls
        })
    }
}

var recentSongController = new RecentSongController()


export default recentSongController