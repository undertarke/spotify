import React, { useEffect, useState } from "react";
import IndexGenres from "../GenreLs";
import { post } from "../../page/config/req";
import { useDispatch, useSelector } from "react-redux";
import { EditPlayList, Page, RootState } from "../Redux";

export default function PlaylistAndGenre() {
  return (
    <div className="w-full h-full">
      <IndexGenres />
      <PlayLists />
    </div>
  );
}

interface PlayList {
  id: string;
  //User_id: string;
  //Genre_ID: string;
  //Type: number;
  ImagePath: string;
  PlayListName: string;
  //Likes: number;
  //Songs: number;
  //Duration: string;
  //Status: string;
  //Discripition: string;
}
function PlayList(d: PlayList) {
  const dispatch = useDispatch();
  const [show, SetShow] = useState(false);
  return (
    <div
      className=""
      onMouseEnter={() => {
        SetShow(true);
      }}
    >
      <div className=" relative">
        {show ? (
          <div>
            <div className=" bg-black opacity-65 rounded-2xl absolute top-0 left-0 w-full h-full"></div>
            <div
              onMouseLeave={() => {
                SetShow(false);
              }}
              onClick={() => {
                dispatch(EditPlayList(d.id));
                dispatch(Page("playlistedit"));
              }}
              className="absolute cursor-pointer flex-col top-0 left-0 w-full h-full flex justify-center items-center"
            >
              <svg
                data-encore-id="icon"
                role="img"
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-[50px] fill-white "
              >
                <path d="M17.318 1.975a3.329 3.329 0 1 1 4.707 4.707L8.451 20.256c-.49.49-1.082.867-1.735 1.103L2.34 22.94a1 1 0 0 1-1.28-1.28l1.581-4.376a4.726 4.726 0 0 1 1.103-1.735L17.318 1.975zm3.293 1.414a1.329 1.329 0 0 0-1.88 0L5.159 16.963c-.283.283-.5.624-.636 1l-.857 2.372 2.371-.857a2.726 2.726 0 0 0 1.001-.636L20.611 5.268a1.329 1.329 0 0 0 0-1.879z"></path>
              </svg>
              <div className="text-white text-[16px]">Chỉnh Sửa </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <img src={d.ImagePath} className="rounded-2xl" alt="" srcSet="" />
      </div>
      <div className="text-[16px] ">{d.PlayListName}</div>
    </div>
  );
}
function PlayLists() {
  const slectGenre = useSelector((state: RootState) => state.navi.slectGenre);
  const floor = useSelector((state: RootState) => state.navi.floor);
  const [playlists, SetPlaylists] = useState<PlayList[]>([]);
  useEffect(() => {
    post(
      "/playlist/GetAllPlayList",
      { Genre_ID: slectGenre[floor] },
      (v: any) => {
        SetPlaylists(v.ls);
      }
    );
  }, [slectGenre[floor]]);
  return (
    <div className="grid grid-cols-6 gap-2 h-full p-2">
      {playlists.map((v) => {
        return (
          <PlayList
            id={v.id}
            key={v.id}
            ImagePath={v.ImagePath}
            PlayListName={v.PlayListName}
          />
        );
      })}
    </div>
  );
}
