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
class NotificationDatase {
    Add(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "INSERT INTO notification(receiver_id, Discuss_Id, Song_Id, replay_user_id) VALUES (?,?,?,?)";
            var check = yield Config_1.default.query(sql, [d.receiver_id, d.Discuss_Id, d.Song_Id, d.replay_user_id]);
            return check;
        });
    }
    GetAllByUserid(receiver_id) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `SELECT notification.*,song.SongImage,song.SongName,discuss.User_Id,discuss.Parent_discuss_Id, discuss.Replay_Discuss_Id,discuss.Content,discuss.Song_Id,discuss.Parent_discuss_Id ,user.pathImage,user.Name 
        FROM notification 
        LEFT JOIN discuss ON notification.Discuss_Id=discuss.Discuss_Id
        LEFT JOIN song ON notification.Song_Id=song.Id
        LEFT JOIN user ON notification.replay_user_id=user.id
        WHERE notification.receiver_id=? `;
            var check = yield Config_1.default.query(sql, [receiver_id]);
            return check;
        });
    }
    Delete(discuss_id, receiver_id) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "DELETE FROM notification WHERE discuss_id=? AND receiver_id=?";
            var check = yield Config_1.default.query(sql, [discuss_id, receiver_id]);
            return check;
        });
    }
}
exports.default = NotificationDatase;
