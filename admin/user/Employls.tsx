import React, { useEffect, useState } from "react";
import { get, post } from "../../page/config/req";
import { useDispatch, useSelector } from "react-redux";
import { Page, RootState, SetLoad } from "../Redux";

interface User {
  pathImage: string;
  Account: string;
  Name: string;
  id: string;
  index: number;
  setE(d: any): void;
}
interface EData {
  Password: string;
  Account: string;
  Name: string;
  role: string;
}
function Employ(d: User) {
  const dp = useDispatch();
  return (
    <tr className="bg-white hover:bg-[#ECECEC] cursor-pointer">
      <th>{d.index}</th>
      <th className="flex justify-center">
        <img className="size-[100px]" src={d.pathImage} alt="" srcSet="" />
      </th>
      <th>{d.Account}</th>
      <th>{d.Name}</th>
      <th className="fex justify-around items-center space-x-2">
        <button
          onClick={() => {
            d.setE(d.id);
          }}
          className="text-[14px] p-2 rounded-md hover:bg-blue-600 hover:text-white"
        >
          edit
        </button>
        <button
          onClick={() => {
            if (!confirm("bạn muốn thức hiện ko")) {
              return;
            }
            post("/admin/UserRouteAdmin/deE", { id: d.id }, (v: any) => {
              alert(v.err);
              dp(SetLoad());
            });
          }}
          className="text-[14px] p-2 rounded-md hover:bg-blue-600 hover:text-white"
        >
          xóa
        </button>
      </th>
    </tr>
  );
}
export default function Employls() {
  const [vertify, SetVertify] = useState("");
  const [userList, SetUserList] = useState<User[]>([]);
  const [add, SetAdd] = useState(false);
  const load = useSelector((state: RootState) => state.navi.load);
  const [id, SetData] = useState("");

  function edit(params: string) {
    SetData(params);
    SetAdd(true);
  }
  useEffect(() => {
    post("/admin/UserRouteAdmin/getE", {}, (v: any) => {
      SetUserList(v.ls);
    });
  }, [load]);
  var children = userList.map((v, i) => {
    return (
      <Employ
        setE={edit}
        id={v.id}
        Account={v.Account}
        Name={v.Name}
        index={i}
        pathImage={v.pathImage}
        key={v.id}
      />
    );
  });
  return (
    <div className="w-full h-full">
      {add ? (
        <>
          <button
            onClick={() => {
              SetAdd(false);
            }}
            className="w-max p-2 rounded-2xl text-white bg-blue-500 "
          >
            Thoát
          </button>
          {id == "" ? <AddE /> : <EditE id={id}/>}
        </>
      ) : (
        <>
          <button
            onClick={() => {
              SetAdd(true);
            }}
            className="w-max p-2 rounded-2xl text-white bg-blue-500 "
          >
            Thêm tài khoản mới
          </button>
          <div className="w-full flex justify-center my-2">
            <Buttom Set={SetVertify} curva={vertify} title="Tất cả" va="" />
          </div>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th>Id</th>
                <th>Ảnh</th>
                <th>Tài khoản</th>
                <th>Tên</th>
                <th>Tháo tác</th>
              </tr>
            </thead>
            <tbody className="">{children}</tbody>
          </table>
        </>
      )}
    </div>
  );
}

interface Buttom {
  title: string;
  va: string;
  Set(v: any): void;
  curva: string;
}
function Buttom(p: Buttom) {
  return (
    <div
      className={`flex-1 p-1  rounded-2xl text-center text-[24px] cursor-pointer ${
        p.curva == p.va ? "bg-[#3D68FF] text-white" : ""
      }`}
      onClick={() => {
        p.Set(p.va);
      }}
    >
      {p.title}
    </div>
  );
}

