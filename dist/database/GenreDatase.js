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
class GenreDatase {
    constructor() {
    }
    Add(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = " INSERT INTO genre(Id, Name, RightGenre, LeftGenre,idParent,Floor) VALUES (?,?,?,?,?,?)";
            var check;
            check = yield Config_1.default.query(sql, [d.Id, d.Name, d.RightGenre, d.LeftGenre, d.idParent, d.Floor]);
            return check;
        });
    }
    Get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT * FROM genre WHERE Id=? ";
            var check;
            check = yield Config_1.default.query(sql, [id]);
            return check;
        });
    }
    GetAll() {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT * FROM genre ORDER BY Floor ASC ";
            var check;
            check = yield Config_1.default.query(sql, []);
            return check;
        });
    }
    GetAllLeftAndRight(Left, Right) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT * FROM genre where LeftGenre > ? AND RightGenre < ?";
            var check;
            check = yield Config_1.default.query(sql, [Left, Right]);
            return check;
        });
    }
    DeleteBlank(Right) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "UPDATE genre SET RightGenre = RightGenre - 2 WHERE RightGenre > ? ";
            var sql2 = "UPDATE genre SET LeftGenre = LeftGenre - 2 WHERE LeftGenre > ?";
            var check = yield Promise.all([Config_1.default.query(sql, [Right]), Config_1.default.query(sql2, [Right])]);
            return check;
        });
    }
    Delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "DELETE FROM genre WHERE id = ?";
            var check = yield Config_1.default.query(sql, [id]);
            return check;
        });
    }
    GetGenreByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT * FROM genre where Name LIKE ?";
            var check;
            check = yield Config_1.default.query(sql, [`%${name}%`]);
            return check;
        });
    }
    GetAllByidParent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT * FROM genre where idParent = ?";
            var check;
            check = yield Config_1.default.query(sql, [id]);
            return check;
        });
    }
    GetMaxRight() {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT MAX(RightGenre) as max FROM genre ";
            var check;
            check = yield Config_1.default.query(sql, []);
            return check;
        });
    }
    CreateBlank(Right) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "UPDATE genre SET RightGenre = RightGenre + 2 WHERE RightGenre >= ? ";
            var sql2 = "UPDATE genre SET LeftGenre = LeftGenre + 2 WHERE LeftGenre > ?";
            var check = yield Promise.all([Config_1.default.query(sql, [Right]), Config_1.default.query(sql2, [Right])]);
            return check;
        });
    }
    UpdateName(name, id) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "UPDATE genre SET Name = ? WHERE Id =? ";
            var check = yield Config_1.default.query(sql, [name, id]);
            return check;
        });
    }
    GetIdParentByIdplaylist(Idplaylist) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = ` SELECT g2.* FROM genre g1,playlist pl, genre g2
        WHERE pl.Genre_ID=g1.Id AND pl.id= ? AND g1.LeftGenre >= g2.LeftGenre AND g2.RightGenre >= g1.RightGenre`;
            var check = yield Config_1.default.query(sql, [Idplaylist]);
            return check;
        });
    }
    GetAllByLimitFloor(floor) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT * FROM genre where Floor < ? ORDER BY Floor ASC ";
            var check;
            check = yield Config_1.default.query(sql, [floor]);
            return check;
        });
    }
    GetChildrenByIdParent(idParent) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT g2.* FROM genre g1,genre g2 WHERE g1.id =? AND g1.RightGenre > g2.RightGenre AND g1.LeftGenre < g2.LeftGenre ";
            var check;
            check = yield Config_1.default.query(sql, [idParent]);
            return check;
        });
    }
}
exports.default = GenreDatase;
