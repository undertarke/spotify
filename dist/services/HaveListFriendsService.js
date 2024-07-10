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
exports.HaveListFriendsService = void 0;
const Config_1 = __importDefault(require("../config/Config"));
const HaveListFriendsDatabase_1 = __importDefault(require("../database/HaveListFriendsDatabase"));
const HaveListFriendsModel_1 = __importDefault(require("../model/HaveListFriendsModel"));
class HaveListFriendsService {
    constructor(i) {
        this.data = i;
    }
    InsertListFriends(idUser, idFriend, IsFriend) {
        return __awaiter(this, void 0, void 0, function* () {
            var d = {
                "Request": "0",
                "Responsd": "1",
                "Friend": "2"
            };
            let sql = `INSERT INTO havelistfriends(idUser, idFriends,IsFriend) VALUES (?,?,?)`;
            var check = yield Config_1.default.query(sql, [idUser, idFriend, IsFriend]);
            return check;
        });
    }
    Setls(ls) {
        if (ls == undefined) {
            return [];
        }
        var lts = [];
        for (let i = 0; i < ls.length; i++) {
            const element = ls[i];
            var temp = new HaveListFriendsModel_1.default();
            temp.setAll(element);
            lts.push(temp);
        }
        return lts;
    }
    Get(idUser, idAddFriends) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT * FROM havelistfriends WHERE idUser=? AND idFriends=? ";
            var check = yield Config_1.default.query(sql, [idUser, idAddFriends]);
            return this.Setls(check)[0];
        });
    }
    GetAllTypeFriend(idUser, IsFriend) {
        return __awaiter(this, void 0, void 0, function* () {
            var d = {
                "Request": "0",
                "Responsd": "1",
                "Friend": "2"
            };
            let sql = `SELECT u.id,u.Name,u.pathImage FROM havelistfriends h,user u WHERE u.id=h.idFriends AND h.idUser =?  AND h.IsFriend= ?`;
            var check = yield Config_1.default.query(sql, [idUser, d[IsFriend]]);
            return this.Setls(check);
        });
    }
    CancelFriends(idUser, idFriend) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `DELETE FROM havelistfriends WHERE idUser = ? AND idFriends = ?`;
            var check = yield Config_1.default.query(sql, [idUser, idFriend]);
            return check;
        });
    }
    AcceptRequset(idUser, idFriend) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `UPDATE havelistfriends SET IsFriend=? WHERE idUser=? AND idFriends=?`;
            var check = yield Config_1.default.query(sql, ["2", idUser, idFriend]);
            return check;
        });
    }
    SearchName(name, iduse, type) {
        return __awaiter(this, void 0, void 0, function* () {
            type = type || "";
            var sql = `SELECT * FROM user LEFT JOIN havelistfriends ON user.id=havelistfriends.idFriends
        AND havelistfriends.idUser=? WHERE user.Name LIKE ?  AND havelistfriends.IsFriend like ?`;
            var check;
            check = yield Config_1.default.query(sql, [iduse, `%${name}%`, `%${type}%`]);
            return this.Setls(check);
        });
    }
    SearchOther(name, iduse) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `SELECT * FROM user LEFT JOIN havelistfriends ON user.id=havelistfriends.idFriends AND havelistfriends.idUser= ?
        WHERE user.role ="user" AND user.Name LIKE ? AND user.id <> ? AND user.id NOT IN (
            SELECT havelistfriends.idFriends FROM havelistfriends WHERE havelistfriends.idUser= ? AND havelistfriends.IsFriend=2 
        )`;
            var check;
            check = yield Config_1.default.query(sql, [iduse, `%${name}%`, iduse, iduse]);
            return this.Setls(check);
        });
    }
}
exports.HaveListFriendsService = HaveListFriendsService;
var haveListFriendsService = new HaveListFriendsService(new HaveListFriendsDatabase_1.default());
exports.default = haveListFriendsService;
