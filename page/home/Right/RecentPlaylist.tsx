import { useState } from "react";
import PlayButtom from "../PlayButtom";
import React from "react";

interface RecentPlaylist {
  img: string;
  name: string;
}
interface List {
  children: React.JSX.Element[];
}
export function RecentPlaylist(params: RecentPlaylist) {
  const [hidden, SetHidden] = useState(true);
  return (
    <div
      className="flex items-center space-x-2 bg-[#414854] relative"
      onMouseEnter={() => {
        SetHidden(false);
        
      }}
      onMouseLeave={() => {
        SetHidden(true);
      }}
    >
      <div className="size-[64px]">
        <img src={params.img} alt="" srcSet="" />
      </div>
      <div className="text-white text-[16px] font-bold ">{params.name}</div>
      {hidden ? (
        <></>
      ) : (
        <div className="absolute right-0 bottom-0">
          <PlayButtom />
        </div>
      )}
    </div>
  );
}
export default function RecentList(params: List) {
  return <div className="grid grid-cols-4 gap-1 py-2">{params.children}</div>;
}
