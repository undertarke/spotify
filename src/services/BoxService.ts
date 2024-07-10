import Mysql2 from "../config/Config"
import BoxDatabase from "../database/BoxDatabase"
import BoxModel from "../model/BoxModel"

export class BoxService {

    constructor() {

    }
    async getAllBoxByIdUser(idUser: string) {
        var sql = `SELECT u.Name,u.pathImage,idFriend as "idUser", bc.content,bc.id,bc.idBox,bc.boxtype,bc.messType, hb.status
        FROM havelistboxchat hb, boxchat bc , user u
        WHERE hb.idUser=? AND hb.idBox=bc.idBox AND u.id=hb.idFriend AND hb.status <> 0
        ORDER BY bc.updateDay DESC; `
        var ls = await Mysql2.query(sql, [idUser])
        return this.setlsBox(ls)
    }
    async insertNewBox(idBox: string, type: "friend" | "nofriend" | "group") {
        var sql = "INSERT INTO `boxchat`(`idBox`, `boxtype`) VALUES (?,?)"
        var check
        check = await Mysql2.query(sql, [idBox, type])
        return check

    }

    private setlsBox(any: any) {
        var list: BoxModel[] = []
        if (any == undefined) {
            return []
        }

        for (let i = 0; i < any.length; i++) {
            const element = any[i];
            var box = new BoxModel();
            box.setAll(element);
            list.push(box);
        }
        return list
    }
    async UpdateBoxType(idBox: string, type: string) {
        var sql = "UPDATE boxchat SET boxtype= ? WHERE idbox= ?"
        var check = await Mysql2.query(sql, [type, idBox])
        return check
    }

    async UpdateLastMessBox(idUser: string, content: string, idBox: string, type: "Mess" | "Image") {
        var sql = "UPDATE boxchat SET content=?,id=?, updateDay=CURRENT_TIMESTAMP, messType=?  WHERE idBox =?"
        var check
        check = await Mysql2.query(sql, [content, idUser, type, idBox])
        return check
    }
    async GetBoxbyIdBox(idBox: string) {
        var box: BoxModel | undefined
        try {
            var sql = `SELECT * FROM boxchat WHERE idBox= ? `
            var ls = await Mysql2.query(sql, [idBox]) as []
            for (let i = 0; i < ls.length; i++) {
                const element = ls[i];
                box = new BoxModel()
                box.setAll(element)
                break
            }
        } catch (error) {
            console.log(error);

        }
        return box;
    }
}


var boxService: BoxService = new BoxService()
export default boxService