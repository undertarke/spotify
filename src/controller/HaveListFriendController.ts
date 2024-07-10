import { Request, Response } from "express";
import haveListFriendsService, { HaveListFriendsService } from "../services/HaveListFriendsService";
import io from "../server";
class HaveListFriendController {
    static haveListFriend: HaveListFriendsService = haveListFriendsService
    constructor() {

    }
    async AddFriendsRequset(req: Request, res: Response) {
        var id = req.cookies.id;
        var idFriend: string = req.body.idFriend;
        if (id === idFriend) {
            res.json({ err: true, mess: "bạn không thể kết bạn với mình" });
            return;
        }
        var check: boolean = false;
        await Promise.all([
            HaveListFriendController.haveListFriend.Get(id, idFriend),
            HaveListFriendController.haveListFriend.Get(idFriend, id),
        ])
            .then((v) => {
                if (v[0] || v[1]) {
                    check = true;
                } else {
                    check = false;
                }
            })
            .catch((v) => {
                check = true;
            });
        if (check) {
            res.json({ err: true, mess: "là bạn bè rui hoặc có gửi lời kết bạn" });
            return;
        }// 0 gửi yêu cầu kết bạn  1 chấp nhận yêu cầu kết bạn 2 là bạn bè
        var check1 = await HaveListFriendController.haveListFriend.InsertListFriends(id, idFriend, "Request");
        var check1 = await HaveListFriendController.haveListFriend.InsertListFriends(idFriend, id, "Responsd");
        if (check1) {
            io.to(idFriend).emit("tb", "yêu cầu kết bạn");
        }
        res.json({ err: false, mess: "bạn đã giử thành công" })
    };
    async CancelRequst(req: Request, res: Response) {
        var id = req.cookies.id
        var idFriend = req.body.idFriend
        var c = await Promise.all([HaveListFriendController.haveListFriend.CancelFriends(id, idFriend),
        HaveListFriendController.haveListFriend.CancelFriends(idFriend, id)])
        res.json({
            err: c[0] == undefined
        })
    }
    async AcceptRequset(req: Request, res: Response) {
        var id = req.cookies.id
        var idFriend = req.body.id
        var c = await Promise.all([HaveListFriendController.haveListFriend.AcceptRequset(id, idFriend),
        HaveListFriendController.haveListFriend.AcceptRequset(idFriend, id)])
        res.json({
            err: c[0] == undefined
        })
    }
    async GetAllFriend(req: Request, res: Response) {
        var id = req.cookies.id
        var ls = await HaveListFriendController.haveListFriend.GetAllTypeFriend(id, "Friend")
        res.json({
            err: false,
            ls: ls
        })
    }
    async GetRespond(req: Request, res: Response) {
        var id = req.cookies.id
        var ls = await HaveListFriendController.haveListFriend.GetAllTypeFriend(id, "Responsd")
        res.json({
            err: false,
            ls: ls
        })
    }
}


const haveListFriendController = new HaveListFriendController()

export default haveListFriendController