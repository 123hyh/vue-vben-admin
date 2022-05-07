export interface BasicPageParams {
  pageNum: number;
  pageSize: number;
}

export interface BasicResponse<T> {
  code: number;
  data: T;
}

export interface BasicFetchResult<T> {
  items: T[];
  total: number;
}
