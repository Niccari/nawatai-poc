import { useState } from "react";
import { authedFormPost, authedPost } from "../api";

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
  };

  return { fileState, handleImageSet };
};

export const useImageUploader = () => {
  const uploadImage = async (file: File): Promise<{ imageId: string }> => {
    const formData = new FormData();
    formData.append("imageFile", file);
    const response = await authedFormPost("/api/images/new", formData);
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    const { id } = await response.json();
    return {
      imageId: id,
    };
  };
  return { uploadImage };
};
