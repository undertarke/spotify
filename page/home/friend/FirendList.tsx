import React, { useEffect, useState } from "react";
import { post } from "../../config/req";

export interface Friend {
  avatar: string;
  nameUser: string;
  id: string;
}

function useFiendList() {
  const [friends, SetFriends] = useState<Friend[]>([]);

  useEffect(() => {
    post("friends/", {}, (data: any) => {
      SetFriends([...data.l]);
    });
  }, []);

  return { friends };
}

export default function FiendList() {
  const { friends } = useFiendList();

  var ls = friends.map((v, i) => {
    return (
      <FiendData avatar={v.avatar} id={v.id} nameUser={v.nameUser} key={i} />
    );
  });
  return <>{ls}</>;
}
function FiendData(data: Friend) {
  return (
    <div className="px-2 h-18 my-2 CircularSpUIv3T-Book flex hover:bg-stone-200  cursor-pointer py-2">
      <div className="flex justify-center ">
        <div className="overflow-hidden w-14 h-14 rounded-full mr-2">
          <img
            className="w-full"
            src="https://yt3.ggpht.com/EkVoaVZHZczMS4hz6NFPI1xdzmdFwh9PT8canS92TvtmZp3tHUEdNVem55RQIeFQsYUlextLzw=s88-c-k-c0x00ffffff-no-rj"
            alt=""
          />
        </div>
      </div>
      <div className="w-4/5">
        <div className="">
          <div className="">Nguyễn Huy</div>
        </div>
        <div>
          <button className="px-3 py-1 rounded-xl bg-blue-400">Nhắn tin</button>
        </div>
      </div>
    </div>
  );
}
