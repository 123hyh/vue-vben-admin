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

export interface BasicPageListResult<T> {
  rows: T[];
  total: number;
}
/**
 *
 */
export interface BasicEntity {
  busidocId: string;
  orgId: string;
  privacyGroupId: string;
  createBy: string;
  createTime: string;
  createByName: string;
  updateByName: string;
  auditByName: string;
  auditTime: string;
  auditBy: string;
  rejectBy: string;
  rejectByName: string;
  rejectTime: string;
  submitBy: string;
  submitTime: string;
  submitByName: string;
  statusDesc: string;
}
