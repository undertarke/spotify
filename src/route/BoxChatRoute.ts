import { Router } from "express";
import boxController from "../controller/BoxController"

const BoxChatRoute = Router()

BoxChatRoute.post("/chat", boxController.Chat) //0k
BoxChatRoute.post("/", boxController.GetAllBoxChat)//0k
BoxChatRoute.post("/remove", boxController.Remove)//0k
export default BoxChatRoute