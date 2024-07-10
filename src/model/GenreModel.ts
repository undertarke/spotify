import BaseModel from "./BaseModel"

export default class GenreModel extends BaseModel {
    Id: string
    Name: string
    RightGenre: number
    LeftGenre: number
    idParent: string
    Floor: number
    constructor() {
        super()
        this.Floor = 0
        this.idParent = ""
        this.Id = ""
        this.Name = ""

        this.RightGenre = 0
        this.LeftGenre = 0
    }
}

