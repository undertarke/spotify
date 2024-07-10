import Mysql2 from "../config/Config"
export default class HaveListBoxChatDatabase {
    async UpdateStatusBox(idUser: string, idBox: string, status: string) {
        let sql = "";
        if (status == "0") {
            sql = `UPDATE havelistboxchat 
                      SET status= ? , ngay=CURRENT_TIMESTAMP
                      WHERE idUser = ? AND idBox = ?`;
        } else {
            sql = `UPDATE havelistboxchat 
                      SET status= ?
                      WHERE idUser = ? AND idBox = ?`;
        }
        var check
        check = await Mysql2.query(sql, [status, idUser, idBox])
        return check
    }

    async GetIdBoxbyIdUserAndIdFriend(
        idUser: string,
        idFriend: string
    ) {
        var sql =
            "SELECT h.*, us.* FROM havelistboxchat h, user us, boxchat bc WHERE h.idUser=? AND h.idFriend=? AND us.id=h.idFriend AND h.idBox=bc.idBox AND bc.boxtype <>'group'"
        var check
        check = await Mysql2.query(sql, [idUser, idFriend])
        return check
    }
    async GetInforBoxByidUserAndIdBox(
        idUser: string,
        IdBox: string
    ) {
        var sql =
            "SELECT h.*, us.* FROM havelistboxchat h, user us, boxchat bc WHERE h.idUser=? AND h.idBox=? AND us.id=h.idFriend AND h.idBox=bc.idBox AND bc.boxtype <>'group'"
        var check
        check = await Mysql2.query(sql, [idUser, IdBox])
        return check
    }
    async InsertIdToNewBox(idUser: string, idBox: string, idFriend: string, admin: string) {
        var sql = `INSERT INTO havelistboxchat
              (idBox, idUser, status,idFriend,admin) 
              VALUES (?,?,0,?,?)`;
        var check
        check = await Mysql2.query(sql, [idBox, idUser, idFriend, admin])
        return check
    }
    async GetIdUserInBox(idBox: string, idUser: string) {
        var sql = `SELECT h.idUser
            FROM havelistboxchat h
            WHERE  h.idBox = ? 
            GROUP BY h.idUser`;
        var check
        check = await Mysql2.query(sql, [idBox])
        return check
    }
    async IsIdUserInBox(idUser: string, idBox: string) {
        var sql = `SELECT idUser  FROM havelistboxchat WHERE idUser = ? AND idBox = ?`;
        var check
        check = await Mysql2.query(sql, [idUser, idBox])
        return check
    }
    async SetNotSeenInBox(idUser: string, idBox: string) {
        var sql = `
            UPDATE havelistboxchat 
            SET status = 2
            WHERE idUser <> ? AND idBox = ?`;
        var check = await Mysql2.query(sql, [idUser, idBox])
        return check

    }
    async GetHaveListidBoxByIdUser(idUser: string, idBox: string) {
        var sql = ` SELECT * FROM havelistboxchat WHERE idUser=? AND idBox=? `;
        var check = await Mysql2.query(sql, [idUser, idBox])
        return check
    }

}