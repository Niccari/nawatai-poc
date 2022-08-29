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

const uploadImageByStream = async (
  writable: Writable,
  req: NextApiRequest
): Promise<{
  mimetype: string;
  err?: Error;
}> => {
  const form = formidable({
    fileWriteStreamHandler: () => writable,
  });
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error("upload timeout"));
    }, 60_000);
    form.parse(req, (err, _, files) => {
      clearTimeout(timeoutId);
      if (err) {
        reject(err);
      }
      if (!Object.hasOwn(files, "imageFile")) {
        reject(new Error("imageFile not specified."));
      }
      const { mimetype } = files.imageFile as FormidableFile;
      resolve({
        mimetype: mimetype ?? "application/octet-stream",
        err,
      });
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
  const { id, writable } = await imageRepository.getUploadWriteStream();
  const { err, mimetype } = await uploadImageByStream(writable, req);
  if (err) {
    res.status(500).send(undefined);
    return;
  }
  await imageRepository.setMetaData(id, {
    cacheControl: "public,max-age=60,s-maxage=300",
    contentType: mimetype,
  });
  res.status(200).json({ id });
};

export default handler;
