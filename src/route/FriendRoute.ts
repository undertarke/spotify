import { Router } from "express";
import haveListFriendController from "../controller/HaveListFriendController";
const FriendRoute = Router()



FriendRoute.post("/Request", haveListFriendController.AddFriendsRequset)//0k
FriendRoute.post("/Reponse", haveListFriendController.GetRespond)//0k
FriendRoute.post("/", haveListFriendController.GetAllFriend)//0k
FriendRoute.post("/Cancenl", haveListFriendController.CancelRequst)//0k
FriendRoute.post("/Accept", haveListFriendController.AcceptRequset)//0k



export default FriendRoute