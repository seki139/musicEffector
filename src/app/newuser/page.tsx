"use client";
//新規会員登録ページ

import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./page.module.css";
import axios from "axios";
import LoginIcons from "../../components/icons/loginIcon";
import LogoutIcons from "../../components/icons/logoutIcon";
import RootState from "../../components/types/reduxTypes";

const NewUser: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuFunction = () => {
    setOpenMenu(!openMenu);
  };
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    //api
    await axios
      .post("/api/auth/register", {
        name: name,
        mail: mail,
        pass: pass,
      })
      .then((response) => alert(response.data.message))
      .catch((error) => {
        //*2 非同期処理が失敗したらcatchの中身が処理される(エラーの内容をalertに出力する)
        alert(`${error.response.status}番のエラーが発生しました`);
      });
  };
  const loginConfirm = useSelector((state: RootState) => state.loginState);

  return (
    <main>
      <h1 className={styles.midashi}>ユーザー登録</h1>
      <div className={styles.position}>
        <form className="loginID" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="UserName"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div>
            <input
              type="text"
              placeholder="MailAddress"
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
          <button type="submit">登録</button>
        </form>
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

export default NewUser;
