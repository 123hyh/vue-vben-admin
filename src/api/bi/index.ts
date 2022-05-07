/**
 * bi 接口
 */
import { defHttp } from '/@/utils/http/axios';
import { BiBaseModel } from './model/biBaseModel';
import { BasicResponse } from '../model/baseModel';

enum Api {
  DashboardData = '/bi/dashboardData',
}

/**
 * 获取首页面板的bi 数据
 */
export const getDashboardData = () =>
  defHttp.get<BasicResponse<Array<BiBaseModel>>>({ url: Api.DashboardData });
