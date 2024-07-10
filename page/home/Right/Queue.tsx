import React, { useEffect, useState } from "react";
import Song from "../Song";
import { useDispatch, useSelector } from "react-redux";
import RecentList from "./RecentPlaylist";
import { RootHome, ShowRecentList } from "../RootRedux";
import { get } from "../../config/req";
interface RecentSong {
  Id: string;
  user_id: string;
  Genre_id: string;
  SongName: string;
  Singer: string;
  Duration: string;
  Viewer: number;
  description: string;
  SongImage: string;
  status: number;
  publicDate: string;
  filePath: string;
}
export default function Queue() {
  const dispatch = useDispatch();
  const recentList = useSelector((s: RootHome) => s.rootHome.recentList);
  const [recentSongs, SetRecentSongs] = useState<RecentSong[]>([]);
  const Right = useSelector((state: RootHome) => state.rootHome.Right);
  useEffect(() => {
    get("/rs/", (v: any) => {
      SetRecentSongs(v.ls);
    });
  }, []);
  return (
    <div className="w-[400px] h-full bg-[#121212] rounded-lg  overflow-y-scroll">
      <div className="sticky bg-[#121212] top-0 left-0 flex space-x-3 h-min w-full px-3 rounded-lg py-4 ">
        <div className=" cursor-pointer font-bold w-max  text-white  text-[14px]">
          Danh sách chờ
        </div>
        <div className=" cursor-pointer border-b-4 border-green-800 font-bold w-max text-white  text-[14px]">
          Đã phát gần đây
        </div>
        <div
          onClick={() => {
            dispatch(ShowRecentList(false));
          }}
          className=" cursor-pointer font-bold w-max text-white flex justify-end text-[14px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            className="size-7"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </div>
      </div>
      <div className="bg-[#121212] text-white font-bold mt-1 rounded-lg space-y-3 pb-3">
        <div className="px-2">Đang phát</div>
        {recentSongs.map((v) => {
          return (
            <Song
              image={v.SongImage}
              name={v.SongName}
              singer={v.Singer}
              Id={v.Id}
              key={v.Id}
            ></Song>
          );
        })}
      </div>
    </div>
  );
}
