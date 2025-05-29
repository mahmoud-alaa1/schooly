interface IPaginationMeta {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

interface IPaginatedResponse<T> {
  data: T[];
  meta: IPaginationMeta;
}
