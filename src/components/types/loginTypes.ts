interface UserInfo {
  userId: number | null;
  name: string | null;
}

interface LoginState {
  value: boolean;
  userInfo: UserInfo; // 既に定義した UserInfo 型を使用
}

export default LoginState;
export type { UserInfo }; // UserInfo を別途エクスポート
