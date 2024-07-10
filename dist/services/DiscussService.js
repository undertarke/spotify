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
exports.DiscussService = void 0;
const DiscussDatabase_1 = __importDefault(require("../database/DiscussDatabase"));
const DiscussModel_1 = __importDefault(require("../model/DiscussModel"));
class DiscussService {
    constructor(i) {
        this.data = i;
    }
    Add(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.data.Add(d);
            return check;
        });
    }
    GetMainDiscussBySong_Id(Song_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.data.GetMainDiscussBySong_Id(Song_Id);
            return this.Setls(check);
        });
    }
    GetReplayDiscussByParentDiscussId(Parent_discuss_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.data.GetReplayDiscussByParentDiscussId(Parent_discuss_Id);
            return this.Setls(check);
        });
    }
    Get(Discuss_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.data.Get(Discuss_Id);
            var list = this.Setls(check);
            return list.length > 0 ? list[0] : undefined;
        });
    }
    Increase(Parent_discuss_Id, n) {
        return __awaiter(this, void 0, void 0, function* () {
            n = n || 1;
            var check = yield this.data.Increase(Parent_discuss_Id, n);
            return check;
        });
    }
    DeIncrease(Parent_discuss_Id, n) {
        return __awaiter(this, void 0, void 0, function* () {
            n = n || 1;
            var check = yield this.data.DeIncrease(Parent_discuss_Id, n);
            return check;
        });
    }
    Delete(Discuss_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.data.Delete(Discuss_Id);
            return check;
        });
    }
    DeleteChildren(Parent_discuss_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.data.DeleteChildren(Parent_discuss_Id);
            return check;
        });
    }
    Setls(ls) {
        var list = [];
        if (ls == undefined) {
            return list;
        }
        for (let i = 0; i < ls.length; i++) {
            const element = ls[i];
            var tem = new DiscussModel_1.default();
            tem.setAll(element);
            list.push(tem);
        }
        return list;
    }
}
exports.DiscussService = DiscussService;
var discussService = new DiscussService(new DiscussDatabase_1.default);
exports.default = discussService;
