import { defHttp } from '/@/utils/http/axios';
import { BasicPageListResult } from '/@/api/model/baseModel';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  bocRateList = '/bas/basBocRate/list',
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
