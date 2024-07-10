import { useDispatch, useSelector } from "react-redux";
import rootHome, { NaviPage, RootHome } from "./RootRedux";
import { useEffect, useState } from "react";
import React from "react";
import { get } from "../config/req";
import PlayButtom from "./PlayButtom";
export interface PlayList {
  id: string;
  Genre_ID: string;
  ImagePath: string;
  PlayListName: string;
}
interface Genre {
  Id: string;
  Name: string;
  RightGenre: number;
  LeftGenre: number;
  idParent: string;
  Floor: number;
}
export default function IdGenre() {
  const idgenre = useSelector(
    (state: RootHome) => state.rootHome.command.param
  );
  const [playlists, SetPlayLists] = useState<PlayList[]>([]);
  const [genres, SetGernes] = useState<Genre[]>([]);

  useEffect(() => {
    get(`genre/${idgenre}`, (v: any) => {
      console.log(v);
      
      SetPlayLists(v.playlist);
      SetGernes(v.genre);
    });
  }, [idgenre]);

  var ls = genres.map((v, i) => {
    return <PlayListByGenre genre={v} ls={playlists} key={i} />;
  });
  return <div>{ls}</div>;
}
interface PlayListByGenre {
  genre: Genre;
  ls: PlayList[];
}
function PlayListByGenre(d: PlayListByGenre) {
  const recentList = useSelector((s: RootHome) => s.rootHome.recentList);
  var ls = d.ls
    .filter((v) => {
      return v.Genre_ID == d.genre.Id;
    })
    .map((v) => {
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
  return (
    <div className="">
      {ls.length > 0 ? (
        <div className="text-white my-3 space-y-3">
          <div className="text-[24px] font-bold">{d.genre.Name}</div>
          <div
            className={`grid gap-2 ${
              !recentList ? "grid-cols-7" : "grid-cols-5 "
            }`}
          >
            {ls}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export function PlayList(d: PlayList) {
  const [show, SetShow] = useState(false);
  const dispatch = useDispatch();
  return (
    <div>
      <div
        className="cursor-pointer relative"
        onMouseEnter={() => {
          SetShow(true);
        }}
        onMouseLeave={() => {
          SetShow(false);
        }}
        onClick={() => {
          dispatch(
            NaviPage({
              page: "playlist",
              param: d.id,
            })
          );
          
        }}
      >
        <img src={d.ImagePath} className="rounded-2xl" alt="" srcSet="" />
        {show ? (
          <div className="absolute bottom-0 right-0">
            <PlayButtom />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="text-[16px] line-clamp-1">{d.PlayListName}</div>
    </div>
  );
}
