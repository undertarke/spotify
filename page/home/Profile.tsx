import React, { useEffect, useState } from "react";
import { get, post } from "../config/req";
import { useDispatch } from "react-redux";
import { Update } from "./RootRedux";

interface Profile {
  pathImage: string;
  Name: string;
  Vertify: number;
  Nationality: string;
  ChanalName: string;
}

export default function Profile() {
  const [pathimage, SetPathImage] = useState("");
  const [file, SetFILE] = useState<File>();
  const [editIamge, SetEditImage] = useState(false);
  const dispatch = useDispatch();
  const [profile, SetProFile] = useState<Profile>({
    Name: "",
    Nationality: "",
    pathImage: "",
    Vertify: 0,
    ChanalName: "",
  });
  useEffect(() => {
    get("/user", (v: any) => {
      if (!v.err) {
        SetProFile(v.u);
      }
    });
  }, []);
  return (
    <div className="relative">
      <div className="bg-gradient-to-r from-pink-400 to-blue-500  rounded-t-lg absolute top-0 left-0 w-full h-[320px] flex  flex-col justify-end "></div>
      <div className="opacity-25 bg-black absolute top-0 left-0 w-full h-[320px]"></div>
      <div className="flex flex-col justify-end absolute top-0 left-0 h-[320px] z-10 p-4">
        <h1>
          <span className="text-white font-bol text-[96px] font-black">
            Trang các nhân
          </span>
        </h1>
      </div>

      <div className="h-[320px]"></div>
      <div className="px-4 text-white">
        <div className="flex items-center py-4 space-x-4">
          <div className="cursor-pointer">
            <svg
              className="fill-[#C7C7C7] hover:fill-white size-[45px] "
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>
            </svg>
          </div>
        </div>
        <div className="w-[50%] mx-auto space-y-5 justify-center">
          <div className="flex justify-center ">
            <div className="size-[200px] relative">
              {editIamge ? (
                <label
                  onMouseLeave={() => {
                    SetEditImage(false);
                  }}
                  htmlFor="image"
                  className="bg-[#121212]  absolute w-full h-full top-0 left-0 opacity-50 "
                >
                  <input
                    type="file"
                    onChange={(e) => {
                      var files = e.currentTarget.files;
                      if (files != null && files.length > 0) {
                        var file = URL.createObjectURL(files[0]);
                        SetPathImage(file);
                        SetFILE(files[0]);
                      }
                    }}
                    className="invisible"
                    id="image"
                  />
                </label>
              ) : (
                <></>
              )}
              <img
                onMouseEnter={() => {
                  SetEditImage(true);
                }}
                className="size-[200px] cursor-pointer rounded-full"
                src={pathimage == "" ? profile.pathImage : pathimage}
                alt=""
                srcSet=""
              />
            </div>
          </div>
          <div className="text-[14px]">Tên</div>
          <div>
            <input
              onChange={(v) => {
                SetProFile({
                  ...profile,
                  Name: v.currentTarget.value,
                });
              }}
              className="text-[14px] px-4 py-3 bg border-white border-2 w-full text-black"
              type="text"
              value={profile.Name}
            />
          </div>
          <div className="text-[14px]">Quốc tịch</div>
          <div>
            <input
              onChange={(v) => {
                SetProFile({
                  ...profile,
                  Nationality: v.currentTarget.value,
                });
              }}
              className="text-[14px] px-4 py-3 bg border-white border-2 w-full text-black"
              type="text"
              value={profile.Nationality}
            />
          </div>
          <div className="text-[14px]">Tên Nghệ Danh</div>
          <div>
            {profile.Vertify == 0 ? (
              <input
                onChange={(v) => {
                  SetProFile({
                    ...profile,
                    ChanalName: v.currentTarget.value,
                  });
                }}
                className="text-[14px] px-4 py-3 bg border-white border-2 w-full text-black"
                type="text"
                value={profile.ChanalName}
              />
            ) : (
              <input
                disabled
                className="text-[14px] px-4 py-3 bg border-white border-2 w-full text-black"
                type="text"
                value={profile.ChanalName}
              />
            )}
          </div>
          {profile.Vertify == 0 ? (
            <div className="flex justify-end space-x-5">
              <div>Xác minh tài khoản nghệ sĩ</div>
              <input type="checkbox" />
            </div>
          ) : (
            <></>
          )}
          <div
            onClick={() => {
              var form = new FormData();

              if (file) {
                form.set("avatar", file);
              }
              const myObj: { [key: string]: any } = profile;

              for (const key in myObj) {
                form.set(key, myObj[key]);
              }
              post("user/update", form, (v: any) => {
                if (v.err) {
                  alert("bất bại");
                } else {
                  alert("thành công");
                  dispatch(Update());
                }
              });
            }}
            className="px-5 py-3 bg-[#1ED760] w-max rounded-lg"
          >
            Lưu
          </div>
        </div>
      </div>
    </div>
  );
}
