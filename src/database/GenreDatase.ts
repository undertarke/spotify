import Mysql2 from "../config/Config"
import GenreModel from "../model/GenreModel"

export default class GenreDatase {

    constructor() {

    }
    async Add(d: GenreModel) {
        var sql = " INSERT INTO genre(Id, Name, RightGenre, LeftGenre,idParent,Floor) VALUES (?,?,?,?,?,?)"
        var check
        check = await Mysql2.query(sql, [d.Id, d.Name, d.RightGenre, d.LeftGenre, d.idParent, d.Floor])
        return check
    }
    async Get(id: string) {
        var sql = "SELECT * FROM genre WHERE Id=? "
        var check
        check = await Mysql2.query(sql, [id])
        return check
    }
    async GetAll() {
        var sql = "SELECT * FROM genre ORDER BY Floor ASC "
        var check
        check = await Mysql2.query(sql, [])
        return check
    }
    async GetAllLeftAndRight(Left: string, Right: string) {
        var sql = "SELECT * FROM genre where LeftGenre > ? AND RightGenre < ?"
        var check
        check = await Mysql2.query(sql, [Left, Right])
        return check
    }
    async DeleteBlank(Right: string) {
        var sql = "UPDATE genre SET RightGenre = RightGenre - 2 WHERE RightGenre > ? "
        var sql2 = "UPDATE genre SET LeftGenre = LeftGenre - 2 WHERE LeftGenre > ?"

        var check = await Promise.all([Mysql2.query(sql, [Right]), Mysql2.query(sql2, [Right])])
        return check
    }
    async Delete(id: string) {
        var sql = "DELETE FROM genre WHERE id = ?"
        var check = await Mysql2.query(sql, [id])
        return check
    }
    async GetGenreByName(name: string) {
        var sql = "SELECT * FROM genre where Name LIKE ?"
        var check
        check = await Mysql2.query(sql, [`%${name}%`])
        return check
    }
    async GetAllByidParent(id: string) {
        var sql = "SELECT * FROM genre where idParent = ?"
        var check
        check = await Mysql2.query(sql, [id])
        return check
    }
    async GetMaxRight() {
        var sql = "SELECT MAX(RightGenre) as max FROM genre "
        var check
        check = await Mysql2.query(sql, [])
        return check
    }
    async CreateBlank(Right: number) {
        var sql = "UPDATE genre SET RightGenre = RightGenre + 2 WHERE RightGenre >= ? "
        var sql2 = "UPDATE genre SET LeftGenre = LeftGenre + 2 WHERE LeftGenre > ?"

        var check = await Promise.all([Mysql2.query(sql, [Right]), Mysql2.query(sql2, [Right])])
        return check
    }
    async UpdateName(name: string, id: string) {
        var sql = "UPDATE genre SET Name = ? WHERE Id =? "
        var check = await Mysql2.query(sql, [name, id])
        return check
    }
    async GetIdParentByIdplaylist(Idplaylist: string) {
        var sql = ` SELECT g2.* FROM genre g1,playlist pl, genre g2
        WHERE pl.Genre_ID=g1.Id AND pl.id= ? AND g1.LeftGenre >= g2.LeftGenre AND g2.RightGenre >= g1.RightGenre`
        var check = await Mysql2.query(sql, [Idplaylist])
        return check
    }
    async GetAllByLimitFloor(floor: number) {
        var sql = "SELECT * FROM genre where Floor < ? ORDER BY Floor ASC "
        var check
        check = await Mysql2.query(sql, [floor])
        return check
    }
    async GetChildrenByIdParent(idParent:string){
        var sql = "SELECT g2.* FROM genre g1,genre g2 WHERE g1.id =? AND g1.RightGenre > g2.RightGenre AND g1.LeftGenre < g2.LeftGenre "
        var check
        check = await Mysql2.query(sql, [idParent])
        return check
    }
}