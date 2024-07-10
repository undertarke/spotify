import React, { useEffect, useState } from "react";
import { get } from "../page/config/req";
import { useDispatch, useSelector } from "react-redux";
import { RootState, SetFloor, addGenre } from "./Redux";

interface Genre {
  Id: string;
  Name: string;
  idParent: string;
  Floor: number;
  RightGenre: number;
  LeftGenre: number;
}
interface Genres {
  ls: Genre[];
  floor: number;
}
function Genre(params: Genre) {
  function ss() {
    return params.RightGenre - params.LeftGenre >= 2;
  }
  const dispatch = useDispatch();
  const slectGenre = useSelector((state: RootState) => state.navi.slectGenre);
  const floor = useSelector((state: RootState) => state.navi.floor);
  var id = slectGenre[params.Floor + 1];
  return (
    <div
      className={`p-2 flex w-full items-center border cursor-pointer ${
        id == params.Id && floor > params.Floor ? "text-red-600" : ""
      }`}
      onClick={() => {
        dispatch(
          addGenre({ Floor: params.Floor, Id: params.Id, name: params.Name })
        );
        dispatch(SetFloor(params.Floor));
      }}
    >
      <div className="flex-1 ">{params.Name}</div>
      {ss() ? (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4"
          >
            <path
              fillRule="evenodd"
              d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

function GenreLs(d: Genres) {
  const slectGenre = useSelector((state: RootState) => {
    return state.navi.slectGenre;
  });

  var l: React.JSX.Element[] = d.ls
    .filter((v) => {
      return v.Floor == d.floor && v.idParent + "" == slectGenre[d.floor];
    })
    .map((v) => {
      return (
        <Genre
          key={v.Id}
          LeftGenre={v.LeftGenre}
          RightGenre={v.RightGenre}
          Floor={d.floor}
          Id={v.Id}
          Name={v.Name}
          idParent={v.idParent}
        />
      );
    });
  return (
    <div
      className="absolute w-[200px] top-0 overflow-y-auto"
      style={{ left: 220 * d.floor }}
    >
      {l}
    </div>
  );
}

export default function IndexGenres() {
  const [genre, SetGenres] = useState<Genre[]>([]);
  const floor = useSelector((state: RootState) => state.navi.floor);

  useEffect(() => {
    get("genre/GetAll", (v: any) => {
      SetGenres(v.ls);
    });
  }, []);
  var ls: React.JSX.Element[] = [];

  for (let i = 0; i < floor + 1; i++) {
    ls.push(<GenreLs floor={i} key={i} ls={genre}></GenreLs>);
  }
  return <div className="relative h-[200px] ">{ls}</div>;
}
