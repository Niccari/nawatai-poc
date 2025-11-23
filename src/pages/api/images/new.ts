import type { NextApiRequest, NextApiResponse } from "next";
import { formidable, File as FormidableFile } from "formidable";
import imageRepository from "../../../repositories/image/firebase";
import { Writable } from "stream";
import { getAuthedUserId } from "../authHelper";

export const config = {
  api: {
    bodyParser: false,
  },
};

// 許可する画像のMIMEタイプ
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];
// ファイルサイズ制限（5MB）
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const uploadImageByStream = async (
  writable: Writable,
  req: NextApiRequest,
): Promise<{
  mimetype: string;
  err?: Error;
}> => {
  const form = formidable({
    fileWriteStreamHandler: () => writable,
    maxFileSize: MAX_FILE_SIZE,
    filter: (part) => {
      // MIMEタイプのバリデーション
      return part.mimetype ? ALLOWED_MIME_TYPES.includes(part.mimetype) : false;
    },
  });
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error("upload timeout"));
    }, 60_000);
    form.parse(req, (err, _, files) => {
      clearTimeout(timeoutId);
      if (err) {
        // formidableのエラー（サイズ超過、フィルター失敗など）
        reject(err);
        return;
      }
      if (!Object.hasOwn(files, "imageFile")) {
        reject(new Error("imageFile not specified."));
        return;
      }
      const file = files["imageFile"];
      if (file && file[0]) {
        const { mimetype } = file[0];
        // MIMEタイプの最終確認
        if (!mimetype || !ALLOWED_MIME_TYPES.includes(mimetype)) {
          reject(
            new Error(
              "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.",
            ),
          );
          return;
        }
        resolve({
          mimetype,
          err,
        });
        return;
      }
      reject(new Error("invalid image"));
    });
  });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.headers["content-type"]?.includes("multipart/form-data")) {
    res.status(400).send(undefined);
    return;
  }
  if (!(await getAuthedUserId(req, res))) {
    return;
  }
  try {
    const { id, writable } = await imageRepository.getUploadWriteStream();
    const { mimetype } = await uploadImageByStream(writable, req);
    await imageRepository.setMetaData(id, {
      cacheControl: "public,max-age=60,s-maxage=300",
      contentType: mimetype,
    });
    await imageRepository.makePublic(id);
    res.status(200).json({ id });
  } catch (err) {
    // バリデーションエラーやファイルサイズ超過は400で返す
    if (err instanceof Error) {
      const message = err.message.toLowerCase();
      if (
        message.includes("size") ||
        message.includes("type") ||
        message.includes("invalid") ||
        message.includes("timeout")
      ) {
        res.status(400).json({ error: err.message });
        return;
      }
    }
    // その他のエラーは500で返す
    res.status(500).send(undefined);
  }
};

export default handler;
