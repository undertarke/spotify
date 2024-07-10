import Mysql2 from "../config/Config";
import LikedSongModel from "../model/LikedSongModel";

export default class LikedSongDatabase {
  async Add(d: LikedSongModel) {
    var sql = "INSERT INTO `likedsong`(`Id`, `id_user_liked`) VALUES (?,?)";
    var check = await Mysql2.query(sql, [d.Id, d.id_user_liked]);
    return check;
  }
  async Delete(d: LikedSongModel) {
    var sql = "DELETE FROM likedsong WHERE Id=? AND id_user=?";
    var check = await Mysql2.query(sql, [d.Id, d.id_user_liked]);
    return check;
  }
  async GetAll(d: LikedSongModel) {
    var sql = `SELECT song.Id, song.SongName,song.SongImage, song.Singer,song.Viewer,song.Duration,likedsong.liked 
    FROM song LEFT JOIN likedsong ON song.Id = likedsong.Id and likedsong.id_user_liked=? 
    WHERE song.user_id=? And song.status = 1;`;
    var check = await Mysql2.query(sql, [d.id_user_liked, d.user_id]);
    return check;
  }
  async Update(d: LikedSongModel) {
    var sql = `UPDATE likedsong SET liked=? WHERE Id = ? AND id_user_liked= ?`;
    var check = await Mysql2.query(sql, [d.liked, d.Id, d.id_user_liked,]);
    return check;
  }
  async Get(d: LikedSongModel) {
    var sql = `SELECT * FROM likedsong WHERE Id = ? AND id_user_liked = ?`;
    var check = await Mysql2.query(sql, [d.Id, d.id_user_liked]);
    return check;
  }
  async GetAllLikedSong(d: LikedSongModel) {
    var sql = `SELECT song.Id, song.SongName,song.SongImage, song.Singer,song.Viewer,song.Duration,likedsong.liked 
    FROM song, likedsong where likedsong.id_user_liked =? AND song.Id=likedsong.Id AND likedsong.liked=1
    `;
    var check = await Mysql2.query(sql, [d.id_user_liked]);
    return check;
  }
  async SearchName(name: string, iduser: string) {
    var sql = `SELECT song.Id, song.SongName,song.SongImage, song.Singer,song.Viewer,song.Duration,likedsong.liked 
    FROM song LEFT JOIN likedsong ON song.Id = likedsong.Id and likedsong.id_user_liked= ? 
    WHERE  song.status = 1 AND song.SongName like ?;`;
    var check
    check = await Mysql2.query(sql, [iduser, `%${name}%`])
    return check
  }
  async GetAllByIdPlayList(id_user_liked: string, id_playlist: string) {
    var sql = `
     SELECT song.Id, song.SongName,song.SongImage, song.Singer,song.Viewer,song.Duration,likedsong.liked 
    FROM 
    song LEFT JOIN likedsong ON song.Id = likedsong.Id and likedsong.id_user_liked=?      
    LEFT JOIN contain on contain.Song_ID=song.Id
    WHERE contain.PlayList_id=? And song.status = 1;`;
    var check = await Mysql2.query(sql, [id_user_liked, id_playlist]);
    return check;
  }
}
