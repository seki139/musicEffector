// src/redux/counterSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const informSlice = createSlice({
  name: "loginState",
  initialState: {
    value: false,
  },
  reducers: {
    // login時にidとnameを状態として保持
    ok: (state) => {
      state.value = true;
    },
    // logout時に状態を初期状態に戻す
    ng: (state) => {
      state.value = false;
    },
  },
});

export const { ok, ng } = informSlice.actions;
export default informSlice.reducer;
