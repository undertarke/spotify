import React, { useEffect, useState } from "react";
import { get, post } from "../../config/req";
import IndexGenres from "../Genres";
import { useDispatch, useSelector } from "react-redux";
import { Navi, RootNaviRedux } from "../NaviRedux";
interface Genre {
  Id: string;
  Name: string;
  color: string;
  idParent: string;
  Floor: number;
}
interface Song {
  Id: string;
  Singer: string;
  SongName: string;
  SongImage: string;
  Duration: number;
  description: string;
  PublicTime: string;
  filePath: string;
}
export default function SongForm() {
  const [conut, SetConut] = useState(0);
  const [file, SetFile] = useState<File>();
  const [total, SetTotal] = useState(0);
  const [finsih, SetFish] = useState(false);

  const [song, SetSong] = useState<Song>({
    Id: "",
    SongImage: "",
    SongName: "",
    description: "",
    Duration: 0,
    PublicTime: "",
    filePath: "",
    Singer: "",
  });
  const name = useSelector((state: RootNaviRedux) => state.navi.name);
  const slectGenre = useSelector(
    (state: RootNaviRedux) => state.navi.slectGenre
  );
  const floor = useSelector((state: RootNaviRedux) => state.navi.floor);

  const dispatch = useDispatch();
  function upload(params: Uint8Array, i: number, pa?: string) {
    var n = 10000;

    if (i < params.length) {
      var element = "";
      for (let j = i; j < i + n && j < params.length; j++) {
        element += params[j] + " ";
      }
      var data = {
        d: element,
        name: pa,
      };
      fetch("/song/Upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((v) => {
          return v.json();
        })
        .then((v) => {
          SetConut(i + n);

          SetSong({
            ...song,
            Id: v.name,
            filePath: v.name,
          });
          upload(params, i + n, v.name);
        });
    } else {
      SetFish(true);
    }
  }
  return (
    <div className="w-[70%] mx-auto py-[72px] px-[42px] text-[16px] font-bold space-y-4">
      <div className="text-center text-[40px] font-bold">
        Thông tin bài hát
      </div>
      <div className="w-full">
        <div className="flex space-x-4">
          <div>thể loại</div>
          <div className="font-extralight">{name}</div>
        </div>
        <div className="rounded-lg w-full border h-[200px]">
          <IndexGenres />
        </div>
      </div>
      <div>Tên nhạc</div>
      <div>
        <input
          onChange={(e) => {
            SetSong({
              ...song,
              SongName: e.currentTarget.value,
            });
          }}
          type="text"
          className="border-2 border-[#404040] font-medium rounded-lg p-2 w-full"
        />
      </div>
      <div>Ca sĩ</div>
      <div>
        <input
          onChange={(e) => {
            SetSong({
              ...song,
              Singer: e.currentTarget.value,
            });
          }}
          type="text"
          className="border-2 border-[#404040] rounded-lg p-2 w-full"
        />
      </div>
      <div>Ngày phát hành</div>
      <div>
        <input
          onChange={(e) => {
            SetSong({
              ...song,
              PublicTime: e.currentTarget.value,
            });
          }}
          type="datetime-local"
          className="border-2 border-[#404040] rounded-lg p-2 w-full"
        />
      </div>
      <div>Mô tả</div>
      <div className="w-full">
        <textarea
          name="discription"
          onChange={(e) => {
            SetSong({
              ...song,
              description: e.currentTarget.value,
            });
          }}
          className="font-normal text-[20px] p-2 w-full border border-black rounded-lg"
          id=""
          cols={10}
          rows={4}
        ></textarea>
      </div>
      <div className="flex w-full">
        <div className="anh w-1/2">
          <div className="mb-2">Ảnh đại diên</div>
          <label
            htmlFor={song.SongImage == "" ? "avatar" : "gdas"}
            className=" px-4 py-2 rounded-full w-full"
          >
            <div className="w-full">
              {song.SongImage == "" ? (
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
                    className="px-4 py-2 w-min bg-blue-600 rounded-full my-2"
                    onClick={() => {
                      SetSong({
                        ...song,
                        SongImage: "",
                      });
                    }}
                  >
                    xóa
                  </div>
                  <img src={song.SongImage} />
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
                  SetSong({
                    ...song,
                    SongImage: file,
                  });
                }
              }}
            />
          </label>
        </div>
        <div className="nhac w-1/2">
          <div>Nhạc</div>
          <label htmlFor="music">
            <div className="w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-1/3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
                />
              </svg>
            </div>
            {!finsih ? (
              <>
                <input
                  id="music"
                  onChange={(e) => {
                    var file = e.currentTarget.files?.[0];

                    file?.arrayBuffer().then((v) => {
                      var ut = new Uint8Array(v);
                      SetTotal(ut.length);
                      upload(ut, 0);
                    });
                  }}
                  type="file"
                  className="border-2 invisible border-[#404040] rounded-lg  p-2 w-full"
                />
                {total != 0 ? (
                  <div>
                    <div>{(conut / total) * 100}</div>
                    <input
                      type="range"
                      className="w-full"
                      max={total}
                      value={conut}
                    />
                  </div>
                ) : (
                  ""
                )}
              </>
            ) : (
              <>
                <audio
                  controls
                  onCanPlay={(e) => {
                    SetSong({
                      ...song,
                      Duration: e.currentTarget.duration,
                    });
                  }}
                >
                  <source src={`s?id=${song.Id}`} />
                </audio>
              </>
            )}
          </label>
        </div>
      </div>
      <div className="flex justify-end">
        <div
          onClick={() => {
            if (floor == 0) {
              alert("chưa chọn thể loại");
              return;
            }
            if (song.Singer.length <= 0 || song.SongName.length <= 0) {
              alert("chưa nhập tên hoặc chưa nhập tên ca sĩ");
              if (!confirm("bạn muốn tiếp tục chứ")) {
                return
              }
            }
            var form = new FormData();

            if (file != undefined) {
              form.append("avatar", file);
            } else {
              alert("chưa có file nhạc");
              return;
            }

            form.append("Genre_id", slectGenre[floor]);
            const myObj: { [key: string]: any } = song;

            for (const key in myObj) {
              form.append(key, myObj[key]);
            }
            post("song/Update", form, (v: any) => {
              if (!v.err) {
                dispatch(Navi("songlist"));
              } else {
                alert("loou");
              }
            });
          }}
          className="bg-blue-700 cursor-pointer text-white font-bold rounded-full px-3 py-1"
        >
          Đăng
        </div>
      </div>
    </div>
  );
}
