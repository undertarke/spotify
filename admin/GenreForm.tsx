import React, { useEffect, useState } from "react";
import { get, post } from "../page/config/req";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, SetLoad, SetFloor, addGenre } from "./Redux";

interface Genres {
  Floor: number;
  Genre: Genre[];
}
interface Genre {
  Id: string;
  Name: string;
  color: string;
  idParent: string;
  Floor: number;
}
export default function GenreForm() {
  const floor = useSelector((state: RootState) => state.navi.floor);
  const load = useSelector((state: RootState) => {
    return state.navi.load;
  });
  const slectGenre = useSelector((s: RootState) => s.navi.slectGenre);
  
  
  const [genres, SetGenres] = useState<Genre[]>([]);

  useEffect(() => {
    get("genre/GetAll", (v: any) => {
      SetGenres(v.ls);
    });
  }, [load]);
  var ls: React.JSX.Element[] = [];
  for (let i = 0; i < floor + 1; i++) {
    ls.push(<Genres Floor={i} key={i} Genre={genres}></Genres>);
  }

  return <div className="h-[600px]">{ls}</div>;
}

function Genres(d: Genres) {
  const dispatch: AppDispatch = useDispatch();
  const slectGenre = useSelector((s: RootState) => s.navi.slectGenre);
  const id = slectGenre[d.Floor];
  const [vu, SetVu] = useState("");
  var ls = d.Genre.filter((v) => {
    return v.Floor == d.Floor && v.idParent == id;
  }).map((v) => {
    return (
      <Genre
        Floor={d.Floor}
        Id={v.Id}
        Name={v.Name}
        color={v.color}
        idParent={v.idParent}
        key={v.Id}
      />
    );
  });
  return (
    <div
      style={{ left: 350 * d.Floor }}
      className="inline-block w-[300px] absolute h-full top-0 p-2"
    >
      <div className="h-[67%] overflow-y-scroll ">{ls}</div>
      <div className="mt-6">
        <div>
          <input type="hidden" name="floor" value={d.Floor} />
          <label
            htmlFor="first_name"
            className="block mb-2  text-gray-900 dark:text-white"
          >
            Tên thể loại {d.Floor}
            <input
              onChange={(e) => {
                SetVu(e.currentTarget.value);
              }}
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-[14px]  rounded-lg  w-full p-2.5 "
              placeholder={id + ""}
              value={vu}
              required
            />
          </label>

          <button
            onClick={() => {
              post(
                "genre/Add",
                {
                  Floor: d.Floor,
                  Name: vu,
                  idParent: id,
                },
                (v: any) => {
                  dispatch(SetLoad());
                  SetVu("");
                }
              );
            }}
            type="button"
            className=" mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300  rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Thêm mới
          </button>
        </div>
      </div>
    </div>
  );
}

function Genre(params: Genre) {
  const dispatch = useDispatch();
  const [edit, SetEdit] = useState(false);
  const [name, SetName] = useState("");
  const slectGenre = useSelector((s: RootState) => s.navi.slectGenre);
  const id = slectGenre[params.Floor + 1 + ""];

  return (
    <div className="w-full max-w-[16rem] relative bg-white p-1 border-gray-200 rounded-lg border ">
      <div className="flex items-center justify-center">
        <label htmlFor="genre" className="sr-only">
          Label
        </label>
        <div className="relative">
          <input
            id="genre"
            type="text"
            className="col-span-6  text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[160px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={!edit ? params.Name : name}
            onChange={(e) => {
              SetName(e.currentTarget.value);
            }}
          />
          <div
            className={`absolute top-0 right-0 cursor-pointer ${
              edit ? "" : "hidden"
            }`}
            onClick={() => {
              SetEdit(false);
              SetName(params.Name);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="black"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <button className=" text-gray-500  rounded-lg p-2 inline-flex items-center justify-center">
          <svg
            onClick={() => {
              SetEdit(true);
              SetName(params.Name);
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="black"
            className={`size-[30px] pl-2 cursor-pointer ${
              edit ? "hidden" : ""
            }`}
          >
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
          </svg>
          <svg
            onClick={() => {
              post(
                "/genre/UpdateName",
                {
                  Name: name,
                  id: params.Id,
                },
                (v: any) => {
                  if (!v.err) {
                    dispatch(SetLoad());
                    SetEdit(false);
                    SetName(params.Name);
                  }
                }
              );
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="black"
            className={`size-[30px] cursor-pointer pl-2 ${
              !edit ? "hidden" : ""
            }`}
            viewBox="0 0 16 16"
          >
            <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v3.5A1.5 1.5 0 0 1 11.5 6h-7A1.5 1.5 0 0 1 3 4.5V1H1.5a.5.5 0 0 0-.5.5m9.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z" />
          </svg>
          <svg
            onClick={() => {
              dispatch(SetFloor(params.Floor));
              dispatch(
                addGenre({
                  Floor: params.Floor ,
                  Id: params.Id,
                  name: params.Name,
                })
              );
            }}
            xmlns="http://www.w3.org/2000/svg"
            className={`size-[40px] cursor-pointer ${
              id == params.Id ? "fill-red-600" : ""
            }`}
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
            />
          </svg>
        </button>
        <div className="absolute top-0 left-0 ">
          <svg
            onClick={() => {
              post(
                "/genre/Delete",
                {
                  id: params.Id,
                },
                (v: any) => {
                  if (v.err) {
                    alert("thất bại");
                  } else {
                    alert("thành công");
                    dispatch(SetLoad());
                  }
                }
              );
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
