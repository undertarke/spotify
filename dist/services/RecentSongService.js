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
exports.RecentSongService = void 0;
const RecentSongDatabase_1 = __importDefault(require("../database/RecentSongDatabase"));
const RecentSongModel_1 = __importDefault(require("../model/RecentSongModel"));
class RecentSongService {
    constructor(i) {
        this.recentSongDatabase = i;
    }
    Add(user_id, Id_song) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.recentSongDatabase.Add(user_id, Id_song);
            return check;
        });
    }
    GetAllByidUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var ls = yield this.recentSongDatabase.GetAllByidUser(id);
            return this.SetLs(ls);
        });
    }
    Get(user_id, Id_song) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.recentSongDatabase.Get(user_id, Id_song);
            if (check && check.length) {
                var temp = new RecentSongModel_1.default();
                temp.setAll(check[0]);
                return temp;
            }
            return undefined;
        });
    }
    UpdateTime(user_id, Id_song) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.recentSongDatabase.UpdateTime(user_id, Id_song);
            return check;
        });
    }
    SetLs(ls) {
        if (ls == undefined) {
            return [];
        }
        var check = [];
        for (let i = 0; i < ls.length; i++) {
            const element = ls[i];
            var temp = new RecentSongModel_1.default();
            temp.setAll(element);
            check.push(temp);
        }
        return check;
    }
}
exports.RecentSongService = RecentSongService;
var recentSongService = new RecentSongService(new RecentSongDatabase_1.default());
exports.default = recentSongService;
