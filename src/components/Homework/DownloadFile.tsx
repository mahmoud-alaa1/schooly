"use client";
import { Download, Loader } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { saveAs } from "file-saver";
import { getFileContent } from "@/services/upload";

interface DownloadFileProps {
  storedFileName: string;
  fileName: string;
}

const DownloadFile: React.FC<DownloadFileProps> = ({
  storedFileName,
  fileName,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const downloadFileHandler = async () => {
    try {
      setLoading(true);
      const res = await getFileContent(storedFileName);
      saveAs(res, fileName);
      setLoading(false);
    } catch (error) {
      setError("حدث خطأ أثناء تحميل الملف");
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button
        variant="ghost"
        size="sm"
        className="rounded-full border-[2px] border-neutral-300"
        disabled={loading}
        onClick={downloadFileHandler}
      >
        {loading ? (
          <Loader className="size-5" />
        ) : (
          <Download className="size-5" />
        )}
      </Button>
    </div>
  );
};

export default DownloadFile;
