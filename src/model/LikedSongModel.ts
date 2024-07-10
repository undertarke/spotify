import SongModel from "./SongModel";

export default class LikedSongModel extends SongModel {
  liked: number;
  Id: string;
  id_user_liked: string;
  constructor() {
    super();
    this.liked = 0;
    this.Id = "";
    this.id_user_liked = "";
  }
}
