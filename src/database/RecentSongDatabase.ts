import Mysql2 from "../config/Config";
import RecentSongModel from "../model/RecentSongModel";

export default class LikedSongDatabase {
    async Add(user_id: string, Id_song: string) {
        var sql = "INSERT INTO recentsong(user_id, Id) VALUES (?,?)";
        var check = await Mysql2.query(sql, [user_id, Id_song]);
        return check;
    }
    async GetAllByidUser(id: string) {
        var sql = `SELECT song.* FROM recentsong, song WHERE recentsong.user_id=? AND song.Id =recentsong.Id ORDER BY recentsong.Time ASC`;
        var check = await Mysql2.query(sql, [id]);
        return check;
    }
    async Get(user_id: string, Id_song: string) {
        var sql = `SELECT song.* FROM recentsong, song WHERE recentsong.user_id=? AND recentsong.Id=?`;
        var check = await Mysql2.query(sql, [user_id, Id_song]);
        return check;
    }
    async UpdateTime(user_id: string, Id_song: string) {
        var sql = `UPDATE recentsong SET Time=CURRENT_TIMESTAMP WHERE user_id=? AND Id=?`;
        var check = await Mysql2.query(sql, [user_id, Id_song]);
        return check;
    }
}