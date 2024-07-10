import Mysql2 from "../config/Config";
import { PlayListModel } from "../model/PlayListModel";

export default class PlayListDatabase {
    async Add(d: PlayListModel) {
        var sql = "INSERT INTO playlist(id, User_id, Genre_ID, Type, ImagePath, PlayListName, Likes, Songs, Duration, Status, Discripition) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
        var check
        check = await Mysql2.query(sql, [d.id, d.User_id, d.Genre_ID, d.Type, d.ImagePath, d.PlayListName, d.Likes, d.Songs, d.Duration, d.Status, d.Discripition])
        return check
    }
    async Get(d: string) {
        var sql = "SELECT * FROM playlist WHERE id=?"
        var check
        check = await Mysql2.query(sql, [d])
        return check
    }


    async GetByGenre(Genre_ID: string, s: number, f: number) {
        var sql = `SELECT * FROM playlist WHERE Genre_ID in (SELECT g1.Id FROM genre g1, genre g2   WHERE g2.Id =? AND g1.LeftGenre >= g2.LeftGenre AND g1.RightGenre <= g2.RightGenre ) AND Type = 1 LIMIT ?,? `
        var check
        check = await Mysql2.query(sql, [Genre_ID, s, f])
        return check
    }
    async GetByUser_id(User_id: string) {
        var sql = "SELECT * FROM playlist WHERE User_id=?"
        var check
        check = await Mysql2.query(sql, [User_id])
        return check
    }
    async Update(d: PlayListModel) {
        var sql = "UPDATE playlist SET ImagePath=?,PlayListName=?,Likes=?,Songs=?,Duration=?,Status=?,Discripition=? WHERE id =?"
        var check
        check = await Mysql2.query(sql, [d.ImagePath, d.PlayListName, d.Likes, d.Songs, d.Duration, d.Status, d.Discripition, d.id])
        return check
    }

    async SearchPlaylistName(playlistName: string) {
        var sql = `SELECT * FROM playlist WHERE Type=1 AND PlayListName LIKE ?`
        var check = await Mysql2.query(sql, [`%${playlistName}%`])
        return check
    }
}
