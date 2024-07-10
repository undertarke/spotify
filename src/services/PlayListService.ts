import Mysql2 from "../config/Config"
import PlayListDatabase from "../database/PlayListDatabase"
import { PlayListModel } from "../model/PlayListModel"

export class PlayListService {
    playlist: PlayListDatabase
    constructor(playlist: PlayListDatabase) {
        this.playlist = playlist
    }
    async Add(d: PlayListModel) {
        var sql = "INSERT INTO playlist(id, User_id, Genre_ID, Type, ImagePath, PlayListName, Likes, Songs, Duration, Status, Discripition) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
        var check
        check = await Mysql2.query(sql, [d.id, d.User_id, d.Genre_ID, d.Type, d.ImagePath, d.PlayListName, d.Likes, d.Songs, d.Duration, d.Status, d.Discripition])
        return check
    }
    async Get(id: string) {
        var sql = "SELECT * FROM playlist WHERE id=?"
        var check
        check = await Mysql2.query(sql, [id])
        var ls = this.SetLs(check)
        return ls.length > 0 ? ls[0] : undefined;
    }
    async GetByGenre(Genre_ID: string, s: number, f: number) {
        var sql = `SELECT * FROM playlist WHERE Genre_ID in (SELECT g1.Id FROM genre g1, genre g2   WHERE g2.Id =? AND g1.LeftGenre >= g2.LeftGenre AND g1.RightGenre <= g2.RightGenre ) AND Type = 1 LIMIT ?,? `
        var check = await Mysql2.query(sql, [Genre_ID, s, f])
        return this.SetLs(check)
    }
    async GetByUser_id(User_id: string) {
        var sql = "SELECT * FROM playlist WHERE User_id=?"
        var ls = await Mysql2.query(sql, [User_id])
        return this.SetLs(ls)
    }

    async Update(d: PlayListModel) {
        var sql = "UPDATE playlist SET ImagePath=?,PlayListName=?,Likes=?,Songs=?,Duration=?,Status=?,Discripition=? WHERE id =?"
        var check
        check = await Mysql2.query(sql, [d.ImagePath, d.PlayListName, d.Likes, d.Songs, d.Duration, d.Status, d.Discripition, d.id])
        return check
    }
    SetLs(ls: any) {
        if (ls == undefined) {
            return []
        }
        var list: PlayListModel[] = []
        for (let i = 0; i < ls.length; i++) {
            const element = ls[i];
            var tem = new PlayListModel()
            tem.setAll(element)
            list.push(tem)
        }
        return list
    }
    async SearchPlaylistName(playlistName: string) {
        var sql = `SELECT * FROM playlist WHERE Type=1 AND PlayListName LIKE ?`
        var ls = await Mysql2.query(sql, [`%${playlistName}%`])
        return this.SetLs(ls)
    }
    async DeletePlaylist(id: string) {
        var sql = `Delete from playlist where id=?`
        var ls = await Mysql2.query(sql, [id])
        return this.SetLs(ls)
    }
    async DeleteSongInPlayList(id: string) {
        var sql = `Delete From contain where PlayList_id=?`
        var check
        check = await Mysql2.query(sql, [id])
        return check
    }
}

var playListService: PlayListService = new PlayListService(new PlayListDatabase())

export default playListService