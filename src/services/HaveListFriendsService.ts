import Mysql2 from "../config/Config";
import HaveListFriendsDatabase from "../database/HaveListFriendsDatabase";
import HaveListFriendsModel from "../model/HaveListFriendsModel";

export class HaveListFriendsService {
    data: HaveListFriendsDatabase
    constructor(i: HaveListFriendsDatabase) {
        this.data = i
    }

    async InsertListFriends(idUser: string, idFriend: string, IsFriend: "Request" | "Responsd" | "Friend") {
        var d: any = {
            "Request": "0",
            "Responsd": "1",
            "Friend": "2"
        }
        let sql = `INSERT INTO havelistfriends(idUser, idFriends,IsFriend) VALUES (?,?,?)`
        var check = await Mysql2.query(sql, [idUser, idFriend, IsFriend])
        return check
    }

    Setls(ls: any) {
        if (ls == undefined) {
            return []
        }
        var lts: HaveListFriendsModel[] = []

        for (let i = 0; i < ls.length; i++) {
            const element = ls[i];
            var temp = new HaveListFriendsModel()
            temp.setAll(element)
            lts.push(temp)
        }
        return lts
    }
    async Get(idUser: string, idAddFriends: string) {
        var sql = "SELECT * FROM havelistfriends WHERE idUser=? AND idFriends=? ";
        var check = await Mysql2.query(sql, [idUser, idAddFriends])
        return this.Setls(check)[0]
    }
    async GetAllTypeFriend(idUser: string, IsFriend: "Request" | "Responsd" | "Friend") {
        var d: any = {
            "Request": "0",
            "Responsd": "1",
            "Friend": "2"
        }
        let sql = `SELECT u.id,u.Name,u.pathImage FROM havelistfriends h,user u WHERE u.id=h.idFriends AND h.idUser =?  AND h.IsFriend= ?`
        var check = await Mysql2.query(sql, [idUser, d[IsFriend]])
        return this.Setls(check)
    }
    async CancelFriends(idUser: string, idFriend: string) {
        let sql = `DELETE FROM havelistfriends WHERE idUser = ? AND idFriends = ?`
        var check = await Mysql2.query(sql, [idUser, idFriend])
        return check
    }
    async AcceptRequset(idUser: string, idFriend: string) {
        let sql = `UPDATE havelistfriends SET IsFriend=? WHERE idUser=? AND idFriends=?`
        var check = await Mysql2.query(sql, ["2", idUser, idFriend])
        return check
    }
    async SearchName(name: string, iduse: string, type?: string) {
        type = type || ""
        var sql = `SELECT * FROM user LEFT JOIN havelistfriends ON user.id=havelistfriends.idFriends
        AND havelistfriends.idUser=? WHERE user.Name LIKE ?  AND havelistfriends.IsFriend like ?`
        var check
        check = await Mysql2.query(sql, [iduse, `%${name}%`, `%${type}%`])
        return this.Setls(check)
    }
    async SearchOther(name: string, iduse: string) {
        var sql = `SELECT * FROM user LEFT JOIN havelistfriends ON user.id=havelistfriends.idFriends AND havelistfriends.idUser= ?
        WHERE user.role ="user" AND user.Name LIKE ? AND user.id <> ? AND user.id NOT IN (
            SELECT havelistfriends.idFriends FROM havelistfriends WHERE havelistfriends.idUser= ? AND havelistfriends.IsFriend=2 
        )`
        var check
        check = await Mysql2.query(sql, [iduse, `%${name}%`, iduse, iduse])
        return this.Setls(check)
    }
}

var haveListFriendsService = new HaveListFriendsService(new HaveListFriendsDatabase())
export default haveListFriendsService