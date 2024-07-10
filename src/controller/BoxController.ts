import boxService, { BoxService } from "../services/BoxService";
import { Request, Response } from "express";
import userService, { UserService } from "../services/UserService";
import BoxModel from "../model/BoxModel";
import { v4 as uuidv4 } from 'uuid';
import haveListBoxChatService, { HaveListBoxChatService } from "../services/HaveListBoxChatService";
import messService, { MessService } from "../services/MessService";
import MessModel from "../model/MessModel";
import haveListFriendsService, { HaveListFriendsService } from "../services/HaveListFriendsService";
export class BoxController {
    static box: BoxService = boxService
    static user: UserService = userService
    static haveListBoxChat: HaveListBoxChatService = haveListBoxChatService
    static mess: MessService = messService
    static haveListFriend: HaveListFriendsService = haveListFriendsService
    constructor() {
    }

    async GetAllBoxChat(req: Request, res: Response) {
        var id = req.cookies.id;
        var ls = await BoxController.box.getAllBoxByIdUser(id);
        res.json({
            err: false,
            ls: ls
        })

    }
    async Chat(req: Request, res: Response) {
        let id = req.cookies.id;
        var idFriend = req.body.idFriend;


        if (id == idFriend) {
            res.json({ err: true, mess: "bạn ko thể chat cho mình" })
            return
        }
        let user = await BoxController.user.Get(idFriend)
        if (!user) {
            res.json({ err: true, mess: "không có người này" })
            return
        }

        let box: BoxModel = new BoxModel()
        var li: BoxModel[] = await BoxController.haveListBoxChat.GetIdBoxbyIdUserAndIdFriend(id, idFriend);

        if (li.length > 0) {
            // có hộp thoại giữa hai người
            box.setAll(li[0])

            res.json({
                err: false,
                idbox: box.idBox,
            })
            return
        }

        //chưa có hộp thoại giữa hai người
        var idbox = `idbox-${uuidv4()}`
        await BoxController.box.insertNewBox(idbox, "friend")
        let isFriend: string = ""
        var isfriend = (await BoxController.haveListFriend.Get(id, idFriend)).IsFriend
        isFriend = isfriend == 2 ? "Friend" : "noFriend"
        await Promise.all([
            BoxController.haveListBoxChat.InsertIdToNewBox(id, idbox, idFriend),
            BoxController.box.UpdateBoxType(idbox, isFriend),
            BoxController.haveListBoxChat.InsertIdToNewBox(idFriend, idbox, id)])
        var box1 = await BoxController.box.GetBoxbyIdBox(idbox)
        res.json({
            err: box1 == undefined,
            idbox: idbox,
        })
    }
    async Remove(req: Request, res: Response) {
        let id = req.cookies.id;
        var idBox = req.body.idBox;
        var check = await BoxController.haveListBoxChat.HiddenBoxChat(id, idBox)
        res.json({
            err: check == undefined
        })
    }
}

const boxController = new BoxController()

export default boxController