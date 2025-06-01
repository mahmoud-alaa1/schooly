interface IUploadPostResponse {
  data: {
    id: number;
    fileName: string;
    storedFileName: string;
    contentType: string;
  };
}

interface IUploadPost {
  formFile: File;
}

interface IUpload {
  fileName: string;
}
