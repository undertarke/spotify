import React, { useState } from "react";
import { Duration, post } from "../config/req";
import { useDispatch } from "react-redux";
import { PlaySong } from "./RootRedux";

interface Song {
  image: string;
  name: string;
  singer: string;
  Id: string;
}
export default function Song(d: Song) {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch(PlaySong(d.Id));
      }}
      className="flex justify-center items-center px-1 cursor-pointer"
    >
      {d.image != "" ? (
        <img
          src={d.image}
          alt=""
          srcSet=""
          className="size-[50px] rounded-lg"
        />
      ) : (
        <></>
      )}
      <div className="flex-1 text-white space-y-1 px-1">
        <div className="font-bold text-[16px] line-clamp-1">{d.name}</div>
        <div className="text-[14px] text-stone-300">{d.singer}</div>
      </div>
    </div>
  );
}
interface SongInPlayList {
  Id: string;
  user_id: string;
  SongName: string;
  Singer: string;
  Duration: string;
  Viewer: number;
  SongImage: string;
  filePath: string;
  liked: string;
  stt: number;
}
export function SongInPlayList(v: SongInPlayList) {
  const [liked, SetLike] = useState<string>(v.liked);
  const dispatch = useDispatch();
  return (
    <div className="grid grid-cols-7 cursor-pointer space-x-2 hover:bg-[#2D2D2D] text-white font-bold p-4 rounded-lg items-center">
      <div
        onClick={() => {
          dispatch(PlaySong(v.Id));
        }}
        className="col-span-6 grid grid-cols-6"
      >
        <div className="col-span-1 flex items-center space-x-2">
          <div className="">{v.stt}</div>
          <img className="size-9" src={v.SongImage} alt="" srcSet="" />
        </div>
        <div className="col-span-2">{v.SongName}</div>
        <div className="col-span-2 text-[14px] text-stone-500">{v.Viewer}</div>
      </div>

      <div
        className="col-span-1 flex items-center space-x-4"
        onClick={() => {
          post(
            "/lsong/add",
            {
              Id: v.Id,
            },
            (v: any) => {
              if (v.err) {
                alert("có lỗi");
              } else {
                SetLike(v.liked);
              }
            }
          );
        }}
      >
        {liked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="size-6 fill-[#EE2339]"
          >
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        )}
        <Duration Duration={v.Duration} />
      </div>
    </div>
  );
}
