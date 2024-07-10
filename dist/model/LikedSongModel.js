"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SongModel_1 = __importDefault(require("./SongModel"));
class LikedSongModel extends SongModel_1.default {
    constructor() {
        super();
        this.liked = 0;
        this.Id = "";
        this.id_user_liked = "";
    }
}
exports.default = LikedSongModel;
