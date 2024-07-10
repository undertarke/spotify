import notificationService, { NotificationService } from "../services/NotificationService";
import { Request, Response } from "express";
export class NotificationController {
    static notification: NotificationService = notificationService
    async GetAll(req: Request, res: Response) {
        var id = req.cookies.id
        var ls = await NotificationController.notification.GetAllByUserid(id)
        res.json({
            err: false,
            ls: ls
        })
    }
    async Delete(req: Request, res: Response) {
        var c = req.body.id
        var id = req.cookies.id
        var check = await NotificationController.notification.Delete(c, id)
        res.json({
            err: check == undefined,

        })
    }
}

const notificationController = new NotificationController()


export default notificationController