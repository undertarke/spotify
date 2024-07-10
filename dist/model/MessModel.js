"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = __importDefault(require("./BaseModel"));
class MessModel extends BaseModel_1.default {
    constructor() {
        super();
        this.idBox = "";
        this.idUser = "";
        this.content = "";
        this.type = "Mess";
        this.idMess = "0";
        this.ngay = "";
    }
}
exports.default = MessModel;
