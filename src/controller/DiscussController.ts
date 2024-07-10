import { Request, Response } from "express";
import discussService, { DiscussService } from "../services/DiscussService";
import DiscussModel from "../model/DiscussModel";
import { v4 as uuidv4 } from 'uuid';
import userService, { UserService } from "../services/UserService";
import { NotificationModel } from "../model/NotificationModel";
import notificationService, { NotificationService } from "../services/NotificationService";
import songService, { SongService } from "../services/SongService";
class DiscussController {
    static disscuss: DiscussService = discussService
    static User: UserService = userService
    static notification: NotificationService = notificationService
    static song: SongService = songService
    async PostDisscus(req: Request, res: Response) {
        var d = new DiscussModel()
        d.setAll(req.body)
        d.Type = "0"
        d.Discuss_Id = `discuss-${uuidv4()}`
        d.User_Id = req.cookies.id

        var ls = await Promise.all([DiscussController.User.Get(d.User_Id),
        DiscussController.disscuss.Add(d),
        DiscussController.song.IncreaseNumberDiscuss(d.Song_Id)])

        d.setAll(ls[0])
        res.json({
            err: ls[1] == undefined,
            discuss: d
        })
    }
    async PostReplay(req: Request, res: Response) {
        var d = new DiscussModel()

        var no = new NotificationModel()

        
        d.setAll(req.body)
        d.Type = "1"
        d.Discuss_Id = `discuss-${uuidv4()}`
        d.User_Id = req.cookies.id

        var ls = await Promise.all([DiscussController.User.Get(d.User_Id),
        DiscussController.disscuss.Increase(d.Parent_discuss_Id),
        DiscussController.disscuss.Get(d.Replay_Discuss_Id),
        DiscussController.song.IncreaseNumberDiscuss(d.Song_Id),
        ])
        if (ls[1] == undefined && ls[2] == undefined) {
            res.json({
                err: true
            })
            return
        }
        no.receiver_id = ls[2]?.User_Id as string
        no.Discuss_Id = d.Discuss_Id
        no.Song_Id=d.Song_Id
        no.replay_user_id=d.User_Id

        if (ls[2]?.User_Id != d.User_Id) {
            var cn = await DiscussController.notification.Add(no)
        }

        var check2 = await DiscussController.disscuss.Add(d)
        d.setAll(ls[0])
        res.json({
            err: check2 == undefined,
            discuss: d
        })
    }
    async GetMainDiscuss(req: Request, res: Response) {
        var SongId = req.body.SongId
        var ls = await Promise.all([DiscussController.disscuss.GetMainDiscussBySong_Id(SongId),
        DiscussController.song.Get(SongId)])
        res.json({
            ls: ls[0],
            song: ls[1],
            err: false,
            id: req.cookies.id
        })
    }
    async GetReplayDiscuss(req: Request, res: Response) {
        var Parent_discuss_Id = req.body.ParentId
        var ls = await DiscussController.disscuss.GetReplayDiscussByParentDiscussId(Parent_discuss_Id)

        res.json({
            ls: ls,
            err: false,
            id: req.cookies.id
        })
    }
    async Delete(req: Request, res: Response) {
        var discuss_id = req.body.id
        var id = req.cookies.id
        var ls = await Promise.all([
            DiscussController.disscuss.Delete(discuss_id),
            DiscussController.disscuss.DeleteChildren(discuss_id),
            DiscussController.notification.Delete(discuss_id, id)
            , DiscussController.disscuss.Get(discuss_id)
        ])
        if (ls[3]) {
            DiscussController.song.DeincreaseNumberDiscuss(ls[3].Song_Id, parseInt(ls[3].Replay_quality + "") + 1)
        }

        res.json({
            err: ls[0] == undefined
        })
    }

}


const discussController = new DiscussController()


export default discussController