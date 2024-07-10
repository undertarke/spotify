import BaseModel from "./BaseModel";

class UserModel extends BaseModel {
    id: string
    Vertify: number
    Nationality: string
    ChanalName: string
    Account: string
    Name: string
    description: string
    pathImage: string
    Password: string
    Banner: string
    RefeshToken: string
    role: string
    constructor() {
        super()
        this.role = "user"
        this.RefeshToken = ""
        this.Password = ""
        this.Name = ""
        this.id = ""
        this.Vertify = 0
        this.Nationality = ""
        this.ChanalName = ""
        this.Account = ""
        this.description = ""
        this.pathImage = ""
        this.Banner = ""

    }
    setAll(d: any): void {
        super.setAll(d)
        this.Password = ""
        this.pathImage = this.pathImage || "public/avatar/avatar.jpg"
    }
}

export default UserModel