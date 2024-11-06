import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorageを使用する場合
import counterReducer from "./counterSlice";
import commentReducer from "./commentSlice";
import informReducer from "./inform";

const persistConfig = {
  key: "root", // ストアのキー
  storage, // 使用するストレージ（localStorage）
};
const persistedCounterReducer = persistReducer(persistConfig, counterReducer);

const commentPersistConfig = {
  key: "comment",
  storage,
};
const persistedCommentReducer = persistReducer(
  commentPersistConfig,
  commentReducer
);

const persistInform = {
  key: "inform", // ストアのキー
  storage, // 使用するストレージ（localStorage）
};
const persistedInformReducer = persistReducer(persistInform, informReducer);

export const store = configureStore({
  reducer: {
    loginState: persistedCounterReducer, // 永続化されたリデューサーを使用
    commentState: persistedCommentReducer,
    informState: persistedInformReducer,
  },
});

export const persistor = persistStore(store); // persistorをエクスポート

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
