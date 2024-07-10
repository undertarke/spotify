"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = __importDefault(require("./BaseModel"));
class HaveListBoxChat extends BaseModel_1.default {
    constructor() {
        super();
        this.admin = "";
        this.idBox = " -2";
        this.idUser = "0";
        this.pathImage = "";
        this.Name = "";
    }
}
exports.default = HaveListBoxChat;
