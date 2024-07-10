"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = __importDefault(require("./BaseModel"));
class GenreModel extends BaseModel_1.default {
    constructor() {
        super();
        this.Floor = 0;
        this.idParent = "";
        this.Id = "";
        this.Name = "";
        this.RightGenre = 0;
        this.LeftGenre = 0;
    }
}
exports.default = GenreModel;
