import { defHttp } from '/@/utils/http/axios';
enum apiEnum {
  GetHomeData = '/system/dict/data/homeData',
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
