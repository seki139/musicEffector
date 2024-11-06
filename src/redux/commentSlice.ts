import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CommentInformation from "../components/types/commentTypes";

const initialState: CommentInformation = {
  commentId: null,
  comment: null,
};

const commentSlice = createSlice({
  name: "commentState",
  initialState,
  reducers: {
    add: (
      state,
      action: PayloadAction<{
        commentId: number | null;
        comment: string | null;
      }>
    ) => {
      state.commentId = action.payload.commentId;
      state.comment = action.payload.comment;
    },
    sub: (state) => {
      state.commentId = null;
      state.comment = null;
    },
  },
});
export const { add, sub } = commentSlice.actions;
export default commentSlice.reducer;
