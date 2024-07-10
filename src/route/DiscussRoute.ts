import { Router } from "express";
import discussController from "../controller/DiscussController";


const DiscussRoute = Router()


DiscussRoute.post("/", discussController.GetMainDiscuss) //0k
DiscussRoute.post("/ReplayList", discussController.GetReplayDiscuss)//0k
DiscussRoute.post("/add", discussController.PostDisscus)//0k
DiscussRoute.post("/replay", discussController.PostReplay)//0k
DiscussRoute.post("/delete", discussController.Delete)//0k

DiscussRoute.post





export default DiscussRoute