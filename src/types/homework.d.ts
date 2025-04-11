type THomework = {
  homeWorkId: string;
  fileUrl: string;
  fileName: string;
  lessonTitle: string;
};

type THomeworkResponse = {
  data: THomework[];
  meta: {
    totalItems: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
  };
};
