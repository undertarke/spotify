"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("./UserModel"));
class HaveListFriendsModel extends UserModel_1.default {
    constructor() {
        super();
        this.IsFriend = -1;
        this.idfriend = "";
        this.iduser = "";
    }
}
exports.default = HaveListFriendsModel;
