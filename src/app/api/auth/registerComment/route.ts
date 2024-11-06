import { NextResponse } from "next/server";
import { db } from "@/db/connect"; // MySQL接続のためのモジュール
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { userId, name, comment } = await req.json();

  try {
    // 新規ユーザーをデータベースに登録
    await db.query(
      "INSERT INTO comment (userId, name, comment) VALUES (?,?, ?)",
      [userId, name, comment]
    );

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
