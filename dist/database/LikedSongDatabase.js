"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../config/Config"));
class LikedSongDatabase {
    Add(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "INSERT INTO `likedsong`(`Id`, `id_user_liked`) VALUES (?,?)";
            var check = yield Config_1.default.query(sql, [d.Id, d.id_user_liked]);
            return check;
        });
    }
    Delete(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "DELETE FROM likedsong WHERE Id=? AND id_user=?";
            var check = yield Config_1.default.query(sql, [d.Id, d.id_user_liked]);
            return check;
        });
    }
    GetAll(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `SELECT song.Id, song.SongName,song.SongImage, song.Singer,song.Viewer,song.Duration,likedsong.liked 
    FROM song LEFT JOIN likedsong ON song.Id = likedsong.Id and likedsong.id_user_liked=? 
    WHERE song.user_id=? And song.status = 1;`;
            var check = yield Config_1.default.query(sql, [d.id_user_liked, d.user_id]);
            return check;
        });
    }
    Update(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `UPDATE likedsong SET liked=? WHERE Id = ? AND id_user_liked= ?`;
            var check = yield Config_1.default.query(sql, [d.liked, d.Id, d.id_user_liked,]);
            return check;
        });
    }
    Get(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `SELECT * FROM likedsong WHERE Id = ? AND id_user_liked = ?`;
            var check = yield Config_1.default.query(sql, [d.Id, d.id_user_liked]);
            return check;
        });
    }
    GetAllLikedSong(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `SELECT song.Id, song.SongName,song.SongImage, song.Singer,song.Viewer,song.Duration,likedsong.liked 
    FROM song, likedsong where likedsong.id_user_liked =? AND song.Id=likedsong.Id AND likedsong.liked=1
    `;
            var check = yield Config_1.default.query(sql, [d.id_user_liked]);
            return check;
        });
    }
    SearchName(name, iduser) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `SELECT song.Id, song.SongName,song.SongImage, song.Singer,song.Viewer,song.Duration,likedsong.liked 
    FROM song LEFT JOIN likedsong ON song.Id = likedsong.Id and likedsong.id_user_liked= ? 
    WHERE  song.status = 1 AND song.SongName like ?;`;
            var check;
            check = yield Config_1.default.query(sql, [iduser, `%${name}%`]);
            return check;
        });
    }
    GetAllByIdPlayList(id_user_liked, id_playlist) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `
     SELECT song.Id, song.SongName,song.SongImage, song.Singer,song.Viewer,song.Duration,likedsong.liked 
    FROM 
    song LEFT JOIN likedsong ON song.Id = likedsong.Id and likedsong.id_user_liked=?      
    LEFT JOIN contain on contain.Song_ID=song.Id
    WHERE contain.PlayList_id=? And song.status = 1;`;
            var check = yield Config_1.default.query(sql, [id_user_liked, id_playlist]);
            return check;
        });
    }
}
exports.default = LikedSongDatabase;
