import Mysql2 from "../config/Config"

export default class HaveListFriendsDatabase {
    constructor() {

    }

    async InsertListFriends(idUser: string, idFriend: string, IsFriend: "0" | "1" | "2") {
        let sql = `INSERT INTO havelistfriends(idUser, idFriends,IsFriend) VALUES (?,?,?)`
        var check = await Mysql2.query(sql, [idUser, idFriend, IsFriend])
        return check
    }
    async Get(idUser: string, idAddFriends: string) {
        var sql = "SELECT * FROM havelistfriends WHERE idUser=? AND idFriends=? ";
        var check = await Mysql2.query(sql, [idUser, idAddFriends])
        return check
    }

    async CancelFriends(idUser: string, idFriend: string) {
        let sql = `DELETE FROM havelistfriends WHERE idUser = ? AND idFriends = ?`
        var check = await Mysql2.query(sql, [idUser, idFriend])
        return check
    }
    async GetAllTypeFriend(idUser: string, IsFriend: "0" | "1" | "2") {
        let sql = `SELECT u.id,u.Name,u.pathImage FROM havelistfriends h,user u WHERE u.id=h.idFriends AND h.idUser =?  AND h.IsFriend= ?`
        var check = await Mysql2.query(sql, [idUser, IsFriend])
        return check
    }
    async UpDateType(idUser: string, idFriend: string, IsFriend: "0" | "1" | "2") {
        let sql = `UPDATE havelistfriends SET IsFriend=? WHERE idUser=? AND idFriends=?`
        var check = await Mysql2.query(sql, [IsFriend, idUser, idFriend])
        return check
    }

    async SearchName(name: string, iduse: string, type: string) {
        var sql = `SELECT * FROM user LEFT JOIN havelistfriends ON user.id=havelistfriends.idFriends
        AND havelistfriends.idUser=? WHERE user.Name LIKE ?  AND havelistfriends.IsFriend like ?`
        var check
        check = await Mysql2.query(sql, [iduse, `%${name}%`, `%${type}%`])
        return check
    }
    async SearchOther(name: string, iduse: string) {
        var sql = `SELECT * FROM user LEFT JOIN havelistfriends ON user.id=havelistfriends.idFriends AND havelistfriends.idUser= ?
        WHERE user.Name LIKE ? AND user.id <> ? AND user.id NOT IN (
            SELECT havelistfriends.idFriends FROM havelistfriends WHERE havelistfriends.idUser= ? AND havelistfriends.IsFriend=2 
        )`
        var check
        check = await Mysql2.query(sql, [iduse, `%${name}%`, iduse, iduse])
        return check
    }
}