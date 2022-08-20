import { useState } from "react";

export type FileState = {
  file?: File;
  imageDataUrl?: string;
  imageSetError?: Error;
};

export const useImageLoader = () => {
  const [fileState, setFileState] = useState<FileState>({});

  const handleImageSet = (file: File) => {
    const reader = new FileReader();
    new Promise<string>((resolve, rejects) => {
      reader.onload = () => {
        const dataUrl = reader.result as string | null;
        if (!dataUrl) {
          rejects(new Error("failed to load image"));
        } else {
          resolve(dataUrl);
        }
      };
      reader.onerror = (e) => {
        rejects(e);
      };
      reader.readAsDataURL(file);
    })
      .then((imageDataUrl) => {
        setFileState({ file, imageDataUrl });
      })
      .catch((err) => {
        setFileState({ imageSetError: err });
      });
  }

  return { fileState, handleImageSet };
};
