import Mysql2 from "../config/Config";
import MessModel from "../model/MessModel";
export default class MessDatabase {
    async GetAllContentByidBox(idBox: string, idUser: string, now: string) {
        let sql = ` SELECT *  
        FROM messenge m 
        WHERE m.idBox= ? AND m.ngay > 
        (SELECT h.ngay FROM havelistboxchat h WHERE h.idBox = ? AND h.idUser = ? ) 
        AND  m.idMess NOT IN (SELECT hd.idMess FROM hiddenmesslist hd WHERE hd.idUser = ? ) 
        AND m.ngay < ? ORDER BY ngay DESC LIMIT 12`
        var check = await Mysql2.query(sql, [idBox, idBox, idUser, idUser, now]);
        return check;
    }
    async InsertContentIn(d: MessModel) {

        var sql = "INSERT INTO messenge ( idMess,idBox, content, type,idUser) VALUES (?,?,?,?,?)"
        var check = await Mysql2.query(sql, [d.idMess, d.idBox, d.content, d.type, d.idUser]);
        return check;
    }
    async GetMessById(idMess: string) {
        let sql = `SELECT * FROM messenge Where idMess=? `
        var check = await Mysql2.query(sql, [idMess]);
        return check;
    }
    async DelMessById(idMess: string, idUser: string) {
        let sql = `DELETE FROM messenge WHERE idMess = ? AND idUser= ?`
        var check = await Mysql2.query(sql, [idMess, idUser]);
        return check;
    }
}