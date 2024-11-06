"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./page.module.css";
import Login from "../../components/attendances/login";
import Logout from "../../components/attendances/logout";
import axios from "axios";
import LoginIcons from "../../components/icons/loginIcon";
import LogoutIcons from "../../components/icons/logoutIcon";
import RootState from "../../components/types/reduxTypes";

const Attendance: React.FC = () => {
  const loginConfirm = useSelector(
    (state: RootState) => state.loginState.value
  );
  return <>{loginConfirm ? <Logout /> : <Login />}</>;
};

export default Attendance;
/*
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
    try {
      await axios.post("http://localhost:8080", {
        name: name,
        pass: pass,
      });
    } catch (err) {
      alert("登録に失敗しました");
    }
  };
  const loginConfirm = useSelector(
    (state: RootState) => state.loginState.value
  );
  return (
    <main>
      {loginConfirm ? <LoginIcons /> : <LogoutIcons />}
      <h1 className={styles.midashi}>ログイン画面</h1>
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
              type="password"
              placeholder="Password"
              onChange={(e) => setPass(e.target.value)}
            ></input>
          </div>{" "}
          <div>
            <button type="submit">ログイン</button>
          </div>
        </form>
      </div>
      <div className={styles.position}>
        <a href="/newuser">新規登録</a>
      </div>
      <nav className={openMenu ? styles.navigation : styles.navbar}>
        <div className={styles.inner}>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/login">login</a>
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
*/
