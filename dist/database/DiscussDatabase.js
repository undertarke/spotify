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
class DiscussDatabase {
    Add(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "INSERT INTO discuss(User_Id, Discuss_Id, Parent_discuss_Id, Replay_Discuss_Id, Content,Song_Id,Type) VALUES (?,?,?,?,?,?,?)";
            var check;
            check = yield Config_1.default.query(sql, [d.User_Id, d.Discuss_Id, d.Parent_discuss_Id, d.Replay_Discuss_Id, d.Content, d.Song_Id, d.Type]);
            return check;
        });
    }
    Increase(Parent_discuss_Id, n) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "UPDATE discuss SET Replay_quality = Replay_quality + ? WHERE Discuss_Id= ?";
            var check;
            check = yield Config_1.default.query(sql, [n, Parent_discuss_Id]);
            return check;
        });
    }
    DeIncrease(Parent_discuss_Id, n) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "UPDATE discuss SET Replay_quality = Replay_quality + ?  WHERE Discuss_Id= ?";
            var check;
            check = yield Config_1.default.query(sql, [n, Parent_discuss_Id]);
            return check;
        });
    }
    GetMainDiscussBySong_Id(Song_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT discuss.*,user.pathImage, user.Name FROM discuss,user WHERE discuss.User_Id=user.id AND discuss.Song_Id= ? AND discuss.Type=0 ORDER BY discuss.createtime DESC";
            var check;
            check = yield Config_1.default.query(sql, [Song_Id]);
            return check;
        });
    }
    GetReplayDiscussByParentDiscussId(Parent_discuss_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT discuss.*,user.pathImage, user.Name FROM discuss,user WHERE discuss.User_Id=user.id AND discuss.Parent_discuss_Id=?";
            var check;
            check = yield Config_1.default.query(sql, [Parent_discuss_Id]);
            return check;
        });
    }
    Get(Discuss_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT * FROM discuss  WHERE Discuss_Id=?";
            var check;
            check = yield Config_1.default.query(sql, [Discuss_Id]);
            return check;
        });
    }
    Delete(Discuss_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "DELETE FROM discuss WHERE Discuss_Id=?";
            var check;
            check = yield Config_1.default.query(sql, [Discuss_Id]);
            return check;
        });
    }
    DeleteChildren(Parent_discuss_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "DELETE FROM discuss WHERE Parent_discuss_Id=?";
            var check;
            check = yield Config_1.default.query(sql, [Parent_discuss_Id]);
            return check;
        });
    }
}
exports.default = DiscussDatabase;