export function AddE() {
  const dp = useDispatch();

  const [data, SetData] = useState<EData>({
    Account: "",
    Name: "",
    Password: "",
    role: "employee",
  });
  return (
    <div className=" w-full h-full flex justify-center">
      <div className="p-[20px] w-[500px] shadow-md rounded-md space-y-4">
        <div className="text-[36px] flex items-center justify-between font-bold py-2 border-b-2 border-b-stone-600">
          <div>Thêm tài khoản mới</div>
          <button className="text-[14px] p-2 rounded-md hover:bg-blue-600 hover:text-white">
            Đóng
          </button>
        </div>
        <div className="py-2 space-y-3 text-[20px]">
          <div className="w-full">
            <input
              onChange={(v) => {
                var d = v.currentTarget.value;
                SetData({ ...data, Account: d });
              }}
              placeholder="Tên đăng nhập"
              value={data.Account}
              type="text"
              className="rounded-md border-2 w-full  border-black px-3 py-2"
            />
          </div>
          <div className="w-full">
            <input
              onChange={(v) => {
                var d = v.currentTarget.value;
                SetData({ ...data, Password: d });
              }}
              value={data.Password}
              placeholder="Mật khẩu"
              type="text"
              className="rounded-md border-2 w-full  border-black px-3 py-2"
            />
          </div>
          <div className="w-full">
            <input
              value={data.Name}
              onChange={(v) => {
                var d = v.currentTarget.value;
                SetData({ ...data, Name: d });
              }}
              placeholder="Tên nhân viên"
              type="text"
              className="rounded-md  border-2 w-full  border-black px-3 py-2"
            />
          </div>
          <div className="flex items-center">
            <div className="px-3 py-2"> vai trò </div>
            <select
              onChange={(v) => {
                var d = v.currentTarget.value;
                SetData({ ...data, role: d });
              }}
              name=""
              className="cursor-pointer"
              value={data.role}
              id=""
            >
              <option value="employee" selected>
                Nhân viên
              </option>
            </select>
          </div>
        </div>

        <button
          onClick={() => {
            post("/admin/UserRouteAdmin/addE", data, (v: any) => {
              alert(v.err);
              dp(Page("employls"));
              dp(SetLoad());
            });
          }}
          className="p-2 rounded-md hover:bg-blue-600 hover:text-white"
        >
          Thêm
        </button>
      </div>
    </div>
  );
}
interface EditE {
  id: string;
}
function EditE(d: EditE) {
  const dp = useDispatch();

  const [data, SetData] = useState<EData>({
    Account: "",
    Name: "",
    Password: "",
    role: "employee",
  });

  useEffect(() => {
    get(`/admin/UserRouteAdmin/edit/${d.id}`, (v: any) => {
      SetData(v.data);
    });
  }, [d.id]);
  return (
    <div className=" w-full h-full flex justify-center">
      <div className="p-[20px] w-[500px] shadow-md rounded-md space-y-4">
        <div className="text-[36px] flex items-center justify-between font-bold py-2 border-b-2 border-b-stone-600">
          <div>Thêm tài khoản mới</div>
          <button className="text-[14px] p-2 rounded-md hover:bg-blue-600 hover:text-white">
            Đóng
          </button>
        </div>
        <div className="py-2 space-y-3 text-[20px]">
          <div className="w-full">
            <input
              onChange={(v) => {
                var d = v.currentTarget.value;
                SetData({ ...data, Account: d });
              }}
              placeholder="Tên đăng nhập"
              disabled
              value={data.Account}
              type="text"
              className="rounded-md border-2 w-full  border-black px-3 py-2"
            />
          </div>
          <div className="w-full">
            <input
              onChange={(v) => {
                var d = v.currentTarget.value;
                SetData({ ...data, Password: d });
              }}
              value={data.Password}
              placeholder="Mật khẩu"
              type="text"
              className="rounded-md border-2 w-full  border-black px-3 py-2"
            />
          </div>
          <div className="w-full">
            <input
              value={data.Name}
              onChange={(v) => {
                var d = v.currentTarget.value;
                SetData({ ...data, Name: d });
              }}
              placeholder="Tên nhân viên"
              type="text"
              className="rounded-md  border-2 w-full  border-black px-3 py-2"
            />
          </div>
          <div className="flex items-center">
            <div className="px-3 py-2"> vai trò </div>
            <select
              onChange={(v) => {
                var d = v.currentTarget.value;
                SetData({ ...data, role: d });
              }}
              name=""
              className="cursor-pointer"
              value={data.role}
              id=""
            >
              <option value="employee" selected>
                Nhân viên
              </option>
            </select>
          </div>
        </div>

        <button
          onClick={() => {
            post("/admin/UserRouteAdmin/edit", data, (v: any) => {
              alert(v.err);
              dp(Page("employls"));
              dp(SetLoad());
            });
          }}
          className="p-2 rounded-md hover:bg-blue-600 hover:text-white"
        >
          Cập nhật
        </button>
      </div>
    </div>
  );
}
