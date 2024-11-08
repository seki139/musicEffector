"use client";
//エフェクター紹介ページ

import { FormEvent, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./page.module.css";
import axios from "axios";
import { CommentCatchInfo } from "../../components/types/commentTypes";
import LoginIcons from "../../components/icons/loginIcon";
import LogoutIcons from "../../components/icons/logoutIcon";
import RootState from "../../components/types/reduxTypes";

import { sub } from "../../redux/commentSlice";

const Yorushika: React.FC = () => {
  const [commentInfo, setCommentInfo] = useState<CommentCatchInfo[]>([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [editComment, setEditComment] = useState<string | null>("");
  const [editName, setEditName] = useState<string | null>("");
  const [editCommentId, setEditCommentId] = useState<number | null>(-1);
  const userData = useSelector((state: RootState) => state.loginState.userInfo);

  const confirm = useSelector((state: RootState) => state.informState.value);
  const loginConfirm = useSelector(
    (state: RootState) => state.loginState.value
  );
  const fetchInformation = async () => {
    try {
      const commentRes = await axios.get("/api/auth/commentData");
      const commentData = await commentRes.data;
      //console.log(commentData);
      setCommentInfo(commentData);
    } catch (error) {
      console.error("エラー:", error); // エラーを詳細にログに出力
      if (axios.isAxiosError(error)) {
        alert(`${error.response?.status}番のエラーが発生しました`);
      } else {
        alert("不明なエラーが発生しました");
      }
    }
  };
  useEffect(() => {
    fetchInformation();
  }, []);

  // 空の依存配列で初回のみデータを取得
  const editFunction = (info: CommentCatchInfo) => {
    setEditName(info.name);
    setEditCommentId(info.commentId);
    setEditComment(info.comment ?? "");
    setOpenEdit(!openEdit);
  };
  const editExecuteFunction = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.put("/api/auth/commentEdit", {
        name: editName,
        commentId: editCommentId,
        comment: editComment,
      });
      alert("編集に成功しました");
      dispatch(sub());
      fetchInformation();
    } catch (err) {
      alert("編集に失敗しました");
    }
    setOpenEdit(!openEdit);
  };

  const deleteFunction = async (e: FormEvent, info: CommentCatchInfo) => {
    e.preventDefault();

    try {
      // commentIdをURLに含めてDELETEリクエストを送信
      await axios.delete("/api/auth/commentDelete", {
        // dataプロパティ内にオブジェクトを含める
        data: { name: info.name, commentId: info.commentId },
      });
      alert("コメントが削除されました");
      fetchInformation();
    } catch (err) {
      alert("削除に失敗しました");
    }

    setOpenDelete(!openDelete);
  };
  const menuFunction = () => {
    setOpenMenu(!openMenu);
  };
  const areaEdit = () => {
    setOpenEdit(!openEdit);
    dispatch(sub());
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/registerComment", {
        userId: userData.userId,
        name: userData.name,
        comment: comment,
      });

      alert("登録に成功しました");
      setComment(""); // フォームをリセット
      fetchInformation();
    } catch (error) {
      console.error("エラー:", error); // エラーを詳細にログに出力
      if (axios.isAxiosError(error)) {
        alert(`${error.response?.status}番のエラーが発生しました`);
      } else {
        alert("不明なエラーが発生しました");
      }
    }
  };

  return (
    <main>
      {loginConfirm ? <LogoutIcons /> : <LoginIcons />}
      <h1 className={styles.midashi}>music再現</h1>
      <div className={styles.explanation}>
        このサイトはgt1000(core)を用いて様々なアーティストの音を再現するための相談サイトです。
      </div>
      <div className={styles.setting}>
        ヨルシカ用基本設定
        <div>
          <br />
          コンプ:ORANGE
          <br />
          <ul>
            <li>sustain :50</li>
            <li>attack :59</li>
            <li>tone :0</li>
            <li>ratio :INF:1 </li>
            <li>dir mix :0</li>
          </ul>
        </div>
        <div>
          <br />
          プリアンプ:BRIT STK
          <br />
          <ul>
            <li>GAIN :5</li>
            <li>SAG :+7</li>
            <li>RESO :+7</li>
            <li>BASS :50 </li>
            <li>MIDDLE :50</li>
            <li>TREBLE :50</li>
            <li>PRESENCE :20</li>
          </ul>
        </div>
        <div>
          <br />
          歪みエフェクター:CENTA OD
          <br />
          <ul>
            <li>GAIN :10</li>
            <li>TONE :+25</li>
          </ul>
          <br />
          ディレイ エフェクター:TAPE
          <br />
          <ul>
            <li>TIME :170ms</li>
            <li>FEEDBACK :20</li>
            <li>HI CUT FLAT </li>
            <li>E.LEVEL :30 </li>
          </ul>
        </div>
        <div>
          <br />
          宅録
          <br />
          OUTPUT:RECORDING キャビネット
          <br />
          <ul>
            <li>SP TYPE :1×12</li>
            <li>MIC TYP :DYN57</li>
            <li>MIC DST :SHORT</li>
            <li>MIC POS :scm </li>
          </ul>
        </div>
        <div>
          <br />
          OUTPUT:RECORDING マイク
          <br />
          <ul>
            <li>MIC TYP :CND87</li>
            <li>MIC DST :MEDIUM</li>
            <li>MIC POS :scm </li>
          </ul>
        </div>
        <div>
          <br />
          ＊クリーン時にコンプをクランチの時は歪みエフェクターをかけます。
          ギターソロ時にディレイエフェクターのE.LEVELを50にそしてイコライザー:GRAPHICのLEVELを+1dBしています。
          お好みで中中音域、高音域低音域をいじるのもいいと思います。
          スタジオではOUTPUT設定をスタジオに合わせたアンプのreturnに変更するかRECORDINGのままキャビとマイクをオフにしてリターン刺しするのがおすすめです。
        </div>
      </div>
      <br />
      <div className={styles.commentShow}>
        {commentInfo.length > 0 ? (
          commentInfo.map((info) => (
            <div key={info.commentId || Math.random()}>
              <div>{info.name || "名前不明"}</div>{" "}
              {/* 安全にuserInfoにアクセス */}
              <div>{info.commentId || "ID不明"}</div>{" "}
              {/* 安全にcommentInfoにアクセス */}
              <div>
                {info.comment || "コメントなし"}
                {userData.userId ===
                  info.userId /* userInfoが存在するか確認 */ && (
                  <>
                    <button onClick={() => editFunction(info)}>編集</button>
                    <button onClick={(e) => deleteFunction(e, info)}>
                      削除
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>コメントがありません</div>
        )}
      </div>
      {loginConfirm && (
        <>
          <div className={styles.commentContainer}>
            <form onSubmit={handleSubmit}>
              <textarea
                className={styles.commentForm}
                value={comment} // ここで状態をセット
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <button type="submit" className={styles.btn}>
                送信
              </button>
            </form>
          </div>
        </>
      )}
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
      <div className={openEdit ? styles.edit : styles.editHide}>
        <div className={styles.form}>
          <form onSubmit={editExecuteFunction}>
            <div>
              <textarea
                className={styles.editArea}
                value={editComment ?? ""} // コメントの初期値を設定
                onChange={(e) => setEditComment(e.target.value)} // コメントを変更するたびに状態を更新
              ></textarea>
            </div>
            <button type="submit" className={styles.editButton}>
              編集
            </button>
          </form>
          <button className={styles.editButton} onClick={areaEdit}>
            中断
          </button>
        </div>
      </div>

      <div
        className={openMenu ? styles.openToggleBtn : styles.toggleBtn}
        onClick={menuFunction}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div
        className={openMenu ? styles.openMask : styles.mask}
        onClick={menuFunction}
      ></div>
    </main>
  );
};

export default Yorushika;
