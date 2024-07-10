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
class BoxDatabase {
    constructor() { }
    getAllBoxById(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `SELECT u.Name,u.pathImage,idFriend as "idUser", bc.content,bc.id,bc.idBox,bc.boxtype,bc.messType, hb.status
            FROM havelistboxchat hb, boxchat bc , user u
            WHERE hb.idUser=? AND hb.idBox=bc.idBox AND u.id=hb.idFriend AND hb.status <> 0
            ORDER BY bc.updateDay DESC; `;
            var check;
            check = yield Config_1.default.query(sql, [idUser]);
            return check;
        });
    }
    insertNewBox(idBox, type) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "INSERT INTO `boxchat`(`idBox`, `boxtype`) VALUES (?,?)";
            var check;
            check = yield Config_1.default.query(sql, [idBox, type]);
            return check;
        });
    }
    UpdateLastMessBox(idUser, content, idBox, type) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "UPDATE boxchat SET content=?,id=?, updateDay=CURRENT_TIMESTAMP, messType=?  WHERE idBox =?";
            var check;
            check = yield Config_1.default.query(sql, [content, idUser, type, idBox]);
            return check;
        });
    }
    GetBoxbyIdBox(idBox) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `SELECT * FROM boxchat WHERE idBox= ? `;
            var check;
            check = yield Config_1.default.query(sql, [idBox]);
            return check;
        });
    }
    UpdateBoxType(idBox, type) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "UPDATE boxchat SET boxtype= ? WHERE idbox= ?";
            var check = yield Config_1.default.query(sql, [type, idBox]);
            return check;
        });
    }
}
exports.default = BoxDatabase;
