import React, { useEffect, useState } from "react";
import Song from "../Song";
import { useDispatch, useSelector } from "react-redux";
import { NaviRight, RootHome, ShowRecentList } from "../RootRedux";
import Audio from "./Audio";
import { post } from "../../config/req";

interface SongI {
  Id: string;
  SongName: string;
  Singer: string;
  Duration: string;
  SongImage: string;
  filePath: string;
  like: boolean;
}
export default function PlayingBar() {
  const dispatch = useDispatch();
  const idsong = useSelector((state: RootHome) => state.rootHome.idSong);
  const isLogin = useSelector((state: RootHome) => state.rootHome.isLogin);
  const Right = useSelector((state: RootHome) => state.rootHome.Right);
  const recentList = useSelector((s: RootHome) => s.rootHome.recentList);
  var temp: SongI | undefined = undefined;
  if (localStorage.getItem("song") != null) {
    temp = JSON.parse(localStorage.getItem("song") as string);
  }

  var NextSong = (Song: SongI) => {
    localStorage.setItem("song", JSON.stringify(Song));
    SetSong(Song);
  };
  const [song, SetSong] = useState<SongI>({
    Duration: temp?.Duration ? temp.Duration : "",
    filePath: temp?.filePath ? temp.filePath : "",
    Id: temp?.Id ? temp.Id : "",
    SongImage: temp?.SongImage ? temp.SongImage : "",
    Singer: temp?.Singer ? temp.Singer : "",
    SongName: temp?.SongName ? temp.SongName : "",
    like: true,
  });
  useEffect(() => {
    post(
      "/song/get",
      {
        idsong: idsong,
      },
      (v: any) => {
        if (!v.err) {
          SetSong(v.song);
          localStorage.setItem("song", JSON.stringify(v.song));
        }
      }
    );
  }, [idsong]);
  return (
    <div className="w-full bg-[#121212] h-[12%] grid items-center grid-cols-4 mt-2">
      <Song
        Id={song.Id}
        image={song.SongImage}
        name={song.SongName}
        singer={song.Singer}
      />
      <Audio path={song.filePath} next={NextSong} id={song.Id} />
      <div className="flex space-x-2 justify-end items-center">
        {isLogin ? (
          <>
            <div
              onClick={() => {
                post(
                  "/lsong/add",
                  {
                    Id: song.Id,
                  },
                  (v: any) => {
                    if (v.err) {
                      alert("có lỗi");
                    } else {
                      SetSong({ ...song, like: !song.like });
                    }
                  }
                );
              }}
            >
              {song.like ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="size-6 fill-[#EE2339] "
                >
                  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="size-6 fill-white "
                >
                  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
              )}
            </div>

            <div className="border-white h-6 border-l-2  pr-2"></div>
            <button
              className="flex"
              onClick={() => {
                dispatch(NaviRight("Discuss"));
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                className="fill-blue-500 size-6 hover:fill-[#1FDF64]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
              <div className="px-2">Bình luận</div>
            </button>
            <div className="border-white h-6 border-l-2  pr-2"></div>
            <button
              className="p-2 bg-black rounded-lg shadow-2xl"
              onClick={() => {
                dispatch(NaviRight("Queue"));
              }}
            >
              {Right == "Queue" && recentList == true ? (
                <div className="p-2 bg-white rounded-lg">
                  <svg
                    fill=""
                    version="1.1"
                    id="Capa_1"
                    viewBox="0 0 512 512"
                    className="fill-green-500 size-5 "
                  >
                    <g>
                      <path d="M48,64h160c17.672,0,32-14.328,32-32c0-17.674-14.328-32-32-32H48C30.328,0,16,14.326,16,32C16,49.672,30.328,64,48,64z" />
                      <path d="M48,160h160c17.672,0,32-14.328,32-32c0-17.674-14.328-32-32-32H48c-17.672,0-32,14.326-32,32   C16,145.672,30.328,160,48,160z" />
                      <path d="M240,224c0-17.674-14.328-32-32-32H48c-17.672,0-32,14.326-32,32c0,17.672,14.328,32,32,32h160   C225.672,256,240,241.672,240,224z" />
                      <path d="M411.328,75.914C393.043,61.805,368,42.477,368,32c0-17.672-14.328-32-32-32s-32,14.328-32,32v293.58   c-10.023-3.549-20.762-5.58-32-5.58c-53.02,0-96,42.98-96,96s42.98,96,96,96s96-42.98,96-96V123.293   c1.414,1.094,2.82,2.203,4.23,3.293c36.105,27.852,59.77,48.078,59.77,74.305c0,40.766-21.684,63.516-22.305,64.164   c-12.672,12.32-12.961,32.578-0.641,45.25c6.273,6.453,14.605,9.695,22.949,9.695c8.035,0,16.082-3.008,22.301-9.055   c4.27-4.148,41.695-42.484,41.695-110.055C496,141.25,449.051,105.023,411.328,75.914z" />
                    </g>
                  </svg>
                </div>
              ) : (
                <>
                  <div className="p-2 bg-green-500 rounded-lg">
                    <svg
                      fill=""
                      version="1.1"
                      id="Capa_1"
                      viewBox="0 0 512 512"
                      className="fill-white size-5"
                    >
                      <g>
                        <path d="M48,64h160c17.672,0,32-14.328,32-32c0-17.674-14.328-32-32-32H48C30.328,0,16,14.326,16,32C16,49.672,30.328,64,48,64z" />
                        <path d="M48,160h160c17.672,0,32-14.328,32-32c0-17.674-14.328-32-32-32H48c-17.672,0-32,14.326-32,32   C16,145.672,30.328,160,48,160z" />
                        <path d="M240,224c0-17.674-14.328-32-32-32H48c-17.672,0-32,14.326-32,32c0,17.672,14.328,32,32,32h160   C225.672,256,240,241.672,240,224z" />
                        <path d="M411.328,75.914C393.043,61.805,368,42.477,368,32c0-17.672-14.328-32-32-32s-32,14.328-32,32v293.58   c-10.023-3.549-20.762-5.58-32-5.58c-53.02,0-96,42.98-96,96s42.98,96,96,96s96-42.98,96-96V123.293   c1.414,1.094,2.82,2.203,4.23,3.293c36.105,27.852,59.77,48.078,59.77,74.305c0,40.766-21.684,63.516-22.305,64.164   c-12.672,12.32-12.961,32.578-0.641,45.25c6.273,6.453,14.605,9.695,22.949,9.695c8.035,0,16.082-3.008,22.301-9.055   c4.27-4.148,41.695-42.484,41.695-110.055C496,141.25,449.051,105.023,411.328,75.914z" />
                      </g>
                    </svg>
                  </div>
                </>
              )}
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
