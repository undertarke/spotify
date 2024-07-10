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
const HaveListFriendsService_1 = __importDefault(require("../services/HaveListFriendsService"));
const server_1 = __importDefault(require("../server"));
class HaveListFriendController {
    constructor() {
    }
    AddFriendsRequset(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var id = req.cookies.id;
            var idFriend = req.body.idFriend;
            if (id === idFriend) {
                res.json({ err: true, mess: "bạn không thể kết bạn với mình" });
                return;
            }
            var check = false;
            yield Promise.all([
                HaveListFriendController.haveListFriend.Get(id, idFriend),
                HaveListFriendController.haveListFriend.Get(idFriend, id),
            ])
                .then((v) => {
                if (v[0] || v[1]) {
                    check = true;
                }
                else {
                    check = false;
                }
            })
                .catch((v) => {
                check = true;
            });
            if (check) {
                res.json({ err: true, mess: "là bạn bè rui hoặc có gửi lời kết bạn" });
                return;
            } // 0 gửi yêu cầu kết bạn  1 chấp nhận yêu cầu kết bạn 2 là bạn bè
            var check1 = yield HaveListFriendController.haveListFriend.InsertListFriends(id, idFriend, "Request");
            var check1 = yield HaveListFriendController.haveListFriend.InsertListFriends(idFriend, id, "Responsd");
            if (check1) {
                server_1.default.to(idFriend).emit("tb", "yêu cầu kết bạn");
            }
            res.json({ err: false, mess: "bạn đã giử thành công" });
        });
    }
    ;
    CancelRequst(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var id = req.cookies.id;
            var idFriend = req.body.idFriend;
            var c = yield Promise.all([HaveListFriendController.haveListFriend.CancelFriends(id, idFriend),
                HaveListFriendController.haveListFriend.CancelFriends(idFriend, id)]);
            res.json({
                err: c[0] == undefined
            });
        });
    }
    AcceptRequset(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var id = req.cookies.id;
            var idFriend = req.body.id;
            var c = yield Promise.all([HaveListFriendController.haveListFriend.AcceptRequset(id, idFriend),
                HaveListFriendController.haveListFriend.AcceptRequset(idFriend, id)]);
            res.json({
                err: c[0] == undefined
            });
        });
    }
    GetAllFriend(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var id = req.cookies.id;
            var ls = yield HaveListFriendController.haveListFriend.GetAllTypeFriend(id, "Friend");
            res.json({
                err: false,
                ls: ls
            });
        });
    }
    GetRespond(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var id = req.cookies.id;
            var ls = yield HaveListFriendController.haveListFriend.GetAllTypeFriend(id, "Responsd");
            res.json({
                err: false,
                ls: ls
            });
        });
    }
}
HaveListFriendController.haveListFriend = HaveListFriendsService_1.default;
const haveListFriendController = new HaveListFriendController();
exports.default = haveListFriendController;
