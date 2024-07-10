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
exports.SongService = void 0;
const Config_1 = __importDefault(require("../config/Config"));
const SongDatabase_1 = __importDefault(require("../database/SongDatabase"));
const SongModel_1 = __importDefault(require("../model/SongModel"));
class SongService {
    constructor(songDatabase) {
        this.songDatabase = songDatabase;
    }
    Add(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.songDatabase.Add(d);
            return check;
        });
    }
    Get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var check, song;
            check = (yield this.songDatabase.Get(id));
            if (check && check.length > 0) {
                song = new SongModel_1.default();
                song.setAll(check[0]);
            }
            return song;
        });
    }
    GetAll(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            var check;
            check = (yield this.songDatabase.GetAll(user_id));
            var ls = this.SetLs(check);
            return ls;
        });
    }
    Delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.songDatabase.Delete(id);
            return check;
        });
    }
    Update(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `UPDATE song Set genre_id =?, SongName=?, Duration=?, publicDate=?, description=?,SongImage=?, Singer=?
        WHERE Id =?`;
            var check;
            check = yield Config_1.default.query(sql, [d.Genre_id, d.SongName, d.Duration, d.publicDate, d.description, d.SongImage, d.Singer, d.Id]);
            return check;
        });
    }
    UpStatus(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.songDatabase.UpStatus(d);
            return check;
        });
    }
    GetValidateAll(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            var check;
            check = (yield this.songDatabase.GetValidateAll(user_id));
            return this.SetLs(check);
        });
    }
    GetSongByGenre(idGenre, p) {
        return __awaiter(this, void 0, void 0, function* () {
            p.start = p.start | 0;
            p.end = p.end | 10;
            var check;
            check = (yield this.songDatabase.GetSongByGenre(idGenre, p));
            return this.SetLs(check);
        });
    }
    IncreaseNumberDiscuss(SongId, n) {
        return __awaiter(this, void 0, void 0, function* () {
            n = n || 1;
            var check;
            check = yield this.songDatabase.IncreaseNumberDiscuss(SongId, n);
            return check;
        });
    }
    DeincreaseNumberDiscuss(SongId, n) {
        return __awaiter(this, void 0, void 0, function* () {
            n = n || 1;
            var check;
            check = yield this.songDatabase.DeincreaseNumberDiscuss(SongId, n);
            return check;
        });
    }
    NextSong(SongId) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `SELECT * FROM song WHERE id <> ?`;
            var check;
            check = yield Config_1.default.query(sql, [SongId]);
            return this.SetLs(check);
        });
    }
    SetLs(check) {
        if (check == undefined) {
            return [];
        }
        var ls = [];
        for (let i = 0; i < check.length; i++) {
            const element = check[i];
            var song = new SongModel_1.default();
            song.setAll(element);
            ls.push(song);
        }
        return ls;
    }
}
exports.SongService = SongService;
var songDatabase = new SongDatabase_1.default();
var songService = new SongService(songDatabase);
exports.default = songService;
