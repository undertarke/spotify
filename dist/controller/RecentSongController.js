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
const RecentSongService_1 = __importDefault(require("../services/RecentSongService"));
class RecentSongController {
    constructor() {
    }
    GetAllByidUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var id = req.cookies.id;
            var ls = yield RecentSongController.recentSong.GetAllByidUser(id);
            res.json({
                err: false,
                ls: ls
            });
        });
    }
}
RecentSongController.recentSong = RecentSongService_1.default;
var recentSongController = new RecentSongController();
exports.default = recentSongController;
