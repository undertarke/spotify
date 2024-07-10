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
exports.HaveListBoxChatService = exports.menberType = exports.statusBox = void 0;
const HaveListBoxChatDatabase_1 = __importDefault(require("../database/HaveListBoxChatDatabase"));
const BoxModel_1 = __importDefault(require("../model/BoxModel"));
var statusBox;
(function (statusBox) {
    statusBox["Hidden"] = "0";
    statusBox["Seen"] = "1";
    statusBox["Unread"] = "2";
})(statusBox || (exports.statusBox = statusBox = {}));
var menberType;
(function (menberType) {
    menberType["notMenber"] = "-1";
    menberType["Menber"] = "0";
    menberType["extraAdmin"] = "2";
})(menberType || (exports.menberType = menberType = {}));
class HaveListBoxChatService {
    constructor(i) {
        this.data = i;
    }
    HiddenBoxChat(idUser, idBox) {
        return __awaiter(this, void 0, void 0, function* () {
            var s = yield this.data.UpdateStatusBox(idUser, idBox, statusBox.Hidden);
            return s;
        });
    }
    GetIdBoxbyIdUserAndIdFriend(idUser, idFriend) {
        return __awaiter(this, void 0, void 0, function* () {
            var ls = yield this.data.GetIdBoxbyIdUserAndIdFriend(idUser, idFriend);
            return this.setlsBox(ls);
        });
    }
    setlsBox(any) {
        if (any == undefined) {
            return [];
        }
        var list = [];
        for (let i = 0; i < any.length; i++) {
            const element = any[i];
            let box = new BoxModel_1.default();
            box.setAll(element);
            list.push(box);
        }
        return list;
    }
    InsertIdToNewBox(idUser, idBox, idFriend, admin) {
        return __awaiter(this, void 0, void 0, function* () {
            idFriend = idFriend || idUser;
            admin = admin || "0";
            var check = yield this.data.InsertIdToNewBox(idUser, idBox, idFriend, admin);
            return check;
        });
    }
    visualBoxChat(idUser, idBox) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.data.UpdateStatusBox(idUser, idBox, statusBox.Seen);
            return check;
        });
    }
    GetIdUserInBox(idUser, idBox) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.data.GetIdUserInBox(idBox, idUser);
            return this.setlsBox(check);
        });
    }
    IsIdUserInBox(idUser, idBox) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.data.IsIdUserInBox(idUser, idBox);
            return check;
        });
    }
    SetNotSeenInBox(idUser, idBox) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.data.SetNotSeenInBox(idUser, idBox);
            return check;
        });
    }
    GetHaveListidBoxByIdUser(idUser, idBox) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.data.GetHaveListidBoxByIdUser(idUser, idBox);
            return this.setlsBox(check);
        });
    }
    GetInforBoxByidUserAndIdBox(idUser, IdBox) {
        return __awaiter(this, void 0, void 0, function* () {
            var ls = yield this.data.GetInforBoxByidUserAndIdBox(idUser, IdBox);
            return this.setlsBox(ls)[0];
        });
    }
}
exports.HaveListBoxChatService = HaveListBoxChatService;
var haveListBoxChatService = new HaveListBoxChatService(new HaveListBoxChatDatabase_1.default());
exports.default = haveListBoxChatService;
