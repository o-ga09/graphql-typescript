import { NextResponse } from "next/server";
import { getVercelOidcToken } from "@vercel/functions/oidc";

export async function GET() {
  const token = await getVercelOidcToken();
  console.log(token);
  return NextResponse.json({
    message: `データを取得! ${token}`,
  });
}
