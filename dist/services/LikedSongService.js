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
exports.LikedSongService = void 0;
const LikedSongDatabase_1 = __importDefault(require("../database/LikedSongDatabase"));
const LikedSongModel_1 = __importDefault(require("../model/LikedSongModel"));
class LikedSongService {
    constructor(likedSongDatabase) {
        this.likedSongDatabase = likedSongDatabase;
    }
    Add(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.likedSongDatabase.Add(d);
            return check;
        });
    }
    Delete(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.likedSongDatabase.Delete(d);
            return check;
        });
    }
    GetAll(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var ls = yield this.likedSongDatabase.GetAll(d);
            return this.SetLs(ls);
        });
    }
    Update(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.likedSongDatabase.Update(d);
            return check;
        });
    }
    Get(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.likedSongDatabase.Get(d);
            var ls = this.SetLs(check);
            return ls.length > 0 ? ls[0] : undefined;
        });
    }
    GetAllLikedSong(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.likedSongDatabase.GetAllLikedSong(d);
            var ls = this.SetLs(check);
            return ls;
        });
    }
    SearchName(name, iduser) {
        return __awaiter(this, void 0, void 0, function* () {
            var ls = yield this.likedSongDatabase.SearchName(name, iduser);
            return this.SetLs(ls);
        });
    }
    GetAllByIdPlayList(id_user_liked, id_playlist) {
        return __awaiter(this, void 0, void 0, function* () {
            var ls = yield this.likedSongDatabase.GetAllByIdPlayList(id_user_liked, id_playlist);
            return this.SetLs(ls);
        });
    }
    SetLs(ls) {
        if (ls == undefined) {
            return [];
        }
        var check = [];
        for (let i = 0; i < ls.length; i++) {
            const element = ls[i];
            var temp = new LikedSongModel_1.default();
            temp.setAll(element);
            check.push(temp);
        }
        return check;
    }
}
exports.LikedSongService = LikedSongService;
var likedSongService = new LikedSongService(new LikedSongDatabase_1.default());
exports.default = likedSongService;
