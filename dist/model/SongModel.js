"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = __importDefault(require("./BaseModel"));
class SongModel extends BaseModel_1.default {
    constructor() {
        super();
        this.dicussquality = 0;
        this.SongImage = "";
        this.description = "";
        this.Id = "";
        this.Duration = "";
        this.Genre_id = "";
        this.Singer = "";
        this.SongName = "";
        this.Viewer = 0;
        this.user_id = "";
        this.status = 0;
        this.publicDate = "";
        this.filePath = "";
    }
}
exports.default = SongModel;
