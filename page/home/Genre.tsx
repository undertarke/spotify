import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NaviPage, RootHome } from "./RootRedux";
import { get } from "../config/req";
interface Genre {
  Id: string;
  Name: string;
}
export default function Genre() {
  var color = [
    "#E8115B",
    "#DC148C",
    "#006450",
    "#8400E7",
    "#1E3264",
    "#E8115B",
    "#27856A",
    "#608108",
    "#148A08",
    "#D84000",
    "#7D4B32",
    "#E91429",
  ];
  var i = 0;
  const recentList = useSelector(
    (state: RootHome) => state.rootHome.recentList
  );
  const [genre, SetGenre] = useState<Genre[]>([]);
  useEffect(() => {
    get("genre/GetLimitFloor", (v: any) => {
      SetGenre(v.ls);
    });
  }, []);
  return (
    <div>
      <div className="text-[24px] font-bold text-white">Duyệt tìm tất cả</div>
      <div
        className={`grid mt-2 ${
          recentList ? "grid-cols-6 gap-2" : "grid-cols-8 "
        }`}
      >
        {genre.map((v) => {
          i += 1;
          return (
            <GenreData
              id={v.Id}
              name={v.Name}
              key={v.Id}
              color={color[i % color.length]}
            ></GenreData>
          );
        })}
      </div>
    </div>
  );
}
interface GenreData {
  name: string;
  color: string;
  id: string;
}
function GenreData(d: GenreData) {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(NaviPage({ page: "idgenre", param: d.id }));
      }}
      className={`bg-[${d.color}] cursor-pointer mb-3 size-[160px] rounded-lg p-2`}
    >
      <div className="text-[24px] font-bold text-white ">{d.name}</div>
    </div>
  );
}

export function GenreButtom() {
  const dispatch = useDispatch();
  const page = useSelector((state: RootHome) => state.rootHome.command.page);
  return (
    <div
      onClick={() => {
        dispatch(NaviPage({ page: "genre", param: "" }));
      }}
      className="w-full h-1/2  flex justify-center items-center"
    >
      {page == "genre" ? (
        <svg
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          className="size-1/2 fill-white"
          viewBox="0 0 24 24"
        >
          <path d="M15.356 10.558c0 2.623-2.16 4.75-4.823 4.75-2.664 0-4.824-2.127-4.824-4.75s2.16-4.75 4.824-4.75c2.664 0 4.823 2.127 4.823 4.75z"></path>
          <path d="M1.126 10.558c0-5.14 4.226-9.28 9.407-9.28 5.18 0 9.407 4.14 9.407 9.28a9.157 9.157 0 0 1-2.077 5.816l4.344 4.344a1 1 0 0 1-1.414 1.414l-4.353-4.353a9.454 9.454 0 0 1-5.907 2.058c-5.18 0-9.407-4.14-9.407-9.28zm9.407-7.28c-4.105 0-7.407 3.274-7.407 7.28s3.302 7.279 7.407 7.279 7.407-3.273 7.407-7.28c0-4.005-3.302-7.278-7.407-7.278z"></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="white"
          className="size-1/2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      )}
    </div>
  );
}
