import Mysql2 from "../config/Config";
import ContainModel from "../model/ContainModel";

export default class ContainDatabse {
    constructor() {

    }
    async Add(d: ContainModel) {
        var sql = " INSERT INTO contain(Song_id, PlayList_id) VALUES (?,?) "
        var check
        check = await Mysql2.query(sql, [d.Song_id, d.PlayList_id])
        return check
    }
    async Get(d: ContainModel) {
        var sql = ` SELECT * FROM contain WHERE Song_id=? AND PlayList_id=? `
        var check
        check = await Mysql2.query(sql, [d.Song_id, d.PlayList_id])
        return check
    }
    async Delete(d: ContainModel) {
        var sql = `DELETE FROM contain WHERE Song_id=? AND PlayList_id=? `
        var check
        check = await Mysql2.query(sql, [d.Song_id, d.PlayList_id])
        return check
    }
    async GetAllByPlayList(PlayList_id: string) {
        var sql = "SELECT song.Id,song.SongName,song.Viewer,song.Singer,song.Duration,song.filePath,song.SongImage, contain.TimeCreate FROM contain,song WHERE contain.Song_ID=song.Id AND contain.PlayList_id=?"
        var check
        check = await Mysql2.query(sql, [PlayList_id])
        return check
    }
}