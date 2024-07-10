import React, { useEffect, useState } from "react";
import { SongList } from "./PlayList";
import { PlayList } from "./IdGenre";
import { Song } from "./PlayList";
import { useDispatch, useSelector } from "react-redux";
import { NaviPage, RootHome } from "./RootRedux";
import { post } from "../config/req";
import PlayButtom from "./PlayButtom";
interface artist {
  pathImage: string;
  ChanalName: string;
  artist: string;
  id: string;
  type: string;
}
interface Artists {
  d: artist[];
}
export default function Search() {
  const [songname, SetSongName] = useState<Song[]>([]);
  const [songs, SetSongS] = useState<Song[]>([]);

  const search = useSelector((state: RootHome) => state.rootHome.command.param);
  const [artist, SetArtis] = useState<artist[]>([]);
  const [playlists, SetPlayLists] = useState<PlayList[]>([]);
  useEffect(() => {
    post("/search", { name: search }, (v: any) => {
      SetSongName(v["ls"]);
      SetArtis(v["artise"]);
      SetSongS(v["songls"]);
      SetPlayLists(v["playlists"]);
    });
  }, [search]);
  return (
    <div className="w-full">
      <SongList data={songname} />
      <Artists d={artist} />
      <SongList data={songs} />
      <PlayLists d={playlists} />
    </div>
  );
}

function Artists(d: Artists) {
  const recentList = useSelector(
    (state: RootHome) => state.rootHome.recentList
  );
  return (
    <div className="mt-8">
      {d.d.length > 0 ? (
        <div className="text-white text-[24px] my-5 font-bold">Nghệ sĩ</div>
      ) : (
        <></>
      )}
      <div
        className={`grid gap-3 ${!recentList ? "grid-cols-6" : "grid-cols-7 "}`}
      >
        {d.d.map((v) => {
          return (
            <Artist
              ChanalName={v.ChanalName}
              artist={v.artist}
              key={v.id}
              id={v.id}
              pathImage={v.pathImage}
              type="nghệ sĩ"
            />
          );
        })}
      </div>
    </div>
  );
}

function Artist(params: artist) {
  const [hidden, SetHidden] = useState(true);

  const dispatch = useDispatch();
  return (
    <div
      className="w-full cursor-pointer"
      onClick={() => {
        dispatch(NaviPage({ page: "playlist", param: params.id }));
      }}
      onMouseEnter={() => {
        SetHidden(false);
      }}
      onMouseLeave={() => {
        SetHidden(true);
      }}
    >
      <div className="relative">
        <img
          src={params.pathImage}
          className="w-full rounded-full"
          alt=""
          srcSet=""
        />
        {hidden ? (
          <></>
        ) : (
          <div className="absolute right-0 bottom-0">
            <PlayButtom />
          </div>
        )}
      </div>
      <div className="text-[16px] text-white font-bold line-clamp-1">
        {params.ChanalName}
      </div>
      <div className="text-[14px] text-[#b3b3b3] font-normal line-clamp-1">
        {params.type == "artist" ? "nghệ sĩ" : params.artist}
      </div>
    </div>
  );
}
interface PlayLists {
  d: PlayList[];
}
function PlayLists(p: PlayLists) {
  var children = p.d.map((v) => {
    return (
      <PlayList
        Genre_ID={v.Genre_ID}
        ImagePath={v.ImagePath}
        PlayListName={v.PlayListName}
        id={v.id}
        key={v.id}
      />
    );
  });
  const recentList = useSelector((s: RootHome) => s.rootHome.recentList);
  return (
    <>
      <div>
        {children.length > 0 ? (
          <div className="text-[24px] my-5">Danh sách phát nhạc</div>
        ) : (
          <></>
        )}
      </div>
      <div
        className={`grid gap-2 ${!recentList ? "grid-cols-7" : "grid-cols-5 "}`}
      >
        {children}
      </div>
    </>
  );
}
