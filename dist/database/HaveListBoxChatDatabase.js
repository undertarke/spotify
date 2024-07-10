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
class HaveListBoxChatDatabase {
    UpdateStatusBox(idUser, idBox, status) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "";
            if (status == "0") {
                sql = `UPDATE havelistboxchat 
                      SET status= ? , ngay=CURRENT_TIMESTAMP
                      WHERE idUser = ? AND idBox = ?`;
            }
            else {
                sql = `UPDATE havelistboxchat 
                      SET status= ?
                      WHERE idUser = ? AND idBox = ?`;
            }
            var check;
            check = yield Config_1.default.query(sql, [status, idUser, idBox]);
            return check;
        });
    }
    GetIdBoxbyIdUserAndIdFriend(idUser, idFriend) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT h.*, us.* FROM havelistboxchat h, user us, boxchat bc WHERE h.idUser=? AND h.idFriend=? AND us.id=h.idFriend AND h.idBox=bc.idBox AND bc.boxtype <>'group'";
            var check;
            check = yield Config_1.default.query(sql, [idUser, idFriend]);
            return check;
        });
    }
    GetInforBoxByidUserAndIdBox(idUser, IdBox) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT h.*, us.* FROM havelistboxchat h, user us, boxchat bc WHERE h.idUser=? AND h.idBox=? AND us.id=h.idFriend AND h.idBox=bc.idBox AND bc.boxtype <>'group'";
            var check;
            check = yield Config_1.default.query(sql, [idUser, IdBox]);
            return check;
        });
    }
    InsertIdToNewBox(idUser, idBox, idFriend, admin) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `INSERT INTO havelistboxchat
              (idBox, idUser, status,idFriend,admin) 
              VALUES (?,?,0,?,?)`;
            var check;
            check = yield Config_1.default.query(sql, [idBox, idUser, idFriend, admin]);
            return check;
        });
    }
    GetIdUserInBox(idBox, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `SELECT h.idUser
            FROM havelistboxchat h
            WHERE  h.idBox = ? 
            GROUP BY h.idUser`;
            var check;
            check = yield Config_1.default.query(sql, [idBox]);
            return check;
        });
    }
    IsIdUserInBox(idUser, idBox) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `SELECT idUser  FROM havelistboxchat WHERE idUser = ? AND idBox = ?`;
            var check;
            check = yield Config_1.default.query(sql, [idUser, idBox]);
            return check;
        });
    }
    SetNotSeenInBox(idUser, idBox) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `
            UPDATE havelistboxchat 
            SET status = 2
            WHERE idUser <> ? AND idBox = ?`;
            var check = yield Config_1.default.query(sql, [idUser, idBox]);
            return check;
        });
    }
    GetHaveListidBoxByIdUser(idUser, idBox) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = ` SELECT * FROM havelistboxchat WHERE idUser=? AND idBox=? `;
            var check = yield Config_1.default.query(sql, [idUser, idBox]);
            return check;
        });
    }
}
exports.default = HaveListBoxChatDatabase;
