import Mysql2 from "../config/Config";
import DiscussModel from "../model/DiscussModel";


export default class DiscussDatabase {
    async Add(d: DiscussModel) {
        var sql = "INSERT INTO discuss(User_Id, Discuss_Id, Parent_discuss_Id, Replay_Discuss_Id, Content,Song_Id,Type) VALUES (?,?,?,?,?,?,?)"
        var check
        check = await Mysql2.query(sql, [d.User_Id, d.Discuss_Id, d.Parent_discuss_Id, d.Replay_Discuss_Id, d.Content, d.Song_Id, d.Type])
        return check
    }
    async Increase(Parent_discuss_Id: string, n: number) {
        var sql = "UPDATE discuss SET Replay_quality = Replay_quality + ? WHERE Discuss_Id= ?"
        var check
        check = await Mysql2.query(sql, [n, Parent_discuss_Id])
        return check
    }
    async DeIncrease(Parent_discuss_Id: string, n: number) {
        var sql = "UPDATE discuss SET Replay_quality = Replay_quality + ?  WHERE Discuss_Id= ?"
        var check
        check = await Mysql2.query(sql, [n, Parent_discuss_Id])
        return check
    }
    async GetMainDiscussBySong_Id(Song_Id: string) {
        var sql = "SELECT discuss.*,user.pathImage, user.Name FROM discuss,user WHERE discuss.User_Id=user.id AND discuss.Song_Id= ? AND discuss.Type=0 ORDER BY discuss.createtime DESC"
        var check
        check = await Mysql2.query(sql, [Song_Id])
        return check
    }
    async GetReplayDiscussByParentDiscussId(Parent_discuss_Id: string) {
        var sql = "SELECT discuss.*,user.pathImage, user.Name FROM discuss,user WHERE discuss.User_Id=user.id AND discuss.Parent_discuss_Id=?"
        var check
        check = await Mysql2.query(sql, [Parent_discuss_Id])
        return check
    }
    async Get(Discuss_Id: string) {
        var sql = "SELECT * FROM discuss  WHERE Discuss_Id=?"
        var check
        check = await Mysql2.query(sql, [Discuss_Id])
        return check
    }

    async Delete(Discuss_Id: string) {
        var sql = "DELETE FROM discuss WHERE Discuss_Id=?"
        var check
        check = await Mysql2.query(sql, [Discuss_Id])
        return check
    }
    async DeleteChildren(Parent_discuss_Id: string) {
        var sql = "DELETE FROM discuss WHERE Parent_discuss_Id=?"
        var check
        check = await Mysql2.query(sql, [Parent_discuss_Id])
        return check
    }
}