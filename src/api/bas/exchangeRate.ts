import { defHttp } from '/@/utils/http/axios';
import { BasicPageListResult } from '/@/api/model/baseModel';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  bocRateList = '/bas/basBocRate/list',
  basExchangerate = '/erp/basExchangerate/list',
}

/**
 * 获取中银汇率列表
 * @param params
 */
export const getBocRateList = (params: { [key: string]: any }) =>
  defHttp.post<BasicPageListResult<any>>({
    url: Api.bocRateList,
    data: params,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
  });

/**
 * 查询汇率列表
 * @param params
 */
export const getExchangeRateList = (params: { [key: string]: any }) =>
  defHttp.post<BasicPageListResult<any>>({
    url: Api.basExchangerate,
    data: params,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
  });
