import { NextResponse } from "next/server";
import { db } from "@/db/connect";
import bcrypt from "bcryptjs";

export async function GET(req: Request) {
  try {
    // commentテーブルからすべての情報を取得
    const query = "SELECT * FROM comment";
    const [results, fields] = await db.query(query); // resultsにクエリ結果が入る

    // クエリの結果をjson形式で返す
    return NextResponse.json(results); // resultsをそのまま返す
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "コメントの取得に失敗しました" },
      { status: 500 }
    );
  }
}
