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
class MessDatabase {
    GetAllContentByidBox(idBox, idUser, now) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = ` SELECT *  
        FROM messenge m 
        WHERE m.idBox= ? AND m.ngay > 
        (SELECT h.ngay FROM havelistboxchat h WHERE h.idBox = ? AND h.idUser = ? ) 
        AND  m.idMess NOT IN (SELECT hd.idMess FROM hiddenmesslist hd WHERE hd.idUser = ? ) 
        AND m.ngay < ? ORDER BY ngay DESC LIMIT 12`;
            var check = yield Config_1.default.query(sql, [idBox, idBox, idUser, idUser, now]);
            return check;
        });
    }
    InsertContentIn(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "INSERT INTO messenge ( idMess,idBox, content, type,idUser) VALUES (?,?,?,?,?)";
            var check = yield Config_1.default.query(sql, [d.idMess, d.idBox, d.content, d.type, d.idUser]);
            return check;
        });
    }
    GetMessById(idMess) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `SELECT * FROM messenge Where idMess=? `;
            var check = yield Config_1.default.query(sql, [idMess]);
            return check;
        });
    }
    DelMessById(idMess, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `DELETE FROM messenge WHERE idMess = ? AND idUser= ?`;
            var check = yield Config_1.default.query(sql, [idMess, idUser]);
            return check;
        });
    }
}
exports.default = MessDatabase;
