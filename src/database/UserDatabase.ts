import UserModel from "../model/UserModel"
import Mysql2 from "../config/Config"

class UserDatabase {
    constructor() {

    }
    async Add(d: UserModel) {
        var sql = "INSERT INTO user(id, Account, Name, Nationality) VALUES (?,?,?,?) "
        var check
        check = await Mysql2.query(sql, [d.id, d.Account, d.Name, d.Nationality])
        return check
    }
    async Get(id: string) {
        var sql = "SELECT * FROM user WHERE id=?"
        var check
        check = await Mysql2.query(sql, [id])
        return check
    }
    async VertifyAccount(user_id: string, Vertify: string) {
        var sql = "UPDATE user SET Vertify= ? WHERE id = ?"
        var check
        check = await Mysql2.query(sql, [Vertify, user_id])
        return check
    }
    async GetByAccount(account: string) {
        var sql = "SELECT * FROM user WHERE Account =?"
        var check
        check = await Mysql2.query(sql, [account])
        return check
    }
    async getAllArtist(Vertify: string) {
        var sql = "SELECT * FROM user WHERE Vertify = ?"
        var check
        check = await Mysql2.query(sql, [Vertify])
        return check
    }
    async AddAccount(d: UserModel) {
        var sql = "INSERT INTO user(id, Account, Name, Vertify, Nationality, ChanalName, pathImage, description, RefeshToken, Password, Banner,role) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"
        var check
        check = await Mysql2.query(sql, [d.id, d.Account, d.Name, d.Vertify, d.Nationality, d.ChanalName, d.pathImage, d.description, d.RefeshToken, d.Password, d.Banner, d.role])
        return check
    }
    async UpdatePassword(d: UserModel) {
        var sql = "UPDATE user SET RefeshToken='',Password= ? WHERE Account=?"
        var check
        check = await Mysql2.query(sql, [d.Password, d.Account])
        return check
    }
    async SearchNameArtist(name: string) {
        var sql = "SELECT * FROM user WHERE Name like ? AND Vertify <> 0 "
        var check
        check = await Mysql2.query(sql, [`%${name}%`])
        return check
    }
    async GetAccountByAccAndPass(acc: string, pass: string) {
        var sql = "SELECT * FROM user WHERE Account=? AND Password =? "
        var check
        check = await Mysql2.query(sql, [acc, pass])
        return check
    }
    async Update(d: UserModel) {
        var sql = "UPDATE `user` SET `Name`=?,`Nationality`=?,`ChanalName`=?,`pathImage`=? WHERE id=? "
        var check
        check = await Mysql2.query(sql, [d.Name, d.Nationality, d.ChanalName, d.pathImage, d.id])
        return check
    }


    async GetAllUserByType(Vertify: "" | "0" | "1") {
        var sql = "SELECT * FROM `user` WHERE Vertify LIKE ? AND role <> 'master' "
        var check
        check = await Mysql2.query(sql, [`%${Vertify}%`])
        return check
    }
}


export default UserDatabase