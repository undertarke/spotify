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
exports.HiddenMessService = void 0;
const HiddenMessDatabase_1 = __importDefault(require("../database/HiddenMessDatabase"));
const HiddenMessModel_1 = __importDefault(require("../model/HiddenMessModel"));
class HiddenMessService {
    constructor(i) {
        this.data = i;
    }
    InsertHiddenmess(idMess, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.data.InsertHiddenmess(idMess, idUser);
            return check;
        });
    }
    DelHiddenMess(idMess) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.data.DelHiddenmess(idMess);
            return check;
        });
    }
    GetHiddenMessByidMessidUser(idMess, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            var f;
            var l = yield this.data.GetHiddenMessByidMessidUser(idMess, idUser);
            for (let i = 0; i < l.length; i++) {
                const element = l[i];
                f = new HiddenMessModel_1.default();
                f.setAll(element);
            }
            return f;
        });
    }
}
exports.HiddenMessService = HiddenMessService;
var hiddenMessService = new HiddenMessService(new HiddenMessDatabase_1.default());
exports.default = hiddenMessService;
