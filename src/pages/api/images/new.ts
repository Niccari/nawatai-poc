import type { NextApiRequest, NextApiResponse } from "next";
import { formidable } from "formidable";
import imageRepository from "../../../repositories/image/firebase";
import { Writable } from "stream";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadImageByStream = async (
  writable: Writable,
  req: NextApiRequest
): Promise<{
  err?: Error;
}> => {
  const form = formidable({
    fileWriteStreamHandler: () => writable,
  });
  return new Promise((resolve, reject) => {
    form.parse(req, (err) => {
      if (err) {
        reject({ err });
      }
      resolve({ err });
    });
  });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, writable } = await imageRepository.getUploadWriteStream();
  const { err } = await uploadImageByStream(writable, req);
  if (err) {
    res.status(500).send(undefined);
    return;
  }
  res.status(200).json({ id });
};

export default handler;
