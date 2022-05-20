import { defHttp } from '/@/utils/http/axios';
import qs from 'qs';
import { ContentTypeEnum } from '/@/enums/httpEnum';
import { BasicPageListResult, BasicResponse } from '../model/baseModel';
import { SettlementModel } from './model/settlementModel';

enum APi {
  list = `/bas/settlementscheme/list`,
  save = `/bas/settlementscheme/add`,
  info = `/bas/settlementscheme/{id}/info`,
}

/**
 * 根据 查询 结算方案 详情
 */
export const getCrmSettlementById = (id: string) =>
  defHttp.get<BasicResponse<SettlementModel>>({
    url: APi.info.replace(/{id}/g, id),
  });

/**
 * 获取结算方案列表
 * @param data
 * @returns
 */
export const getCrmSettlementList = (data) =>
  defHttp.post<BasicPageListResult<SettlementModel>>({
    url: APi.list,
    headers: { 'content-type': ContentTypeEnum.FORM_URLENCODED },
    data: qs.stringify(data),
  });

/**
 * 保存 结算方案
 */
export const saveCrmSettlement = (data) =>
  defHttp.post<BasicResponse<SettlementModel>>({
    url: APi.save,
    data,
  });
