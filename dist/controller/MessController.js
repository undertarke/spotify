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
exports.MessController = void 0;
const HaveListBoxChatService_1 = __importDefault(require("../services/HaveListBoxChatService"));
const MessService_1 = __importDefault(require("../services/MessService"));
const MessModel_1 = __importDefault(require("../model/MessModel"));
const BoxService_1 = __importDefault(require("../services/BoxService"));
const uuid_1 = require("uuid");
const HiddenMessService_1 = __importDefault(require("../services/HiddenMessService"));
const server_1 = __importDefault(require("../server"));
const sharp_1 = __importDefault(require("sharp"));
const path_1 = require("path");
const fs_1 = require("fs");
class MessController {
    constructor() {
    }
    GetAllMessInbox(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            var id = req.cookies.id;
            var idBox = req.body.idBox;
            MessController.haveListBoxChat.visualBoxChat(id, idBox);
            var ls = yield Promise.all([MessController.mess.GetAllContentByidBox(idBox, id),
                MessController.haveListBoxChat.GetInforBoxByidUserAndIdBox(id, idBox)]);
            res.json({
                err: false,
                mess: ls[0],
                infor: ls[1],
                myid: id,
                now: ((_a = ls[0][ls[0].length - 1]) === null || _a === void 0 ? void 0 : _a.ngay) || -1
            });
        });
    }
    SendMess(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var mess = new MessModel_1.default();
            mess.setAll(req.body);
            mess.idUser = req.cookies.id;
            mess.idMess = `Mess-${(0, uuid_1.v4)()}`;
            let inbox = yield MessController.haveListBoxChat.IsIdUserInBox(mess.idUser, mess.idBox);
            if (inbox == undefined) {
                res.json({
                    err: true
                });
                return;
            }
            let v = yield Promise.all([
                MessController.haveListBoxChat.visualBoxChat(mess.idUser, mess.idBox),
                MessController.haveListBoxChat.SetNotSeenInBox(mess.idUser, mess.idBox),
                MessController.mess.InsertContentIn(mess),
                MessController.box.UpdateLastMessBox(mess.idUser, mess.content, mess.idBox, "Mess"),
                MessController.haveListBoxChat.GetIdUserInBox(mess.idUser, mess.idBox)
            ]);
            v[4].map((v) => {
                server_1.default.to(v.idUser).emit("mess", {
                    idMess: mess.idMess,
                    content: mess.content,
                    idBox: mess.idBox,
                    idUser: mess.idUser,
                    ngay: new Date(),
                    type: "Mess"
                });
            });
            res.json({
                err: v[2] == undefined
            });
        });
    }
    HiddenMess(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var idMess = req.body.idMess;
            var id = req.cookies.id;
            if (idMess == undefined) {
                res.json({});
                return;
            }
            var data = yield MessController.hiddenMess.GetHiddenMessByidMessidUser(idMess, id);
            if (data) {
                res.json({ err: true });
                return;
            }
            MessController.hiddenMess.InsertHiddenmess(idMess, id);
            res.json({ err: false });
        });
    }
    Remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var idmess = req.body.idMess;
            var s = req.cookies.id;
            var f = yield MessController.mess.GetMessById(idmess);
            var iduser = s;
            if (f == undefined) {
                res.json({
                    err: true,
                });
                return;
            }
            if (iduser == (f.idUser + "")) {
                yield Promise.all([MessController.hiddenMess.DelHiddenMess(idmess),
                    MessController.mess.DelMessById(idmess, iduser)]);
                if (f.type == "image") {
                    var ls = f.content.split("@");
                    ls.map((v) => {
                        if (v.length <= 0) {
                            return;
                        }
                        var input = (0, path_1.join)(process.cwd(), "public/upload", v.replace("i/", ""));
                        (0, fs_1.unlink)(input, (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                    });
                }
                res.json({
                    err: false,
                });
                return;
            }
            MessController.hiddenMess.InsertHiddenmess(idmess, iduser);
            res.json({
                err: false,
            });
        });
    }
    Image(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var files = req.files;
            var s = files.map((v) => __awaiter(this, void 0, void 0, function* () {
                var input = (0, path_1.join)(process.cwd(), "public/upload", v.filename);
                var output = (0, path_1.join)(process.cwd(), "public/upload", `${v.filename}.jpg`);
                try {
                    yield (0, sharp_1.default)(input)
                        .jpeg({ force: false, quality: 10, progressive: true })
                        .png({ palette: true, quality: 1, compressionLevel: 9, progressive: true, force: false })
                        .toFile(output);
                }
                catch (error) {
                    console.log(error);
                }
                return `${v.filename}.jpg`;
            }));
            var ls = yield Promise.all(s);
            files.map((v) => __awaiter(this, void 0, void 0, function* () {
                var input = (0, path_1.join)(process.cwd(), "public/upload", v.filename);
                (0, fs_1.unlink)(input, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }));
            var messfile = ls.reduce((a, b) => {
                a += `i/${b}@`;
                return a;
            }, "");
            var mess = new MessModel_1.default();
            mess.content = messfile;
            mess.idBox = req.body.idbox;
            mess.idMess = `Mess-${(0, uuid_1.v4)()}`;
            mess.idUser = req.cookies.id;
            mess.type = "image";
            let inbox = yield MessController.haveListBoxChat.IsIdUserInBox(mess.idUser, mess.idBox);
            if (inbox == undefined) {
                res.json({
                    err: true
                });
                return;
            }
            let v = yield Promise.all([
                MessController.haveListBoxChat.visualBoxChat(mess.idUser, mess.idBox),
                MessController.haveListBoxChat.SetNotSeenInBox(mess.idUser, mess.idBox),
                MessController.mess.InsertContentIn(mess),
                MessController.box.UpdateLastMessBox(mess.idUser, mess.content, mess.idBox, "Image"),
                MessController.haveListBoxChat.GetIdUserInBox(mess.idUser, mess.idBox)
            ]);
            v[4].map((v) => {
                server_1.default.to(v.idUser).emit("mess", { idMess: mess.idMess, content: mess.content, idBox: mess.idBox, type: "Image", idUser: mess.idUser, ngay: new Date() });
            });
            res.json({
                err: v[2] == undefined
            });
        });
    }
    NextMessList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var id = req.cookies.id;
            var idBox = req.body.idBox;
            var now = req.body.now;
            var ls = yield MessController.mess.GetAllContentByidBox(idBox, id, now);
            res.json({
                err: false,
                ls: ls,
                now: ls.length == 0 ? "-1" : ls[ls.length - 1].ngay
            });
        });
    }
}
exports.MessController = MessController;
MessController.haveListBoxChat = HaveListBoxChatService_1.default;
MessController.mess = MessService_1.default;
MessController.box = BoxService_1.default;
MessController.hiddenMess = HiddenMessService_1.default;
const messController = new MessController();
exports.default = messController;
