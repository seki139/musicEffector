"use client";
//ホームページ
import { use, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./page.module.css";
import Image from "next/image";
import GT from "../../public/IMG_6374.jpg";
import LoginIcons from "../components/icons/loginIcon";
import LogoutIcons from "../components/icons/logoutIcon";
import RootState from "../components/types/reduxTypes";

const Home: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuFunction = () => {
    setOpenMenu(!openMenu);
  };

  const loginConfirm = useSelector(
    (state: RootState) => state.loginState.value
  );

  return (
    <main>
      {loginConfirm ? <LogoutIcons /> : <LoginIcons />}
      <h1 className={styles.midashi}>music再現</h1>
      <div className={styles.explanation}>
        このサイトはgt1000(core)を用いて様々なアーティストの音を再現するための相談サイトです。
      </div>
      <Image
        className={styles.pic}
        src={GT}
        alt="GT-1000"
        width={500}
        height={300}
      />
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

export default Home;
