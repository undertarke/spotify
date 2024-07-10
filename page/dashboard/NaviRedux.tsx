import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

interface NaviRedux {
  page: string;
  slectGenre: any;
  floor: number;
  name: string;
  idSong: string;
  image: string;
}
interface FloorAndID {
  Floor: number;
  Id: string;
  name: string;
}
const initialState: NaviRedux = {
  page: "home",
  floor: 0,
  slectGenre: { "0": "0" },
  name: "",
  idSong: "",
  image: "",
};
const NaviRedux = createSlice({
  name: "navi",
  initialState,
  reducers: {
    Navi: (
      state,
      action: PayloadAction<"home" | "songform" | "songlist" | "songedit">
    ) => {
      state.page = action.payload;
    },
    SetFloor: (state, action: PayloadAction<number>) => {
      state.floor = action.payload + 1;
    },
    addGenre: (state, action: PayloadAction<FloorAndID>) => {
      state.slectGenre[action.payload.Floor + 1 + ""] = action.payload.Id;
      state.name = action.payload.name;
    },
    SongEidt: (state, action: PayloadAction<string>) => {
      state.idSong = action.payload;
    },
    Avatar: (state, action: PayloadAction<string>) => {
      state.image = action.payload;
    },
  },
});

const dashboard = configureStore({
  reducer: {
    navi: NaviRedux.reducer,
  },
});

export const { Navi, addGenre, SetFloor, SongEidt, Avatar } = NaviRedux.actions;

export type RootNaviRedux = ReturnType<typeof dashboard.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type NaviReduxDispatch = typeof dashboard.dispatch;
export default dashboard;
