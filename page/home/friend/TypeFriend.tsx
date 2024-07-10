import { useEffect, useState } from "react";
import { post } from "../../config/req";
import React from "react";

interface TypeFriend {
  type: string | undefined;
  idFriend: string | undefined;
}
export default function TypeFriend(p: TypeFriend) {
  const [t, SetT] = useState("");
  useEffect(() => {
    if (p.type == undefined) {
      return;
    }
    SetT(p.type + "");
  }, []);

  var children: React.JSX.Element;
  switch (t) {
    case "-1":
      children = (
        <>
          <div
            onClick={() => {
              post("friend/Request", { idFriend: p.idFriend }, (v: any) => {
                if (!v.err) {
                  SetT(0 + "");
                }
              });
            }}
            className="hover:bg-[#1FDD63] bg-[#2A2A2A] p-2 rounded-full w-max"
          >
            Thêm bạn
          </div>
        </>
      );
      break;
    case "0":
      children = (
        <>
          <div
            onClick={() => {
              post("friend/Cancenl", { idFriend: p.idFriend }, (v: any) => {
                if (!v.err) {
                  SetT("-1");
                }
              });
            }}
            className="hover:bg-[#1FDD63] bg-[#2A2A2A] p-2 rounded-full w-max"
          >
            Hủy yêu cầu kết bạn
          </div>
        </>
      );
      break;
    case "1":
      children = (
        <>
          <div
            onClick={() => {
              post("friend/Accept", { idFriend: p.idFriend }, (v: any) => {});
            }}
            className="hover:bg-[#1FDD63] bg-[#2A2A2A] p-2 rounded-full w-max"
          >
            Chấp nhận kết bạn
          </div>
        </>
      );
      break;
    case "2":
      children = (
        <>
          <div
            onClick={() => {
              post("friend/Cancenl", { idFriend: p.idFriend }, (v: any) => {});
            }}
            className="hover:bg-[#1FDD63] bg-[#2A2A2A] p-2 rounded-full w-max"
          >
            Hủy bạn bè
          </div>
        </>
      );
      break;
    default:
      children = <></>;
      break;
  }
  return <>{children}</>;
}
