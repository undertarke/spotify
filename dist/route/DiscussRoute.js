"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DiscussController_1 = __importDefault(require("../controller/DiscussController"));
const DiscussRoute = (0, express_1.Router)();
DiscussRoute.post("/", DiscussController_1.default.GetMainDiscuss); //0k
DiscussRoute.post("/ReplayList", DiscussController_1.default.GetReplayDiscuss); //0k
DiscussRoute.post("/add", DiscussController_1.default.PostDisscus); //0k
DiscussRoute.post("/replay", DiscussController_1.default.PostReplay); //0k
DiscussRoute.post("/delete", DiscussController_1.default.Delete); //0k
DiscussRoute.post;
exports.default = DiscussRoute;
