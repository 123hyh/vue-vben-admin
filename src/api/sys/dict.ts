import { defHttp } from '/@/utils/http/axios';
import { SysDictData } from '/@/api/sys/model/sysDictData';
enum apiEnum {
  GetHomeData = '/system/dict/data/homeData',
  GET_DICT_DATA_BY_TYPE = '/system/dict/data/{type}/list',
}
/**
 * 获取首页数据
 * @param params
 * @returns
 */
export const getHomeData = (params = {}) =>
  defHttp.get({
    url: apiEnum.GetHomeData,
    params,
  });

/**
 *
 * @param type
 */
export const getDictDataByType = (type: String) => {
  return defHttp.get<SysDictData[]>({
    url: apiEnum.GET_DICT_DATA_BY_TYPE.replace(/\{type\}/, type.toString()),
  });
};
