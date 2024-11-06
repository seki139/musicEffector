import { NextResponse } from "next/server";
import { db } from "@/db/connect"; // MySQL接続のためのモジュール
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { name, mail, pass } = await req.json();

  // パスワードのハッシュ化
  const hashedPassword = await bcrypt.hash(pass, 10);

  try {
    // ユーザーが既に存在するか確認
    const [existingUser]: any = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [mail]
    );

    if (existingUser.length > 0) {
      return NextResponse.json(
        { message: "このメールアドレスは既に使用されています" },
        { status: 409 }
      );
    }

    // 新規ユーザーをデータベースに登録
    await db.query("INSERT INTO users (name,email, password) VALUES (?,?, ?)", [
      name,
      mail,
      hashedPassword,
    ]);

    return NextResponse.json(
      { message: "ユーザー登録が成功しました" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "エラーが発生しました" },
      { status: 500 }
    );
  }
}
