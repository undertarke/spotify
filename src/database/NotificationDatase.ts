import Mysql2 from "../config/Config";
import { NotificationModel } from "../model/NotificationModel";

export default class NotificationDatase {
    async Add(d: NotificationModel) {
        var sql = "INSERT INTO notification(receiver_id, Discuss_Id, Song_Id, replay_user_id) VALUES (?,?,?,?)";
        var check = await Mysql2.query(sql, [d.receiver_id, d.Discuss_Id, d.Song_Id, d.replay_user_id]);
        return check;

    }
    async GetAllByUserid(receiver_id: string) {
        var sql = `SELECT notification.*,song.SongImage,song.SongName,discuss.User_Id,discuss.Parent_discuss_Id, discuss.Replay_Discuss_Id,discuss.Content,discuss.Song_Id,discuss.Parent_discuss_Id ,user.pathImage,user.Name 
        FROM notification 
        LEFT JOIN discuss ON notification.Discuss_Id=discuss.Discuss_Id
        LEFT JOIN song ON notification.Song_Id=song.Id
        LEFT JOIN user ON notification.replay_user_id=user.id
        WHERE notification.receiver_id=? `;
        var check = await Mysql2.query(sql, [receiver_id]);
        return check;
    }
    async Delete(discuss_id: string, receiver_id: string) {
        var sql = "DELETE FROM notification WHERE discuss_id=? AND receiver_id=?";
        var check = await Mysql2.query(sql, [discuss_id, receiver_id]);
        return check;
    }
}