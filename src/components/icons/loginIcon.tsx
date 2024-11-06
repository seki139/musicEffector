// src/components/icons/icons.tsx
import LoginIcon from "@mui/icons-material/Login";
import Link from "next/link";
import styles from "./icons.module.css"; // CSS モジュールが存在することを確認

const LoginIcons: React.FC = () => {
  return (
    <div className={styles.icons}>
      <Link href="/attendance">
        <LoginIcon />
      </Link>
    </div>
  );
};

export default LoginIcons;
