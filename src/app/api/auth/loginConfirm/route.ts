import { NextResponse } from "next/server";
import { db } from "@/db/connect";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { mail, pass } = await req.json();

  try {
    const [rows]: any = await db.query("SELECT * FROM users WHERE email = ?", [
      mail,
    ]);

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "ユーザーが見つかりません" },
        { status: 404 }
      );
    }

    const user = rows[0];
    const isValidPassword = await bcrypt.compare(pass, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "パスワードが正しくありません" },
        { status: 401 }
      );
    }

    // ログイン成功時の処理
    return NextResponse.json(
      {
        message: "ログイン成功",
        usrInf: { userId: user.userId, name: user.name }, // idとnameのみ返す
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "エラーが発生しました" },
      { status: 500 }
    );
  }
}
