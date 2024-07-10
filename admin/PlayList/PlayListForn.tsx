import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Page, ReSetSelectSong, RootState } from "../Redux";
import { Song } from "../SongList";
import IndexGenres from "../GenreLs";
import { get, post } from "../../page/config/req";

interface PlayListFormData {
  id: string;
  Genre_ID: string;
  ImagePath: string;
  PlayListName: string;
  Discripition: string;
}
export default function PlayListForm() {
  const SelectListl = useSelector((state: RootState) => state.navi.SelectList);

  var ls: React.JSX.Element[] = [];
  var stt = 0;
  for (const key in SelectListl) {
    const element = SelectListl[key];

    stt += 1;
    ls.push(
      <Song
        Duration={element.Duration}
        Id={element.Id}
        Singer={element.Singer}
        SongName={element.SongName}
        Viewer={element.Viewer}
        filePath={element.filePath}
        SongImage={element.ImagePath}
        stt={stt}
        user_id={element.user_id}
        key={element.Id}
      />
    );
  }
  return (
    <div className="w-[90%] mx-auto h-full">
      <IndexGenres />
      {ls}
      <PlayListFormData />
    </div>
  );
}

function PlayListFormData() {
  const floor = useSelector((state: RootState) => state.navi.floor);
  const slectGenre = useSelector((state: RootState) => state.navi.slectGenre);
  const [file, SetFile] = useState<File>();
  const SelectList = useSelector((state: RootState) => state.navi.SelectList);
  
  const dispatch = useDispatch();
  const [playlist, SetPlayList] = useState<PlayListFormData>({
    Discripition: "",
    Genre_ID: "",
    id: "",
    ImagePath: "",
    PlayListName: "",
  });

  return (
    <div className="w-full space-y-3 ">
      <div>Tên Danh Sách Phát</div>
      <div>
        <input
          onChange={(e) => {
            SetPlayList({
              ...playlist,
              PlayListName: e.currentTarget.value,
            });
          }}
          type="text"
          className="border-2 border-[#404040]  rounded-lg p-2 w-full"
        />
      </div>
      <div className="flex w-full">
        <div className="anh w-1/2">
          <div className="mb-2">Ảnh đại diên</div>
          <label
            htmlFor={playlist.ImagePath == "" ? "avatar" : "gdas"}
            className=" px-4 py-2 rounded-full w-full"
          >
            <div className="w-full">
              {playlist.ImagePath == "" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-1/3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              ) : (
                <div>
                  <div
                    className="px-4 py-2 w-max bg-blue-600 rounded-full my-2"
                    onClick={() => {
                      SetPlayList({
                        ...playlist,
                        ImagePath: "",
                      });
                    }}
                  >
                    xóa
                  </div>
                  <img className="size-[100px]" src={playlist.ImagePath} />
                </div>
              )}
            </div>

            <input
              id="avatar"
              type="file"
              className=" invisible "
              onChange={(e) => {
                var files = e.currentTarget.files;
                if (files != null && files.length > 0) {
                  var file = URL.createObjectURL(files[0]);
                  SetFile(files[0]);
                  SetPlayList({
                    ...playlist,
                    ImagePath: file,
                  });
                }
              }}
            />
          </label>
        </div>
      </div>
      <div
        onClick={() => {
          if (file == undefined) {
            return;
          }

          var form = new FormData();

          for (const key in SelectList) {
            const element = SelectList[key] as any;
            form.append("ls", element.Id);
          }
          form.set("avatar", file);
          const myObj: { [key: string]: any } = playlist;
          for (const key in myObj) {
            const element = myObj[key];
            form.set(key, element);
          }
          form.set("Genre_ID", slectGenre[floor]);
          post("/playlist/AddNewPlayList", form, (v: any) => {
            if (!v.err) {
              dispatch(Page("songlist"));
              dispatch(ReSetSelectSong());
            }
          });
        }}
        className="text-black px-3 py-1 border-2 rounded-lg w-max cursor-pointer"
      >
        Thêm Mới
      </div>
    </div>
  );
}
