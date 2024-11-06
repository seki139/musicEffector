import { NextResponse } from "next/server";
import { db } from "@/db/connect"; // データベース接続をインポート
import { ResultSetHeader } from "mysql2"; // mysql2からResultSetHeaderをインポート
export async function PUT(req: Request) {
  try {
    const { name, commentId, comment } = await req.json(); // リクエストからデータを取得

    // SQLクエリを準備して実行
    const [result] = await db.query<ResultSetHeader>(
      `UPDATE comment SET comment = ? WHERE commentId = ? AND name = ?`,
      [comment, commentId, name]
    );

    // 更新された行がなかった場合の処理
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "該当するコメントが見つかりませんでした。" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "コメントが正常に更新されました。" });
  } catch (error) {
    console.error(error); // エラーログを出力
    return NextResponse.json(
      { message: "コメントの更新中にエラーが発生しました。" },
      { status: 500 }
    );
  }
}
