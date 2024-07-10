import { useEffect, useState } from "react";
import PlayButtom from "./PlayButtom";
import React from "react";
import { get } from "../config/req";
import { useDispatch, useSelector } from "react-redux";
import { NaviPage, RootHome } from "./RootRedux";

interface SetionList {
  name: string;
  type: "artist" | "album" | "normal";
}
export function SetionList(params: SetionList) {
  const [artist, SetaAtist] = useState<SetionData[]>([]);
  const recentList = useSelector(
    (state: RootHome) => state.rootHome.recentList
  );
  useEffect(() => {
    get("/user/artist", (v: any) => {
      SetaAtist(v.ls);
    });
  }, []);
  return (
    <div className="mt-8">
      <div className="text-white text-[24px] font-bold">{params.name}</div>
      <div
        className={`grid gap-3 ${!recentList ? "grid-cols-7" : "grid-cols-5 "}`}
      >
        {artist.map((v) => {
          return (
            <SetionData
              ChanalName={v.ChanalName}
              artist={v.artist}
              key={v.id}
              id={v.id}
              pathImage={v.pathImage}
              type={params.type}
            />
          );
        })}
      </div>
    </div>
  );
}
interface SetionData {
  pathImage: string;
  ChanalName: string;
  artist: string;
  id: string;
  type: string;
}
export default function SetionData(params: SetionData) {
  const [hidden, SetHidden] = useState(true);

  const dispatch = useDispatch();
  return (
    <div
      className="w-full cursor-pointer"
      onClick={() => {
        dispatch(NaviPage({ page: "artise", param: params.id }));
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
