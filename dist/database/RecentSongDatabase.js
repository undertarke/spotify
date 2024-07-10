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
    Add(user_id, Id_song) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "INSERT INTO recentsong(user_id, Id) VALUES (?,?)";
            var check = yield Config_1.default.query(sql, [user_id, Id_song]);
            return check;
        });
    }
    GetAllByidUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `SELECT song.* FROM recentsong, song WHERE recentsong.user_id=? AND song.Id =recentsong.Id ORDER BY recentsong.Time ASC`;
            var check = yield Config_1.default.query(sql, [id]);
            return check;
        });
    }
    Get(user_id, Id_song) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `SELECT song.* FROM recentsong, song WHERE recentsong.user_id=? AND recentsong.Id=?`;
            var check = yield Config_1.default.query(sql, [user_id, Id_song]);
            return check;
        });
    }
    UpdateTime(user_id, Id_song) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `UPDATE recentsong SET Time=CURRENT_TIMESTAMP WHERE user_id=? AND Id=?`;
            var check = yield Config_1.default.query(sql, [user_id, Id_song]);
            return check;
        });
    }
}
exports.default = LikedSongDatabase;
