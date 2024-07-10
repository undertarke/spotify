import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { SetMess } from "../home/RootRedux";

export const socket = io();


