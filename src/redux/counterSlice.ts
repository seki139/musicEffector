// src/redux/counterSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import LoginState from "@/components/types/loginTypes";

const initialState: LoginState = {
  value: false, // ログイン状態
  userInfo: {
    userId: null, // 初期値はnull
    name: null, // 初期値はnull
  },
};
const counterSlice = createSlice({
  name: "loginState",
  initialState,
  reducers: {
    // login時にidとnameを状態として保持
    login: (state, action: PayloadAction<{ userId: number; name: string }>) => {
      state.value = true;
      state.userInfo.userId = action.payload.userId;
      state.userInfo.name = action.payload.name;
    },
    // logout時に状態を初期状態に戻す
    logout: (state) => {
      state.value = false;
      state.userInfo.userId = null;
      state.userInfo.name = null;
    },
  },
});

export const { login, logout } = counterSlice.actions;
export default counterSlice.reducer;
