import BaseModel from "./BaseModel"

export default class SongModel extends BaseModel {
    Id: string
    user_id: string
    Genre_id: string
    SongName: string
    Singer: string
    Duration: string
    Viewer: number
    description: string
    SongImage: string
    status: number
    publicDate: string
    filePath: string
    dicussquality: number
    constructor() {
        super()
        this.dicussquality = 0
        this.SongImage = ""
        this.description = ""
        this.Id = ""
        this.Duration = ""
        this.Genre_id = ""
        this.Singer = ""
        this.SongName = ""
        this.Viewer = 0
        this.user_id = ""
        this.status = 0
        this.publicDate = ""
        this.filePath = ""
    }
}



