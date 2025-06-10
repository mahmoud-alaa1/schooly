import { create } from "zustand";
import { persist } from "zustand/middleware";

type DropzoneState = {
  files: { [key: string]: { file: File; url: string }[] };
  setFiles: (formName: string, files: { file: File; url: string }[]) => void;
  clearFiles: (formName: string) => void;
};

export const useDropzoneStore = create<DropzoneState>()((set) => ({
  files: {},
  setFiles: (formName, files) =>
    set((state) => ({
      files: { ...state.files, [formName]: files },
    })),
  clearFiles: (formName) =>
    set((state) => {
      const newFiles = { ...state.files };
      delete newFiles[formName];
      return { files: newFiles };
    }),
}));
