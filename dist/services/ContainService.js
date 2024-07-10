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
exports.ContainService = void 0;
const ContainDatabse_1 = __importDefault(require("../database/ContainDatabse"));
const ContainModel_1 = __importDefault(require("../model/ContainModel"));
class ContainService {
    constructor(i) {
        this.containdatabase = i;
    }
    Add(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.containdatabase.Add(d);
            return check;
        });
    }
    Get(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.containdatabase.Get(d);
            var ls = this.Setls(check);
            return ls.length > 0 ? ls[0] : undefined;
        });
    }
    Delete(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.containdatabase.Delete(d);
            return check;
        });
    }
    GetAllByPlayList(PlayList_id) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.containdatabase.GetAllByPlayList(PlayList_id);
            return this.Setls(check);
        });
    }
    Setls(ls) {
        if (ls == undefined) {
            return [];
        }
        var list = [];
        for (let i = 0; i < ls.length; i++) {
            const element = ls[i];
            var tem = new ContainModel_1.default();
            tem.setAll(element);
            list.push(tem);
        }
        return list;
    }
}
exports.ContainService = ContainService;
var containService = new ContainService(new ContainDatabse_1.default());
exports.default = containService;
