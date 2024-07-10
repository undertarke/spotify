import BaseModel from "./BaseModel";


export default class DiscussModel extends BaseModel {
    User_Id: string
    Discuss_Id: string
    Parent_discuss_Id: string
    Replay_Discuss_Id: string
    Replay_quality: string
    Content: string
    Type: string
    Song_Id: string
    Name: string
    pathImage: string
    constructor() {
        super()
        this.User_Id = ""
        this.Name = ""
        this.pathImage = ""
        this.Discuss_Id = ""
        this.Parent_discuss_Id = ""
        this.Replay_Discuss_Id = ""
        this.Replay_quality = ""
        this.Content = ""
        this.Type = ""
        this.Song_Id = ""

    }
}