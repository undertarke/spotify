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
exports.NotificationController = void 0;
const NotificationService_1 = __importDefault(require("../services/NotificationService"));
class NotificationController {
    GetAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var id = req.cookies.id;
            var ls = yield NotificationController.notification.GetAllByUserid(id);
            res.json({
                err: false,
                ls: ls
            });
        });
    }
    Delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var c = req.body.id;
            var id = req.cookies.id;
            var check = yield NotificationController.notification.Delete(c, id);
            res.json({
                err: check == undefined,
            });
        });
    }
}
exports.NotificationController = NotificationController;
NotificationController.notification = NotificationService_1.default;
const notificationController = new NotificationController();
exports.default = notificationController;
