import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Link from "next/link";
import styles from "./icons.module.css"; // CSS モジュールが存在することを確認

const LogoutIcons: React.FC = () => {
  return (
    <div className={styles.icons}>
      <Link href="/attendance">
        <AssignmentIndIcon />
      </Link>
    </div>
  );
};

export default LogoutIcons;
