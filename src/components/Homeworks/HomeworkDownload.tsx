"use client";
import { Download, Loader } from "lucide-react";
import { Button } from "../ui/button";
import { useFileDownloader } from "@/hooks/useFileDownloader";

interface IHomeworkDownloadProps {
  fileUrl: string;
  fileName: string;
}

const HomeworkDownload: React.FC<IHomeworkDownloadProps> = ({
  fileUrl,
  fileName,
}) => {
  const { loading, error, downloadFile } = useFileDownloader();

  const downloadFileHandler = async () => {
    await downloadFile(fileUrl, fileName);
  };

  return (
    <div>
      <Button
        variant="outline"
        className="rounded-full border-2"
        onClick={downloadFileHandler}
        disabled={loading}
      >
        {loading ? <Loader className="animate-spin" /> : <Download />}
      </Button>
      {error && <span className="block text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default HomeworkDownload;
