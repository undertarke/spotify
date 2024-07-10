import Mysql2 from "../config/Config"

export default class HiddenMessDatabase {
    constructor() {
    }
    async InsertHiddenmess(idMess: string, idUser: string) {
        let sql = `INSERT INTO hiddenmesslist(idUser, idMess) VALUES (?,?) `
        var check = await Mysql2.query(sql, [idUser, idMess])
        return check
    }
    async DelHiddenmess(idMess: string) {
        let sql = `DELETE FROM hiddenmesslist WHERE idMess=? `
        var check = await Mysql2.query(sql, [idMess])
        return check
    }
    async GetHiddenMessByidMessidUser(idMess: string, idUser: string) {
        let sql = `SELECT * FROM hiddenmesslist WHERE idUser=? AND idMess=?`
        var check = await Mysql2.query(sql, [idUser, idMess])
        return check
    }
}


