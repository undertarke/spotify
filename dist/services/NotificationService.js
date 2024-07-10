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
exports.NotificationService = void 0;
const NotificationDatase_1 = __importDefault(require("../database/NotificationDatase"));
const NotificationModel_1 = require("../model/NotificationModel");
class NotificationService {
    constructor(i) {
        this.data = i;
    }
    Add(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var chech = yield this.data.Add(d);
            return chech;
        });
    }
    GetAllByUserid(receiver_id) {
        return __awaiter(this, void 0, void 0, function* () {
            var ls = yield this.data.GetAllByUserid(receiver_id);
            return this.Setls(ls);
        });
    }
    Delete(discuss_id, receiver_id) {
        return __awaiter(this, void 0, void 0, function* () {
            var c = yield this.data.Delete(discuss_id, receiver_id);
            return c;
        });
    }
    Setls(ls) {
        if (ls == undefined) {
            return [];
        }
        var list = [];
        for (let i = 0; i < ls.length; i++) {
            const element = ls[i];
            var tem = new NotificationModel_1.NotificationModel();
            tem.setAll(element);
            list.push(tem);
        }
        return list;
    }
}
exports.NotificationService = NotificationService;
var notificationService = new NotificationService(new NotificationDatase_1.default);
exports.default = notificationService;
