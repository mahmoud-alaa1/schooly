import { useMutation } from "@tanstack/react-query";
import { postFile } from "@/services/uploadServices";
import { useState, useEffect } from "react";

export default function useUpload() {
  const [progress, setProgress] = useState(0);
  const res = useMutation<IUploadPostResponse, Error, FormData>({
    mutationFn: (formData) => postFile(formData, setProgress),
    onSettled: () => {
      setProgress(0);
    },
  });

  useEffect(() => {
    return () => {
      setProgress(0);
    };
  }, []);

  return {
    res,
    progress,
    isUploading: res.isPending || progress > 0,
  };
}
