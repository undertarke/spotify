import { Request, Response } from "express";
import haveListBoxChatService, { HaveListBoxChatService } from "../services/HaveListBoxChatService";
import messService, { MessService } from "../services/MessService";
import BoxModel from "../model/BoxModel";
import MessModel from "../model/MessModel";
import boxService, { BoxService } from "../services/BoxService";
import { v4 } from 'uuid';
import hiddenMessService from "../services/HiddenMessService";
import io from "../server";
import sharp from "sharp";
import { join } from "path";
import { unlink } from "fs";
export class MessController {

    static haveListBoxChat: HaveListBoxChatService = haveListBoxChatService
    static mess: MessService = messService
    static box: BoxService = boxService
    static hiddenMess = hiddenMessService
    constructor() {

    }
    async GetAllMessInbox(req: Request, res: Response) {
        var id = req.cookies.id;
        var idBox = req.body.idBox;
        MessController.haveListBoxChat.visualBoxChat(id, idBox)
        var ls = await Promise.all([MessController.mess.GetAllContentByidBox(idBox, id),
        MessController.haveListBoxChat.GetInforBoxByidUserAndIdBox(id, idBox)])
        res.json({
            err: false,
            mess: ls[0],
            infor: ls[1],
            myid: id,
            now: ls[0][ls[0].length - 1]?.ngay || -1
        })
    }
    async SendMess(req: Request, res: Response) {
        var mess: MessModel = new MessModel()
        mess.setAll(req.body)
        mess.idUser = req.cookies.id
        mess.idMess = `Mess-${v4()}`

        let inbox = await MessController.haveListBoxChat.IsIdUserInBox(mess.idUser, mess.idBox);

        if (inbox == undefined) {
            res.json({
                err: true
            })
            return
        }
        let v = await Promise.all([
            MessController.haveListBoxChat.visualBoxChat(mess.idUser, mess.idBox),
            MessController.haveListBoxChat.SetNotSeenInBox(mess.idUser, mess.idBox),
            MessController.mess.InsertContentIn(mess),
            MessController.box.UpdateLastMessBox(mess.idUser, mess.content, mess.idBox, "Mess"),
            MessController.haveListBoxChat.GetIdUserInBox(mess.idUser, mess.idBox)
        ]);

        v[4].map((v) => {
            io.to(v.idUser).emit("mess",
                {
                    idMess: mess.idMess,
                    content: mess.content,
                    idBox: mess.idBox,
                    idUser: mess.idUser,
                    ngay: new Date(),
                    type: "Mess"
                })
        })

        res.json({
            err: v[2] == undefined
        })
    }
    async HiddenMess(req: Request, res: Response) {
        var idMess = req.body.idMess
        var id = req.cookies.id
        if (idMess == undefined) {
            res.json({})
            return
        }

        var data = await MessController.hiddenMess.GetHiddenMessByidMessidUser(idMess, id)
        if (data) {
            res.json({ err: true })
            return
        }
        MessController.hiddenMess.InsertHiddenmess(idMess, id)
        res.json({ err: false })
    }
    async Remove(req: Request, res: Response) {
        var idmess = req.body.idMess
        var s = req.cookies.id;


        var f = await MessController.mess.GetMessById(idmess)
        var iduser = s
        if (f == undefined) {
            res.json({
                err: true,
            })
            return
        }
        if (iduser == (f.idUser + "")) {
            await Promise.all([MessController.hiddenMess.DelHiddenMess(idmess),
            MessController.mess.DelMessById(idmess, iduser)])


            if (f.type == "image") {
                var ls = f.content.split("@")
                ls.map((v) => {
                    if (v.length <= 0) {
                        return
                    }
                    var input = join(process.cwd(), "public/upload", v.replace("i/", ""))
                    unlink(input, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                })
            }
            res.json({
                err: false,
            })
            return
        }
        MessController.hiddenMess.InsertHiddenmess(idmess, iduser)
        res.json({
            err: false,
        })
    }
    async Image(req: Request, res: Response) {
        var files = req.files as Express.Multer.File[]
        var s = files.map(async (v) => {
            var input = join(process.cwd(), "public/upload", v.filename)
            var output = join(process.cwd(), "public/upload", `${v.filename}.jpg`)

            try {
                await sharp(input)
                    .jpeg({ force: false, quality: 10, progressive: true })
                    .png({ palette: true, quality: 1, compressionLevel: 9, progressive: true, force: false })
                    .toFile(output)
            } catch (error) {
                console.log(error);
            }
            return `${v.filename}.jpg`
        })
        var ls = await Promise.all(s)

        files.map(async (v) => {
            var input = join(process.cwd(), "public/upload", v.filename)
            unlink(input, (err) => {
                if (err) {
                    console.log(err);
                }
            })
        })
        var messfile = ls.reduce((a, b) => {
            a += `i/${b}@`
            return a
        }, "")

        var mess = new MessModel()

        mess.content = messfile
        mess.idBox = req.body.idbox
        mess.idMess = `Mess-${v4()}`
        mess.idUser = req.cookies.id
        mess.type = "image"

        let inbox = await MessController.haveListBoxChat.IsIdUserInBox(mess.idUser, mess.idBox);

        if (inbox == undefined) {
            res.json({
                err: true
            })
            return
        }
        let v = await Promise.all([
            MessController.haveListBoxChat.visualBoxChat(mess.idUser, mess.idBox),
            MessController.haveListBoxChat.SetNotSeenInBox(mess.idUser, mess.idBox),
            MessController.mess.InsertContentIn(mess),
            MessController.box.UpdateLastMessBox(mess.idUser, mess.content, mess.idBox, "Image"),
            MessController.haveListBoxChat.GetIdUserInBox(mess.idUser, mess.idBox)
        ]);

        v[4].map((v) => {
            io.to(v.idUser).emit("mess", { idMess: mess.idMess, content: mess.content, idBox: mess.idBox, type: "Image", idUser: mess.idUser, ngay: new Date() })
        })

        res.json({
            err: v[2] == undefined
        })
    }
    async NextMessList(req: Request, res: Response) {
        var id = req.cookies.id;
        var idBox = req.body.idBox;
        var now = req.body.now
        var ls = await MessController.mess.GetAllContentByidBox(idBox, id, now)


        res.json({
            err: false,
            ls: ls,
            now: ls.length == 0 ? "-1" : ls[ls.length - 1].ngay
        })
    }
}


const messController = new MessController()

export default messController