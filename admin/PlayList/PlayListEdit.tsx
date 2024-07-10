import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Page,
  ReSetSelectSong,
  RemoveSelectSong,
  RootState,
  SetFloor,
  addGenre,
} from "../Redux";
import { Song } from "../SongList";
import IndexGenres from "../GenreLs";
import { get, post } from "../../page/config/req";
interface SongForm {
  Id: string;
  user_id: string;
  SongName: string;
  Singer: string;
  Duration: string;
  Viewer: number;
  SongImage: string;
  filePath: string;
  stt: number;
}
interface OldSong extends SongForm {
  idPlaylist: string;
}
interface PlayListFormData {
  id: string;
  Genre_ID: string;
  ImagePath: string;
  PlayListName: string;
  Discripition: string;
}
export default function PlayListEdit() {
  return (
    <div className="w-[90%] mx-auto h-full">
      <IndexGenres />
      <PlayListFormData />
    </div>
  );
}

function PlayListFormData() {
  const dispatch = useDispatch();

  const floor = useSelector((state: RootState) => state.navi.floor);
  const slectGenre = useSelector((state: RootState) => state.navi.slectGenre);
  const SelectList = useSelector((state: RootState) => state.navi.SelectList);
  const [song, SetSongs] = useState<SongForm[]>([]);
  const idPlaylistEdit = useSelector(
    (state: RootState) => state.navi.idPlaylistEdit
  );
  const [file, SetFile] = useState<File>();
  const [newSongImage, SetNewSongImage] = useState("");

  const [playlist, SetPlayList] = useState<PlayListFormData>({
    Discripition: "",
    Genre_ID: "",
    id: "",
    ImagePath: "",
    PlayListName: "",
  });
  useEffect(() => {
    get(`playlist/playListDetailAdmin/${idPlaylistEdit}`, (v: any) => {
      if (!v.err) {
        SetPlayList(v.playlist);
        for (let i = 0; i < v.genre.length; i++) {
          const element = v.genre[i];
          dispatch(
            addGenre({
              Floor: element.Floor as number,
              Id: element.Id as string,
              name: element.Name,
            })
          );
        }
        dispatch(SetFloor(v.genre.length));
        SetSongs(v.songs);
      }
    });
  }, []);
  var stt = 0;
  var ls = song.map((element) => {
    dispatch(RemoveSelectSong(element.Id));
    stt += 1;
    return (
      <OldSong
        idPlaylist={idPlaylistEdit}
        Duration={element.Duration}
        Id={element.Id}
        Singer={element.Singer}
        SongName={element.SongName}
        Viewer={element.Viewer}
        filePath={element.filePath}
        SongImage={element.SongImage}
        stt={stt}
        user_id={element.user_id}
        key={element.Id}
      />
    );
  });
  return (
    <div className="w-full space-y-3 ">
      <div className="text-[24px]">Danh sách cũ</div>
      <div>{ls}</div>
      <AdditionalPlayList number={ls.length}></AdditionalPlayList>
      <div>Tên Danh Sách Phát</div>
      <div>
        <input
          value={playlist.PlayListName}
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
            htmlFor={playlist.ImagePath == "" ? "gdas" : "avatar"}
            className=" px-4 py-2 rounded-full w-full"
          >
            <div className="w-full">
              {newSongImage == "" ? (
                <img className="size-[200px]" src={playlist.ImagePath} />
              ) : (
                <div>
                  <div
                    className="px-4 py-2 w-max bg-blue-600 rounded-full my-2"
                    onClick={() => {
                      SetNewSongImage("");
                    }}
                  >
                    xóa
                  </div>
                  <img className="size-[200px]" src={newSongImage} />
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
                  SetNewSongImage(file);
                }
              }}
            />
          </label>
        </div>
      </div>
      <div
        onClick={() => {
          var form = new FormData();

          for (const key in SelectList) {
            const element = SelectList[key] as any;
            form.append("ls", element.Id);
          }
          if (file) {
            form.set("avatar", file);
          }

          const myObj: { [key: string]: any } = playlist;
          for (const key in myObj) {
            const element = myObj[key];
            form.set(key, element);
          }
          form.set("Genre_ID", slectGenre[floor]);
          post("/playlist/UpdatePlayList", form, (v: any) => {
            if (!v.err) {
              dispatch(Page("songlist"));
              dispatch(ReSetSelectSong());
            }
          });
        }}
        className="text-black px-3 py-1 border-2 rounded-lg w-max cursor-pointer"
      >
        Cập nhật
      </div>
    </div>
  );
}
interface AdditionalPlayList {
  number: number;
}
function AdditionalPlayList(d: AdditionalPlayList) {
  const SelectListl = useSelector((state: RootState) => state.navi.SelectList);
  var ls: React.JSX.Element[] = [];
  var stt = d.number;
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
        SongImage={element.SongImage}
        stt={stt}
        user_id={element.user_id}
        key={element.Id}
      />
    );
  }
  return (
    <div>
      {ls.length > 0 ? (
        <div className="text-[24px]">Danh sách thêm mới</div>
      ) : (
        <></>
      )}
      <div>{ls}</div>
    </div>
  );
}

function OldSong(d: OldSong) {
  const [remove, SetRemove] = useState(false);
  // Song_id: string
  // PlayList_id: string
  return (
    <div
      onClick={() => {}}
      className="grid hover:bg-slate-300 grid-cols-6 cursor-pointer space-x-2 font-bold p-4 rounded-lg items-center"
    >
      <div className="col-span-3 flex items-center space-x-2">
        <div className="">{d.stt}</div>
        <img className="size-9" src={d.SongImage} alt="" srcSet="" />
      </div>
      <div className="col-span-2">{d.SongName}</div>
      <div className="col-span-1 flex items-center space-x-4">
        {!remove ? (
          <svg
            onClick={() => {
              post(
                "/contain/delete",
                { Song_id: d.Id, PlayList_id: d.idPlaylist },
                (v: any) => {
                  if (!v.err) {
                    SetRemove(true);
                  }
                }
              );
            }}
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="fill-[#1DD25E] size-6 mx-2 w-full"
          >
            <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm11.748-1.97a.75.75 0 0 0-1.06-1.06l-4.47 4.47-1.405-1.406a.75.75 0 1 0-1.061 1.06l2.466 2.467 5.53-5.53z"></path>
          </svg>
        ) : (
          <svg
            onClick={() => {
              post(
                "/contain/add",
                { Song_id: d.Id, PlayList_id: d.idPlaylist },
                (v: any) => {
                  if (!v.err) {
                    SetRemove(false);
                  }
                }
              );
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="red"
            className="size-6 w-full "
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
