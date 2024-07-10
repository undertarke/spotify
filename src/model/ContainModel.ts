import SongModel from "./SongModel";

export default class ContainModel extends SongModel {
    Song_id: string
    PlayList_id: string
    TimeCreate: string

    constructor() {
        super()
        this.Song_id = ""
        this.PlayList_id = ""
        this.TimeCreate = ""
    }
}