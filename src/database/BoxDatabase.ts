
import Mysql2 from "../config/Config"


export default class BoxDatabase {
    constructor() { }

    async getAllBoxById(idUser: string) {
        var sql = `SELECT u.Name,u.pathImage,idFriend as "idUser", bc.content,bc.id,bc.idBox,bc.boxtype,bc.messType, hb.status
            FROM havelistboxchat hb, boxchat bc , user u
            WHERE hb.idUser=? AND hb.idBox=bc.idBox AND u.id=hb.idFriend AND hb.status <> 0
            ORDER BY bc.updateDay DESC; `
        var check
        check = await Mysql2.query(sql, [idUser])
        return check
    }
    async insertNewBox(idBox: string, type: "friend" | "nofriend" | "group") {
        var sql = "INSERT INTO `boxchat`(`idBox`, `boxtype`) VALUES (?,?)"
        var check
        check = await Mysql2.query(sql, [idBox, type])
        return check
    }

    async UpdateLastMessBox(idUser: string, content: string, idBox: string, type: "Mess" | "Image" ) {
        var sql = "UPDATE boxchat SET content=?,id=?, updateDay=CURRENT_TIMESTAMP, messType=?  WHERE idBox =?"
        var check
        check = await Mysql2.query(sql, [content, idUser, type, idBox])
        return check
    }
    async GetBoxbyIdBox(idBox: string) {
        var sql = `SELECT * FROM boxchat WHERE idBox= ? `
        var check
        check = await Mysql2.query(sql, [idBox])
        return check
    }
    async UpdateBoxType(idBox: string, type: string) {
        var sql = "UPDATE boxchat SET boxtype= ? WHERE idbox= ?"
        var check = await Mysql2.query(sql, [type, idBox])
        return check
    }
}