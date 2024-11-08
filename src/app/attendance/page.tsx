"use client";
//ログインもしくはログアウトページの表示

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
