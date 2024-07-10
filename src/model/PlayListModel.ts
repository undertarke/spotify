import BaseModel from "./BaseModel";

export class PlayListModel extends BaseModel {
    id: string
    User_id: string
    Genre_ID: string
    Type: number
    ImagePath: string
    PlayListName: string
    Likes: number
    Songs: number
    Duration: string
    Status: string
    Discripition: string
    constructor() {
        super()
        this.id = ""
        this.User_id = ""
        this.Genre_ID = ""
        this.Type = 0
        this.ImagePath = ""
        this.PlayListName = ""
        this.Likes = 0
        this.Songs = 0
        this.Duration = ""
        this.Status = ""
        this.Discripition = ""
    }

}

