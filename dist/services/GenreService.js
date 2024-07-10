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
exports.GenreService = void 0;
const GenreDatase_1 = __importDefault(require("../database/GenreDatase"));
const GenreModel_1 = __importDefault(require("../model/GenreModel"));
const uuid_1 = require("uuid");
class GenreService {
    constructor(database) {
        this.database = database;
    }
    Add(genre) {
        return __awaiter(this, void 0, void 0, function* () {
            if (genre.Floor == 0) {
                var num = yield this.GetMaxRight();
                genre.LeftGenre = num + 1;
                genre.RightGenre = num + 2;
                genre.idParent = "0";
                genre.Id = (0, uuid_1.v4)();
                genre.Floor = 0;
            }
            else {
                var temp = yield this.Get(genre.idParent);
                if (!temp) {
                    return undefined;
                }
                let check = yield this.CreateBlank(temp.RightGenre);
                if (!check) {
                    return undefined;
                }
                genre.LeftGenre = temp.RightGenre;
                genre.RightGenre = temp.RightGenre + 1;
                genre.idParent = temp.Id;
                genre.Id = (0, uuid_1.v4)();
                genre.Floor = temp.Floor + 1;
            }
            var check = yield this.database.Add(genre);
            return check;
        });
    }
    Get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var check, l;
            l = (yield this.database.Get(id));
            if (l && l.length > 0) {
                check = new GenreModel_1.default();
                check.setAll(l[0]);
            }
            return check;
        });
    }
    GetAll() {
        return __awaiter(this, void 0, void 0, function* () {
            var l = yield this.database.GetAll();
            return this.Setls(l);
        });
    }
    GetAllLeftAndRight(Left, Right) {
        return __awaiter(this, void 0, void 0, function* () {
            var l = yield this.database.GetAllLeftAndRight(Left, Right), ls = [];
            for (let i = 0; i < l.length; i++) {
                const element = l[i];
                var genre = new GenreModel_1.default();
                genre.setAll(element);
                ls.push(genre);
            }
            return ls;
        });
    }
    GetGenreByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            var check, l;
            l = (yield this.database.GetGenreByName(name));
            if (l && l.length > 0) {
                check = new GenreModel_1.default();
                check.setAll(l[0]);
            }
            return check;
        });
    }
    GetAllByidParent(idParent) {
        return __awaiter(this, void 0, void 0, function* () {
            var l = yield this.database.GetAllByidParent(idParent), ls = [];
            for (let i = 0; i < l.length; i++) {
                const element = l[i];
                var genre = new GenreModel_1.default();
                genre.setAll(element);
                ls.push(genre);
            }
            return ls;
        });
    }
    GetMaxRight() {
        return __awaiter(this, void 0, void 0, function* () {
            var l = yield this.database.GetMaxRight();
            var check = -1;
            if (l && l[0]["max"]) {
                check = l[0]["max"];
            }
            return check;
        });
    }
    CreateBlank(Right) {
        return __awaiter(this, void 0, void 0, function* () {
            var check;
            check = yield this.database.CreateBlank(Right);
            return check;
        });
    }
    UpdateName(name, id) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.database.UpdateName(name, id);
            return check;
        });
    }
    DeleteBlank(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var genre = yield this.Get(id);
            if (!genre) {
                return undefined;
            }
            var check;
            if (genre.RightGenre - genre.LeftGenre !== 1) {
                return undefined;
            }
            check = yield this.database.DeleteBlank(genre.RightGenre + "");
            return check;
        });
    }
    Delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.DeleteBlank(id);
            if (check == undefined) {
                return undefined;
            }
            var check1 = yield this.database.Delete(id);
            return check1;
        });
    }
    GetIdParentByIdplaylist(IdPlaylist) {
        return __awaiter(this, void 0, void 0, function* () {
            var ls = yield this.database.GetIdParentByIdplaylist(IdPlaylist);
            return this.Setls(ls);
        });
    }
    GetAllByLimitFloor(floor) {
        return __awaiter(this, void 0, void 0, function* () {
            var ls = yield this.database.GetAllByLimitFloor(floor);
            return this.Setls(ls);
        });
    }
    GetChildrenByIdParent(idParent) {
        return __awaiter(this, void 0, void 0, function* () {
            var ls = yield this.database.GetChildrenByIdParent(idParent);
            return this.Setls(ls);
        });
    }
    Setls(ls) {
        if (ls == undefined) {
            return [];
        }
        var list = [];
        for (let i = 0; i < ls.length; i++) {
            const element = ls[i];
            var genre = new GenreModel_1.default();
            genre.setAll(element);
            list.push(genre);
        }
        return list;
    }
}
exports.GenreService = GenreService;
var genreService = new GenreService(new GenreDatase_1.default());
exports.default = genreService;
