"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const HaveListFriendController_1 = __importDefault(require("../controller/HaveListFriendController"));
const FriendRoute = (0, express_1.Router)();
FriendRoute.post("/Request", HaveListFriendController_1.default.AddFriendsRequset);
FriendRoute.post("/Reponse", HaveListFriendController_1.default.GetRespond);
FriendRoute.post("/", HaveListFriendController_1.default.GetAllFriend);
FriendRoute.post("/Cancenl", HaveListFriendController_1.default.CancelRequst);
FriendRoute.post("/Accept", HaveListFriendController_1.default.AcceptRequset);
exports.default = FriendRoute;
