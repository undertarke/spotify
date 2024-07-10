"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = __importDefault(require("./BaseModel"));
class DiscussModel extends BaseModel_1.default {
    constructor() {
        super();
        this.User_Id = "";
        this.Name = "";
        this.pathImage = "";
        this.Discuss_Id = "";
        this.Parent_discuss_Id = "";
        this.Replay_Discuss_Id = "";
        this.Replay_quality = "";
        this.Content = "";
        this.Type = "";
        this.Song_Id = "";
    }
}
exports.default = DiscussModel;
