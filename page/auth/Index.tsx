import React, { useEffect, useState } from "react";
import SignIn from "./SignIn";
import { useDispatch, useSelector } from "react-redux";
import { Infor, Page, RootAuth } from "./RootAuth";
import Signup from "./Signup";
import { post } from "../config/req";
import CreateAccount from "./CreateAccount";
import Forgot from "./Forgot";
import ChangePassword from "./ChangePassword";

export default function Index() {
  const dispatch = useDispatch();

  useEffect(() => {
    post("/auth/getdata", {}, (v: any) => {
      if (!v.err) {
        dispatch(Page("createAccount"));
        dispatch(Infor(v));
        console.log(v);
      }
    });
  }, []);

  return (
    <>
      <SignIn />
      <CreateAccount />
      <Signup />
      <Forgot />
      <ChangePassword/>
    </>
  );
}
