"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./attendance.module.css";
import axios from "axios";
import RootState from "../../components/types/reduxTypes";
import LogoutIcons from "../../components/icons/logoutIcon";
import { logout } from "../../redux/counterSlice";

const Logout: React.FC = () => {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const menuFunction = () => {
    setOpenMenu(!openMenu);
  };

  const loginConfirm = useSelector(
    (state: RootState) => state.loginState.value
  );
  const handleClick = () => {
    dispatch(logout());
    alert("ログアウトしました");
  };

  return (
    <main>
      <h1 className={styles.midashi}>ログアウト画面</h1>
      <button className={styles.logout} onClick={handleClick}>
        ログアウト
      </button>
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

export default Logout;
