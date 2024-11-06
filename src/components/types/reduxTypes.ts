import LoginInformation from "./loginTypes";
import CommentInformarion from "./commentTypes";
import InformInformation from "./informTypes";
interface RootState {
  loginState: LoginInformation;
  commentState: CommentInformarion;
  informState: InformInformation;
}

export default RootState;
