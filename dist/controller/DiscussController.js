"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DiscussService_1 = __importDefault(require("../services/DiscussService"));
const DiscussModel_1 = __importDefault(require("../model/DiscussModel"));
const uuid_1 = require("uuid");
const UserService_1 = __importDefault(require("../services/UserService"));
const NotificationModel_1 = require("../model/NotificationModel");
const NotificationService_1 = __importDefault(require("../services/NotificationService"));
const SongService_1 = __importDefault(require("../services/SongService"));
class DiscussController {
    PostDisscus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var d = new DiscussModel_1.default();
            d.setAll(req.body);
            d.Type = "0";
            d.Discuss_Id = `discuss-${(0, uuid_1.v4)()}`;
            d.User_Id = req.cookies.id;
            var ls = yield Promise.all([DiscussController.User.Get(d.User_Id),
                DiscussController.disscuss.Add(d),
                DiscussController.song.IncreaseNumberDiscuss(d.Song_Id)]);
            d.setAll(ls[0]);
            res.json({
                err: ls[1] == undefined,
                discuss: d
            });
        });
    }
    PostReplay(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            var d = new DiscussModel_1.default();
            var no = new NotificationModel_1.NotificationModel();
            d.setAll(req.body);
            d.Type = "1";
            d.Discuss_Id = `discuss-${(0, uuid_1.v4)()}`;
            d.User_Id = req.cookies.id;
            var ls = yield Promise.all([DiscussController.User.Get(d.User_Id),
                DiscussController.disscuss.Increase(d.Parent_discuss_Id),
                DiscussController.disscuss.Get(d.Replay_Discuss_Id),
                DiscussController.song.IncreaseNumberDiscuss(d.Song_Id),
            ]);
            if (ls[1] == undefined && ls[2] == undefined) {
                res.json({
                    err: true
                });
                return;
            }
            no.receiver_id = (_a = ls[2]) === null || _a === void 0 ? void 0 : _a.User_Id;
            no.Discuss_Id = d.Discuss_Id;
            no.Song_Id = d.Song_Id;
            no.replay_user_id = d.User_Id;
            if (((_b = ls[2]) === null || _b === void 0 ? void 0 : _b.User_Id) != d.User_Id) {
                var cn = yield DiscussController.notification.Add(no);
            }
            var check2 = yield DiscussController.disscuss.Add(d);
            d.setAll(ls[0]);
            res.json({
                err: check2 == undefined,
                discuss: d
            });
        });
    }
    GetMainDiscuss(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var SongId = req.body.SongId;
            var ls = yield Promise.all([DiscussController.disscuss.GetMainDiscussBySong_Id(SongId),
                DiscussController.song.Get(SongId)]);
            res.json({
                ls: ls[0],
                song: ls[1],
                err: false,
                id: req.cookies.id
            });
        });
    }
    GetReplayDiscuss(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var Parent_discuss_Id = req.body.ParentId;
            var ls = yield DiscussController.disscuss.GetReplayDiscussByParentDiscussId(Parent_discuss_Id);
            res.json({
                ls: ls,
                err: false,
                id: req.cookies.id
            });
        });
    }
    Delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var discuss_id = req.body.id;
            var id = req.cookies.id;
            var ls = yield Promise.all([
                DiscussController.disscuss.Delete(discuss_id),
                DiscussController.disscuss.DeleteChildren(discuss_id),
                DiscussController.notification.Delete(discuss_id, id),
                DiscussController.disscuss.Get(discuss_id)
            ]);
            if (ls[3]) {
                DiscussController.song.DeincreaseNumberDiscuss(ls[3].Song_Id, parseInt(ls[3].Replay_quality + "") + 1);
            }
            res.json({
                err: ls[0] == undefined
            });
        });
    }
}
DiscussController.disscuss = DiscussService_1.default;
DiscussController.User = UserService_1.default;
DiscussController.notification = NotificationService_1.default;
DiscussController.song = SongService_1.default;
const discussController = new DiscussController();
exports.default = discussController;
