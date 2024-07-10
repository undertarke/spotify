"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModel = void 0;
const DiscussModel_1 = __importDefault(require("./DiscussModel"));
class NotificationModel extends DiscussModel_1.default {
    constructor() {
        super();
        this.replay_user_id = "";
        this.receiver_id = "";
        this.SongImage = "";
        this.createtime = "";
    }
}
exports.NotificationModel = NotificationModel;
