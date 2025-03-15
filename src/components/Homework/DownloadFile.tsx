"use client";
import { Download } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { getFileContent } from "@/services/upload";
import { saveAs } from "file-saver";

interface DownloadFileProps {
  storedFileName: string;
  token: string | null;
  fileName: string;
}

const DownloadFile: React.FC<DownloadFileProps> = ({
  storedFileName,
  token,
  fileName,
}) => {
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const downloadFileHandler = () => {
    if (!fileContent) return;
    try {
      const blob = new Blob([fileContent], { type: "application/pdf" });

      saveAs(blob, fileName);
    } catch (error) {
      console.error("Error downloading file:", error);
      setError("Failed to download file.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        setLoading(true);
        setError(null);

        try {
          const res = await getFileContent(token, storedFileName);
          setFileContent(res);
        } catch (err) {
          setError("Failed to fetch file content.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [storedFileName, token]);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <Button
        variant="ghost"
        size="sm"
        className="rounded-full border-[2px] border-neutral-300"
        disabled={loading || !fileContent}
        onClick={downloadFileHandler}
      >
        <Download className="size-5" />
      </Button>
    </div>
  );
};

export default DownloadFile;
