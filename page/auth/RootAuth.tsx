import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

export interface initialState {
  page: "signin" | "signup" | "createAccount" | "fotgot" | "changePassword";
  Account: string;
  pathImage: string;
  Name: string;
}
interface Infor {
  Account: string;
  pathImage: string;
  Name: string;
}
var initialState: initialState = {
  page: "signin",
  Account: "",
  pathImage: "",
  Name: "",
};

export const counterSlice = createSlice({
  name: "rootauth",
  initialState,
  reducers: {
    Page: (
      state,
      action: PayloadAction<
        "signin" | "signup" | "createAccount" | "fotgot" | "changePassword"
      >
    ) => {
      state.page = action.payload;
    },
    Infor: (state, action: PayloadAction<Infor>) => {
      state.Account = action.payload.Account;
      state.pathImage = action.payload.pathImage;
      state.Name = action.payload.Name;
    },
  },
});

// Action creators are generated for each case reducer function
export const { Page, Infor } = counterSlice.actions;

const rootAuth = configureStore({
  reducer: {
    rootauth: counterSlice.reducer,
  },
});

export type AppDispatch = typeof rootAuth.dispatch;

export type RootAuth = ReturnType<typeof rootAuth.getState>;

export default rootAuth;
