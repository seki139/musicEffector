"use client";
//ログインページ
import { FormEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./attendance.module.css";
import axios from "axios";
import RootState from "../../components/types/reduxTypes";
import { login } from "../../redux/counterSlice";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const menuFunction = () => {
    setOpenMenu(!openMenu);
  };
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const loginConfirm = useSelector((state: RootState) => state.loginState);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    //api
    try {
      // APIリクエスト
      const response = await axios.post("/api/auth/loginConfirm", {
        mail: mail,
        pass: pass,
      });

      const data = await response.data;

      // 成功時にアラートを出す
      alert(data.message);

      // ユーザー情報を取得してReduxにdispatch
      const { userId, name } = data.usrInf;
      dispatch(login({ userId, name })); // id と name を渡す
    } catch (error) {
      // errorがAxiosError型かどうかを確認
      if (axios.isAxiosError(error)) {
        // エラーメッセージを表示
        alert(`${error.response?.status}番のエラーが発生しました`);
      } else {
        // Axios以外のエラーの場合
        alert("不明なエラーが発生しました");
      }
    }
  };

  return (
    <main>
      <h1 className={styles.midashi}>ログイン画面</h1>
      <div className={styles.position}>
        <form className="loginID" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="mailAddress"
              onChange={(e) => setMail(e.target.value)}
            ></input>
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPass(e.target.value)}
            ></input>
          </div>
          <button type="submit">ログイン</button>
        </form>
      </div>
      <div className={styles.newuser}>
        <a href="/newuser">新規登録</a>
      </div>
      <nav className={openMenu ? styles.navigation : styles.navbar}>
        <div className={styles.inner}>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/attendance">login/logout</a>
            </li>
            <li>
              <a href="/yorushika">ヨルシカ</a>
            </li>
          </ul>
        </div>
      </nav>

      <div
        className={openMenu ? styles.openToggleBtn : styles.toggleBtn}
        onClick={() => menuFunction()}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div
        className={openMenu ? styles.openMask : styles.mask}
        onClick={() => menuFunction()}
      ></div>
    </main>
  );
};

export default Login;
