import { useState } from "react";
import { saveAs } from "file-saver";
import { getFile } from "@/services/uploadServices";
interface UseFileDownloaderReturn {
  loading: boolean;
  error: string | null;
  downloadFile: (fileUrl: string, fileName: string) => Promise<void>;
}

export function useFileDownloader(): UseFileDownloaderReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const downloadFile = async (
    fileUrl: string,
    fileName: string,
  ): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const res = await getFile({ fileUrl });
      saveAs(res, fileName);
    } catch (err) {
      setError("حدث خطأ أثناء تحميل الملف");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, downloadFile };
}
