import BaseModel from "./BaseModel"
import DiscussModel from "./DiscussModel"

export class NotificationModel extends DiscussModel {
    receiver_id:string 
    SongImage: string
    createtime:string
    replay_user_id:string
    constructor() {
        super()
        this.replay_user_id=""
        this.receiver_id = ""
        this.SongImage=""
        this.createtime=""
    }
}