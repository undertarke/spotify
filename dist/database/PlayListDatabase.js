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
class PlayListDatabase {
    Add(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "INSERT INTO playlist(id, User_id, Genre_ID, Type, ImagePath, PlayListName, Likes, Songs, Duration, Status, Discripition) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
            var check;
            check = yield Config_1.default.query(sql, [d.id, d.User_id, d.Genre_ID, d.Type, d.ImagePath, d.PlayListName, d.Likes, d.Songs, d.Duration, d.Status, d.Discripition]);
            return check;
        });
    }
    Get(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT * FROM playlist WHERE id=?";
            var check;
            check = yield Config_1.default.query(sql, [d]);
            return check;
        });
    }
    GetByGenre(Genre_ID, s, f) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `SELECT * FROM playlist WHERE Genre_ID in (SELECT g1.Id FROM genre g1, genre g2   WHERE g2.Id =? AND g1.LeftGenre >= g2.LeftGenre AND g1.RightGenre <= g2.RightGenre ) AND Type = 1 LIMIT ?,? `;
            var check;
            check = yield Config_1.default.query(sql, [Genre_ID, s, f]);
            return check;
        });
    }
    GetByUser_id(User_id) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT * FROM playlist WHERE User_id=?";
            var check;
            check = yield Config_1.default.query(sql, [User_id]);
            return check;
        });
    }
    Update(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "UPDATE playlist SET ImagePath=?,PlayListName=?,Likes=?,Songs=?,Duration=?,Status=?,Discripition=? WHERE id =?";
            var check;
            check = yield Config_1.default.query(sql, [d.ImagePath, d.PlayListName, d.Likes, d.Songs, d.Duration, d.Status, d.Discripition, d.id]);
            return check;
        });
    }
    SearchPlaylistName(playlistName) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `SELECT * FROM playlist WHERE Type=1 AND PlayListName LIKE ?`;
            var check = yield Config_1.default.query(sql, [`%${playlistName}%`]);
            return check;
        });
    }
}
exports.default = PlayListDatabase;
