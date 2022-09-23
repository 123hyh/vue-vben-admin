import { defHttp } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';
import { BasicPageListResult, BasicResponse } from '../model/baseModel';
import { SettlementModel, SettlemetnVoModel } from './model/settlementModel';

enum APi {
  list = `/bas/settlementscheme/list`,
  add = `/bas/settlementscheme/add`,
  edit = `/bas/settlementscheme/{id}/edit`,
  info = `/bas/settlementscheme/{id}/info`,
  remove = `/bas/settlementscheme/{ids}/remove`,
}

/**
 * 根据 查询 结算方案 详情
 */
export const getCrmSettlementById = (id: string) =>
  defHttp.get<BasicResponse<SettlemetnVoModel>>({
    url: APi.info.replace(/{id}/g, id),
  });

/**
 * 获取结算方案列表
 * @param data
 * @returns
 */
export const getCrmSettlementList = (data) => {
  return defHttp.post<BasicPageListResult<SettlementModel>>({
    url: APi.list,
    headers: { 'content-type': ContentTypeEnum.FORM_URLENCODED },
    data: data,
  });
};

const saveFn = (isAdd = true, data) =>
  defHttp.post<BasicResponse<SettlemetnVoModel>>({
    url: isAdd ? APi.add : APi.edit,
    data,
  });
/**
 * 新增 结算方案
 */

export const addCrmSettlement = (data) => saveFn(true, data);

/**
 * 修改 结算方案
 */
export const saveCrmSettlement = (data) => saveFn(false, data);

/**
 * 删除结算方案
 * @param ids
 * @returns
 */
export const removeCrmSettlement = (ids: string) =>
  defHttp.delete<BasicResponse<null>>({
    url: APi.remove.replace(/{ids}/, ids),
  });
