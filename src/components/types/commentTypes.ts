import { UserInfo } from "./loginTypes";

interface CommentState {
  commentId: number | null;
  comment: string | null;
}
interface CommentInfo {
  userInfo: UserInfo;
  commentInfo: CommentState;
}
interface CommentCatchInfo {
  commentId: number | null;
  userId: number | null;
  name: string | null;
  comment: string | null;
}
export default CommentState;
export type { CommentInfo, CommentCatchInfo };
