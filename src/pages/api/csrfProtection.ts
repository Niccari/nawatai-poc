import type { NextApiRequest, NextApiResponse } from "next";

/**
 * CSRF保護のためのOrigin/Refererヘッダー検証
 * POSTリクエストに対してリクエスト元を検証
 */
export const verifyCsrfToken = (
  req: NextApiRequest,
  res: NextApiResponse,
): boolean => {
  // GETリクエストはCSRF対策不要
  if (req.method === "GET") {
    return true;
  }

  const origin = req.headers.origin;
  const referer = req.headers.referer;
  const host = req.headers.host;

  // 許可されたオリジン（本番環境では環境変数から取得）
  const allowedOrigins = [
    `http://${host}`,
    `https://${host}`,
    process.env.VERCEL_URL
      ? `${process.env.VERCEL_URL_PROTOCOL}${process.env.VERCEL_URL}`
      : null,
  ].filter(Boolean) as string[];

  // Originヘッダーが存在する場合は検証
  if (origin) {
    if (!allowedOrigins.some((allowed) => origin.startsWith(allowed))) {
      res.status(403).json({ error: "Forbidden: Invalid origin" });
      return false;
    }
    return true;
  }

  // Originがない場合はRefererで検証
  if (referer) {
    if (!allowedOrigins.some((allowed) => referer.startsWith(allowed))) {
      res.status(403).json({ error: "Forbidden: Invalid referer" });
      return false;
    }
    return true;
  }

  // どちらもない場合は拒否
  res.status(403).json({ error: "Forbidden: Missing origin or referer" });
  return false;
};
