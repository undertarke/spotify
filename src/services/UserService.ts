import Mysql2 from "../config/Config";
import UserDatabase from "../database/UserDatabase";
import UserModel from "../model/UserModel";

export class UserService {
    userDatabae: UserDatabase
    constructor(i: UserDatabase) {
        this.userDatabae = i
    }
    async Add(d: UserModel) {
        var check
        await this.userDatabae.Add(d)

        return check
    }
    async Get(id: string) {
        var user: UserModel | undefined
        var check = await this.userDatabae.Get(id) as UserModel[]
        if (check && check.length > 0) {
            user = new UserModel()
            user.setAll(check[0])
        }
        return user
    }
    async VertifyAccount(user_id: string, Vertify: string) {
        var check = await this.userDatabae.VertifyAccount(user_id, "1")
        return check
    }
    async GetByAccount(account: string) {
        var user: UserModel | undefined
        var check = await this.userDatabae.GetByAccount(account) as UserModel[]
        if (check && check.length > 0) {
            user = new UserModel()
            user.setAll(check[0])
        }
        return user
    }
    async getAllArtist(Vertify: string) {
        var check
        check = await this.userDatabae.getAllArtist(Vertify)
        var ls = this.SetList(check)
        return ls
    }
    async GetAccountByAccAndPass(acc: string, pass: string) {
        var user: UserModel | undefined
        var sql = "SELECT * FROM user WHERE Account=? AND Password =? "
        var check
        check = await Mysql2.query(sql, [acc, pass]) as UserModel[]

        if (check && check.length > 0) {
            user = new UserModel()
            user.setAll(check[0])
        }
        return user
    }
    SetList(ls: any) {
        if (ls == undefined) {
            return []
        }
        var check: UserModel[] = []
        for (let id = 0; id < ls.length; id++) {
            const element = ls[id];
            var user = new UserModel()
            user.setAll(element)
            check.push(user)
        }

        return check
    }
    async AddAccount(d: UserModel) {
        var sql = "INSERT INTO user(id, Account, Name, Vertify, Nationality, ChanalName, pathImage, description, RefeshToken, Password, Banner,role) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"
        var check
        check = await Mysql2.query(sql, [d.id, d.Account, d.Name, d.Vertify, d.Nationality, d.ChanalName, d.pathImage, d.description, d.RefeshToken, d.Password, d.Banner, d.role])
        return check

    }
    async UpdatePassword(d: UserModel) {
        var check
        check = await this.userDatabae.UpdatePassword(d)
        return check
    }
    async SearchNameArtist(name: string) {
        var ls = await this.userDatabae.SearchNameArtist(name)
        return this.SetList(ls)
    }
    async Update(d: UserModel) {
        var sql = "UPDATE `user` SET `Name`=?,`Nationality`=?,`ChanalName`=?,`pathImage`=? WHERE id=? "
        var check
        check = await Mysql2.query(sql, [d.Name, d.Nationality, d.ChanalName, d.pathImage, d.id])
        return check
    }
    async GetAllUserByType(Vertify: "" | "0" | "1") {
        var sql = "SELECT * FROM `user` WHERE Vertify LIKE ? AND role = 'user' "
        var ls
        ls = await Mysql2.query(sql, [`%${Vertify}%`]) as []
        return this.SetList(ls)
    }
    async GetAllEAdmin(role: string) {
        var sql = "SELECT * FROM user WHERE role LIKE ? AND role <> 'master' "
        var ls
        ls = await Mysql2.query(sql, [`%${role}%`]) as []
        return this.SetList(ls)
    }
    async DeleteEAdmin(id: string) {
        var sql = "Delete FROM user WHERE id = ? AND role = 'employee' "
        var ls
        ls = await Mysql2.query(sql, [id]) as []
        return this.SetList(ls)
    }
    async UpdateE(d: UserModel) {
        var sql = "UPDATE user SET Name=?, Password=? , role=? WHERE id= ?"
        var check = await Mysql2.query(sql, [d.Name, d.pathImage, d.role, d.id])
        return check
    }
}


var userService = new UserService(new UserDatabase())

export default userService