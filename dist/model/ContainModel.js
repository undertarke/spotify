"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SongModel_1 = __importDefault(require("./SongModel"));
class ContainModel extends SongModel_1.default {
    constructor() {
        super();
        this.Song_id = "";
        this.PlayList_id = "";
        this.TimeCreate = "";
    }
}
exports.default = ContainModel;
