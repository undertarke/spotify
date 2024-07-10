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
exports.BoxController = void 0;
const BoxService_1 = __importDefault(require("../services/BoxService"));
const UserService_1 = __importDefault(require("../services/UserService"));
const BoxModel_1 = __importDefault(require("../model/BoxModel"));
const uuid_1 = require("uuid");
const HaveListBoxChatService_1 = __importDefault(require("../services/HaveListBoxChatService"));
const MessService_1 = __importDefault(require("../services/MessService"));
const HaveListFriendsService_1 = __importDefault(require("../services/HaveListFriendsService"));
class BoxController {
    constructor() {
    }
    GetAllBoxChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var id = req.cookies.id;
            var ls = yield BoxController.box.getAllBoxByIdUser(id);
            res.json({
                err: false,
                ls: ls
            });
        });
    }
    Chat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.cookies.id;
            var idFriend = req.body.idFriend;
            if (id == idFriend) {
                res.json({ err: true, mess: "bạn ko thể chat cho mình" });
                return;
            }
            let user = yield BoxController.user.Get(idFriend);
            if (!user) {
                res.json({ err: true, mess: "không có người này" });
                return;
            }
            let box = new BoxModel_1.default();
            var li = yield BoxController.haveListBoxChat.GetIdBoxbyIdUserAndIdFriend(id, idFriend);
            if (li.length > 0) {
                // có hộp thoại giữa hai người
                box.setAll(li[0]);
                res.json({
                    err: false,
                    idbox: box.idBox,
                });
                return;
            }
            //chưa có hộp thoại giữa hai người
            var idbox = `idbox-${(0, uuid_1.v4)()}`;
            yield BoxController.box.insertNewBox(idbox, "friend");
            let isFriend = "";
            var isfriend = (yield BoxController.haveListFriend.Get(id, idFriend)).IsFriend;
            isFriend = isfriend == 2 ? "Friend" : "noFriend";
            yield Promise.all([
                BoxController.haveListBoxChat.InsertIdToNewBox(id, idbox, idFriend),
                BoxController.box.UpdateBoxType(idbox, isFriend),
                BoxController.haveListBoxChat.InsertIdToNewBox(idFriend, idbox, id)
            ]);
            var box1 = yield BoxController.box.GetBoxbyIdBox(idbox);
            res.json({
                err: box1 == undefined,
                idbox: idbox,
            });
        });
    }
    Remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.cookies.id;
            var idBox = req.body.idBox;
            var check = yield BoxController.haveListBoxChat.HiddenBoxChat(id, idBox);
            res.json({
                err: check == undefined
            });
        });
    }
}
exports.BoxController = BoxController;
BoxController.box = BoxService_1.default;
BoxController.user = UserService_1.default;
BoxController.haveListBoxChat = HaveListBoxChatService_1.default;
BoxController.mess = MessService_1.default;
BoxController.haveListFriend = HaveListFriendsService_1.default;
const boxController = new BoxController();
exports.default = boxController;
