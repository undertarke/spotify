import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
  slectGenre: any;
  floor: number;
  load: boolean;
  page: string;
  SelectList: any;
  idPlaylistEdit: string;
}
interface FloorAndID {
  Floor: number;
  Id: string;
  name: string;
}
interface Song {
  SongName: string;
  Id: string;
  SongImage: string;
}
var initialState: CounterState = {
  floor: 1,
  slectGenre: { 0: 0 },
  value: 0,
  load: false,
  page: "",
  SelectList: {},
  idPlaylistEdit: "",
};

export const counterSlice = createSlice({
  name: "navi",
  initialState,
  reducers: {
    addGenre: (state, action: PayloadAction<FloorAndID>) => {
      state.slectGenre[action.payload.Floor + 1] = action.payload.Id;
    },
    SetFloor: (state, action: PayloadAction<number>) => {
      state.floor = action.payload + 1;
    },
    SetLoad: (state) => {
      state.load = !state.load;
    },
    Page: (
      state,
      action: PayloadAction<
        | "genre"
        | "songlist"
        | "playlist"
        | "playlists"
        | "playlistedit"
        | "userlist"
        | "employls"
      >
    ) => {
      state.page = action.payload;
    },
    SelectSong: (state, action: PayloadAction<Song>) => {
      if (!state.SelectList[action.payload.Id]) {
        state.SelectList[action.payload.Id] = action.payload;
      } else {
        delete state.SelectList[action.payload.Id];
      }
    },
    ReSetSelectSong: (state) => {
      state.SelectList = {};
    },
    RemoveSelectSong: (state, action) => {
      if (state.SelectList[action.payload]) {
        delete state.SelectList[action.payload];
      }
    },
    EditPlayList: (state, action) => {
      state.idPlaylistEdit = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addGenre,
  SetFloor,
  SetLoad,
  SelectSong,
  Page,
  ReSetSelectSong,
  EditPlayList,
  RemoveSelectSong,
} = counterSlice.actions;

const store = configureStore({
  reducer: {
    navi: counterSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
