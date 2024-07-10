"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = __importDefault(require("./BaseModel"));
class BoxModel extends BaseModel_1.default {
    constructor() {
        super();
        this.idBox = "";
        this.imagebox = "";
        this.boxtype = 0;
        this.idUser = "";
        this.Name = "";
        this.pathImage = "";
        this.id = "";
        this.content = "";
        this.messType = "mess";
        this.status = 1;
    }
}
exports.default = BoxModel;
