import React from "react";
import IndexGenres from "./GenreLs";
import SongList from "./SongList";

export default function SongAndGenre() {
  return (
    <div className="w-full h-full">
      <IndexGenres />
      <SongList />
    </div>
  );
}
