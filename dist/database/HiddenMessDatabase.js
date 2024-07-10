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
class HiddenMessDatabase {
    constructor() {
    }
    InsertHiddenmess(idMess, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `INSERT INTO hiddenmesslist(idUser, idMess) VALUES (?,?) `;
            var check = yield Config_1.default.query(sql, [idUser, idMess]);
            return check;
        });
    }
    DelHiddenmess(idMess) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `DELETE FROM hiddenmesslist WHERE idMess=? `;
            var check = yield Config_1.default.query(sql, [idMess]);
            return check;
        });
    }
    GetHiddenMessByidMessidUser(idMess, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `SELECT * FROM hiddenmesslist WHERE idUser=? AND idMess=?`;
            var check = yield Config_1.default.query(sql, [idUser, idMess]);
            return check;
        });
    }
}
exports.default = HiddenMessDatabase;
