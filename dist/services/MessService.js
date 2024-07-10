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
exports.MessService = void 0;
const MessDatabase_1 = __importDefault(require("../database/MessDatabase"));
const MessModel_1 = __importDefault(require("../model/MessModel"));
class MessService {
    constructor(i) {
        this.data = i;
    }
    GetAllContentByidBox(idBox, idUser, day) {
        return __awaiter(this, void 0, void 0, function* () {
            var today = new Date(day || Date.now());
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date + ' ' + time;
            var check = yield this.data.GetAllContentByidBox(idBox, idUser, dateTime);
            return this.setlsMess(check);
        });
    }
    setlsMess(any) {
        if (any == undefined) {
            return [];
        }
        let ls = [];
        for (let i = 0; i < any.length; i++) {
            const element = any[i];
            var mess = new MessModel_1.default();
            mess.setAll(element);
            ls.push(mess.json());
        }
        return ls;
    }
    InsertContentIn(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.data.InsertContentIn(d);
            return check;
        });
    }
    GetMessById(idMess) {
        return __awaiter(this, void 0, void 0, function* () {
            var mess;
            var l = yield this.data.GetMessById(idMess);
            for (let i = 0; i < l.length; i++) {
                const e = l[i];
                mess = new MessModel_1.default();
                mess.setAll(e);
                break;
            }
            return mess;
        });
    }
    DelMessById(idMess, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.data.DelMessById(idMess, idUser);
            return check;
        });
    }
}
exports.MessService = MessService;
var messService = new MessService(new MessDatabase_1.default());
exports.default = messService;
